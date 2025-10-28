import { StyleSheet } from 'react-native';
import { responsiveSize } from '../../utils/responsive';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdc556ff',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: responsiveSize.padding.screen,
    paddingTop: responsiveSize.spacing.xl,
  },
  
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: responsiveSize.spacing.xl,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: responsiveSize.spacing.lg,
  },
  emptyTitle: {
    fontSize: responsiveSize.fontSize.xlarge,
    fontWeight: 'bold',
    color: '#2c2c2c',
    textAlign: 'center',
    marginBottom: responsiveSize.spacing.sm,
  },
  emptySubtitle: {
    fontSize: responsiveSize.fontSize.medium,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: responsiveSize.spacing.xl,
    lineHeight: 22,
  },
  emptyText: {
    fontSize: responsiveSize.fontSize.large,
    color: '#666',
    textAlign: 'center',
  },
  
  colecoesContainer: {
    width: '100%',
  },
  colecaoCardWrapper: {
    position: 'relative',
    marginBottom: responsiveSize.spacing.md,
  },
  colecaoCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: responsiveSize.spacing.lg,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  deleteButton: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: [{ translateY: -20 }],
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  colecaoIconContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#f26012',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: responsiveSize.spacing.md,
  },
  colecaoIcon: {
    fontSize: 32,
  },
  colecaoInfo: {
    flex: 1,
  },
  colecaoNome: {
    fontSize: responsiveSize.fontSize.large,
    fontWeight: 'bold',
    color: '#2c2c2c',
    marginBottom: 4,
  },
  colecaoQuantidade: {
    fontSize: responsiveSize.fontSize.small,
    color: '#666',
  },
  colecaoSeta: {
    fontSize: 32,
    color: '#f26012',
    fontWeight: 'bold',
  },
  
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: responsiveSize.spacing.xl,
    maxHeight: '85%',
  },
  modalTitle: {
    fontSize: responsiveSize.fontSize.xxlarge,
    fontWeight: 'bold',
    color: '#2c2c2c',
    marginBottom: responsiveSize.spacing.lg,
    textAlign: 'center',
  },
  
  emptyGibisContainer: {
    alignItems: 'center',
    paddingVertical: responsiveSize.spacing.xxl * 2,
  },
  emptyGibisIcon: {
    fontSize: 64,
    marginBottom: responsiveSize.spacing.md,
  },
  emptyGibisText: {
    fontSize: responsiveSize.fontSize.medium,
    color: '#666',
    textAlign: 'center',
  },
  
  gibisScroll: {
    maxHeight: 500,
  },
  gibiCardWrapper: {
    position: 'relative',
    marginBottom: responsiveSize.spacing.md,
  },
  gibiCard: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    padding: responsiveSize.spacing.md,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  deleteGibiButton: {
    position: 'absolute',
    right: 8,
    top: '50%',
    transform: [{ translateY: -18 }],
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  gibiCapa: {
    width: 80,
    height: 120,
    borderRadius: 8,
    backgroundColor: '#ddd',
    marginRight: responsiveSize.spacing.md,
  },
  gibiInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  gibiNome: {
    fontSize: responsiveSize.fontSize.medium,
    fontWeight: 'bold',
    color: '#2c2c2c',
    marginBottom: 4,
  },
  gibiTitulo: {
    fontSize: responsiveSize.fontSize.small,
    color: '#666',
    marginBottom: 4,
  },
  gibiEdicao: {
    fontSize: responsiveSize.fontSize.small,
    color: '#f26012',
    fontWeight: '600',
  },
  
  closeButton: {
    backgroundColor: '#f26012',
    paddingVertical: responsiveSize.spacing.md,
    borderRadius: 12,
    marginTop: responsiveSize.spacing.lg,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: responsiveSize.fontSize.medium,
    fontWeight: '600',
  },
});

export default styles;
