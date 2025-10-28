import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Header } from '../../components/ui/Header';
import { notify } from '../../components/ui/notifyService';
import { buscarColecoes, removerColecao, removerGibiDaColecao, type Colecao } from '../../services/colecaoService';
import styles from './minhasColecoes.style';

export default function MinhasColecoes() {
  const router = useRouter();
  const [colecoes, setColecoes] = useState<Colecao[]>([]);
  const [colecaoSelecionada, setColecaoSelecionada] = useState<Colecao | null>(null);
  const [modalDetalhes, setModalDetalhes] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleBack = () => {
    router.push('/tela_inicial/home');
  };

  const carregarColecoes = async () => {
    setLoading(true);
    const colecoesCarregadas = await buscarColecoes();
    setColecoes(colecoesCarregadas);
    setLoading(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      carregarColecoes();
    }, [])
  );

  const handleAbrirColecao = (colecao: Colecao) => {
    setColecaoSelecionada(colecao);
    setModalDetalhes(true);
  };

  const handleExcluirColecao = (colecao: Colecao) => {
    Alert.alert(
      'Excluir Coleção',
      `Tem certeza que deseja excluir a coleção "${colecao.nome}"?\n\nEsta ação não pode ser desfeita.`,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await removerColecao(colecao.id);
              notify.success(response.message, 'Sucesso');
              await carregarColecoes();
            } catch (error: any) {
              notify.error(error.message || 'Erro ao excluir coleção', 'Erro');
            }
          }
        }
      ]
    );
  };

  const handleExcluirGibi = (gibiId: string, gibiNome: string) => {
    if (!colecaoSelecionada) return;

    Alert.alert(
      'Remover Gibi',
      `Tem certeza que deseja remover "${gibiNome}" da coleção?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await removerGibiDaColecao(colecaoSelecionada.id, gibiId);
              notify.success(response.message, 'Sucesso');
              
              // Atualizar colecoes e colecaoSelecionada
              const colecoesAtualizadas = await buscarColecoes();
              setColecoes(colecoesAtualizadas);
              
              const colecaoAtualizada = colecoesAtualizadas.find(c => c.id === colecaoSelecionada.id);
              if (colecaoAtualizada) {
                setColecaoSelecionada(colecaoAtualizada);
              }
            } catch (error: any) {
              notify.error(error.message || 'Erro ao remover gibi', 'Erro');
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Header 
        title="Minhas Coleções" 
        showBackButton={true}
        onBack={handleBack}
      />
      
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {loading ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>⏳</Text>
            <Text style={styles.emptyText}>Carregando...</Text>
          </View>
        ) : colecoes.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📚</Text>
            <Text style={styles.emptyTitle}>Você ainda não criou uma coleção</Text>
            <Text style={styles.emptySubtitle}>
              Comece criando sua primeira coleção para organizar seus gibis!
            </Text>
          </View>
        ) : (
          <View style={styles.colecoesContainer}>
            {colecoes.map(colecao => (
              <View key={colecao.id} style={styles.colecaoCardWrapper}>
                <TouchableOpacity
                  style={styles.colecaoCard}
                  onPress={() => handleAbrirColecao(colecao)}
                >
                  <View style={styles.colecaoIconContainer}>
                    <Text style={styles.colecaoIcon}>📚</Text>
                  </View>
                  <View style={styles.colecaoInfo}>
                    <Text style={styles.colecaoNome}>{colecao.nome}</Text>
                    <Text style={styles.colecaoQuantidade}>
                      {colecao.gibis.length} {colecao.gibis.length === 1 ? 'gibi' : 'gibis'}
                    </Text>
                  </View>
                  <Text style={styles.colecaoSeta}>›</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleExcluirColecao(colecao)}
                >
                  <Feather name="trash-2" size={20} color="#dc3545" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <Modal
        visible={modalDetalhes}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalDetalhes(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {colecaoSelecionada?.nome}
            </Text>

            {colecaoSelecionada && colecaoSelecionada.gibis.length === 0 ? (
              <View style={styles.emptyGibisContainer}>
                <Text style={styles.emptyGibisIcon}>�</Text>
                <Text style={styles.emptyGibisText}>
                  Nenhum gibi adicionado ainda
                </Text>
              </View>
            ) : (
              <ScrollView style={styles.gibisScroll}>
                {colecaoSelecionada?.gibis.map(gibi => (
                  <View key={gibi.id} style={styles.gibiCardWrapper}>
                    <View style={styles.gibiCard}>
                      <Image 
                        source={{ uri: gibi.capaUrl }}
                        style={styles.gibiCapa}
                        resizeMode="cover"
                      />
                      <View style={styles.gibiInfo}>
                        <Text style={styles.gibiNome} numberOfLines={2}>
                          {gibi.nome}
                        </Text>
                        <Text style={styles.gibiTitulo} numberOfLines={1}>
                          {gibi.titulo}
                        </Text>
                        <Text style={styles.gibiEdicao}>
                          Edição #{gibi.numeroEdicao}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={styles.deleteGibiButton}
                      onPress={() => handleExcluirGibi(gibi.id, gibi.nome)}
                    >
                      <Feather name="trash-2" size={18} color="#dc3545" />
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            )}

            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setModalDetalhes(false)}
            >
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}