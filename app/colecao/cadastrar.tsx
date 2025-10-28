import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Header } from '../../components/ui/Header';
import { notify } from '../../components/ui/notifyService';
import { adicionarGibiNaColecao, buscarColecoes, criarColecao, type Colecao } from '../../services/colecaoService';
import { buscarGibi, type ComicVineIssue } from '../../services/comicVineApi';
import styles from './cadastrar.style';

export default function CadastrarColecao() {
  const router = useRouter();

  const [modalCriarColecao, setModalCriarColecao] = useState(false);
  const [nomeColecao, setNomeColecao] = useState('');
  const [loadingCriar, setLoadingCriar] = useState(false);
  const [modalAdicionarGibi, setModalAdicionarGibi] = useState(false);
  const [nomePersonagem, setNomePersonagem] = useState('');
  const [titulo, setTitulo] = useState('');
  const [numeroEdicao, setNumeroEdicao] = useState('');
  const [loadingBusca, setLoadingBusca] = useState(false);
  const [resultadosBusca, setResultadosBusca] = useState<ComicVineIssue[]>([]);
  const [gibiSelecionado, setGibiSelecionado] = useState<ComicVineIssue | null>(null);

  const [modalSelecionarColecao, setModalSelecionarColecao] = useState(false);
  const [colecoes, setColecoes] = useState<Colecao[]>([]);

  const handleBack = () => {
    router.push('/tela_inicial/home');
  };

  const handleCriarColecao = async () => {
    if (!nomeColecao.trim()) {
      notify.error('Digite um nome para a coleção', 'Atenção');
      return;
    }

    setLoadingCriar(true);
    try {
      const response = await criarColecao(nomeColecao);
      notify.success(response.message, 'Sucesso');
      setNomeColecao('');
      setModalCriarColecao(false);
    } catch (error: any) {
      notify.error(error.message || 'Erro ao criar coleção', 'Erro');
    } finally {
      setLoadingCriar(false);
    }
  };

  const handleBuscarGibi = async () => {
    if (!nomePersonagem.trim() || !titulo.trim() || !numeroEdicao.trim()) {
      notify.error('Todos os campos são obrigatórios', 'Atenção');
      return;
    }

    setLoadingBusca(true);
    try {
      const resultados = await buscarGibi({
        nomePersonagem: nomePersonagem.trim(),
        titulo: titulo.trim(),
        numeroEdicao: numeroEdicao.trim(),
      });

      if (resultados.length === 0) {
        notify.error('Nenhum gibi encontrado com esses critérios', 'Não encontrado');
        setResultadosBusca([]);
      } else {
        setResultadosBusca(resultados);
        notify.success(`${resultados.length} edição(ões) encontrada(s)!`, 'Sucesso');
      }
    } catch (error: any) {
      notify.error(error.message || 'Erro ao buscar gibi', 'Erro');
      setResultadosBusca([]);
    } finally {
      setLoadingBusca(false);
    }
  };

  const handleSelecionarGibi = (gibi: ComicVineIssue) => {
    Alert.alert(
      'Adicionar Gibi',
      `${gibi.volume.name} #${gibi.issue_number}\n${gibi.cover_date ? `Data: ${gibi.cover_date}` : ''}\n\nAdicionar este gibi à coleção?`,
      [
        { text: '✗ Não', style: 'cancel' },
        {
          text: '✓ Sim',
          onPress: () => {
            setGibiSelecionado(gibi);
            handleAbrirModalColecoes();
          },
        },
      ]
    );
  };

  const handleAbrirModalColecoes = async () => {
    const colecoesCarregadas = await buscarColecoes();
    
    if (colecoesCarregadas.length === 0) {
      notify.error('Crie uma coleção primeiro!', 'Atenção');
      return;
    }

    setColecoes(colecoesCarregadas);
    setModalSelecionarColecao(true);
  };

  const handleAdicionarGibiNaColecao = async (colecaoId: string, nomeColecao: string) => {
    if (!gibiSelecionado) return;

    Alert.alert(
      'Confirmar',
      `Adicionar este gibi à coleção "${nomeColecao}"?`,
      [
        { text: '✗ Não', style: 'cancel' },
        {
          text: '✓ Sim',
          onPress: async () => {
              try {
                await adicionarGibiNaColecao(colecaoId, {
                  nome: nomePersonagem || gibiSelecionado.name || 'Desconhecido',
                  titulo: titulo || gibiSelecionado.volume.name,
                  numeroEdicao: numeroEdicao || gibiSelecionado.issue_number,
                  capaUrl: gibiSelecionado.image.original_url || gibiSelecionado.image.medium_url,
                });

                notify.success(`Gibi adicionado à coleção "${nomeColecao}"!`, 'Sucesso');
              
              // Limpar apenas a seleção, mantendo a tela de busca aberta
              setGibiSelecionado(null);
              setModalSelecionarColecao(false);
              // NÃO fecha o modal de adicionar gibi
              // NÃO limpa os campos de busca
              // NÃO limpa os resultados
            } catch (error: any) {
              notify.error(error.message || 'Erro ao adicionar gibi', 'Erro');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Header 
        title="Cadastrar Coleção" 
        showBackButton={true}
        onBack={handleBack}
      />
      
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <TouchableOpacity 
          style={styles.mainButton}
          onPress={() => setModalCriarColecao(true)}
        >
          <Text style={styles.buttonIcon}>📚</Text>
          <Text style={styles.buttonText}>Criar Coleção</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.mainButton, styles.secondButton]}
          onPress={() => setModalAdicionarGibi(true)}
        >
          <Text style={styles.buttonIcon}>➕</Text>
          <Text style={styles.buttonText}>Adicionar à Coleção</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={modalCriarColecao}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalCriarColecao(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Criar Nova Coleção</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Nome da coleção (ex: SPAWN)"
              placeholderTextColor="#999"
              value={nomeColecao}
              onChangeText={setNomeColecao}
              editable={!loadingCriar}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalCriarColecao(false)}
                disabled={loadingCriar}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleCriarColecao}
                disabled={loadingCriar}
              >
                <Text style={styles.confirmButtonText}>
                  {loadingCriar ? 'Criando...' : 'Criar'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={modalAdicionarGibi}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalAdicionarGibi(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContentLarge}>
            <ScrollView 
              showsVerticalScrollIndicator={true}
            >
              <Text style={styles.modalTitle}>Buscar Gibi</Text>
              
              <TextInput
                style={styles.input}
                placeholder="Nome do personagem *"
                placeholderTextColor="#999"
                value={nomePersonagem}
                onChangeText={setNomePersonagem}
                editable={!loadingBusca}
              />

              <TextInput
                style={styles.input}
                placeholder="Título *"
                placeholderTextColor="#999"
                value={titulo}
                onChangeText={setTitulo}
                editable={!loadingBusca}
              />

              <TextInput
                style={styles.input}
                placeholder="Número da edição *"
                placeholderTextColor="#999"
                value={numeroEdicao}
                onChangeText={setNumeroEdicao}
                keyboardType="numeric"
                editable={!loadingBusca}
              />

              <TouchableOpacity 
                style={[styles.searchButton]}
                onPress={handleBuscarGibi}
                disabled={loadingBusca}
              >
                <Text style={styles.confirmButtonText}>
                  {loadingBusca ? 'Buscando...' : '🔍 Buscar'}
                </Text>
              </TouchableOpacity>

              {/* Galeria de Resultados */}
              {resultadosBusca.length > 0 && (
                <View style={styles.galeriaContainer}>
                  <Text style={styles.galeriaTitle}>
                    {resultadosBusca.length} edição(ões) encontrada(s). Toque na capa para adicionar:
                  </Text>
                  
                  <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    style={styles.galeriaScroll}
                    contentContainerStyle={styles.galeriaContent}
                  >
                    {resultadosBusca.map((gibi, index) => (
                      <TouchableOpacity
                        key={`${gibi.id}-${index}`}
                        style={styles.galeriaItem}
                        onPress={() => handleSelecionarGibi(gibi)}
                      >
                        <Image 
                          source={{ uri: gibi.image.medium_url }}
                          style={styles.galeriaCapa}
                          resizeMode="cover"
                        />
                        <Text style={styles.galeriaVolume} numberOfLines={2}>
                          {gibi.volume.name}
                        </Text>
                        <Text style={styles.galeriaIssue}>
                          #{gibi.issue_number}
                        </Text>
                        {gibi.cover_date && (
                          <Text style={styles.galeriaDate}>
                            {new Date(gibi.cover_date).getFullYear() || ''}
                          </Text>
                        )}
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}

              <View style={styles.modalButtons}>
                <TouchableOpacity 
                  style={[styles.modalButton, styles.cancelButton, { flex: 1 }]}
                  onPress={() => {
                    setModalAdicionarGibi(false);
                    setResultadosBusca([]);
                    setGibiSelecionado(null);
                    setNomePersonagem('');
                    setTitulo('');
                    setNumeroEdicao('');
                  }}
                  disabled={loadingBusca}
                >
                  <Text style={styles.cancelButtonText}>Fechar</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Modal: Selecionar Coleção */}
      <Modal
        visible={modalSelecionarColecao}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalSelecionarColecao(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Escolha a Coleção</Text>
            
            <ScrollView style={styles.colecoesListScroll}>
              {colecoes.map(colecao => (
                <TouchableOpacity
                  key={colecao.id}
                  style={styles.colecaoItem}
                  onPress={() => handleAdicionarGibiNaColecao(colecao.id, colecao.nome)}
                >
                  <Text style={styles.colecaoNome}>📚 {colecao.nome}</Text>
                  <Text style={styles.colecaoInfo}>
                    {colecao.gibis.length} {colecao.gibis.length === 1 ? 'gibi' : 'gibis'}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity 
              style={[styles.modalButton, styles.cancelButton, { marginTop: 16 }]}
              onPress={() => setModalSelecionarColecao(false)}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}