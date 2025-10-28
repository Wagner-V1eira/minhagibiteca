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
    alignItems: 'center',
  },
  mainButton: {
    width: '100%',
    backgroundColor: '#f26012',
    paddingVertical: responsiveSize.spacing.xl,
    paddingHorizontal: responsiveSize.spacing.lg,
    borderRadius: 16,
    marginBottom: responsiveSize.spacing.lg,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  secondButton: {
    backgroundColor: '#2c2c2c',
  },
  buttonIcon: {
    fontSize: 48,
    marginBottom: responsiveSize.spacing.sm,
  },
  buttonText: {
    fontSize: responsiveSize.fontSize.xlarge,
    fontWeight: 'bold',
    color: '#fff',
  },
  
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalScrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: responsiveSize.spacing.md,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: responsiveSize.spacing.xl,
    width: '90%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  modalContentLarge: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: responsiveSize.spacing.lg,
    width: '95%',
    maxHeight: '85%',
    alignSelf: 'center',
    marginVertical: 'auto',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  modalTitle: {
    fontSize: responsiveSize.fontSize.xlarge,
    fontWeight: 'bold',
    color: '#2c2c2c',
    marginBottom: responsiveSize.spacing.lg,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: responsiveSize.spacing.md,
    fontSize: responsiveSize.fontSize.medium,
    marginBottom: responsiveSize.spacing.md,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: responsiveSize.spacing.md,
  },
  modalButton: {
    flex: 1,
    paddingVertical: responsiveSize.spacing.md,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#ddd',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: responsiveSize.fontSize.medium,
    fontWeight: '600',
  },
  confirmButton: {
    backgroundColor: '#f26012',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: responsiveSize.fontSize.medium,
    fontWeight: '600',
  },
  searchButton: {
    backgroundColor: '#2c2c2c',
    paddingVertical: responsiveSize.spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: responsiveSize.spacing.lg,
  },
  

  galeriaContainer: {
    marginBottom: responsiveSize.spacing.md,
    maxHeight: 350,
  },
  galeriaTitle: {
    fontSize: responsiveSize.fontSize.small,
    fontWeight: '600',
    color: '#2c2c2c',
    marginBottom: responsiveSize.spacing.sm,
    textAlign: 'center',
    paddingHorizontal: responsiveSize.spacing.sm,
  },
  galeriaScroll: {
    flexGrow: 0,
  },
  galeriaContent: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  galeriaItem: {
    width: 130,
    marginRight: responsiveSize.spacing.sm,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: responsiveSize.spacing.xs,
    borderWidth: 2,
    borderColor: '#f26012',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  galeriaCapa: {
    width: '100%',
    height: 170,
    borderRadius: 6,
    marginBottom: responsiveSize.spacing.xs,
    backgroundColor: '#f5f5f5',
  },
  galeriaVolume: {
    fontSize: responsiveSize.fontSize.small,
    fontWeight: 'bold',
    color: '#2c2c2c',
    textAlign: 'center',
    marginBottom: 2,
  },
  galeriaIssue: {
    fontSize: responsiveSize.fontSize.small,
    fontWeight: '600',
    color: '#f26012',
    textAlign: 'center',
    marginBottom: 2,
  },
  galeriaDate: {
    fontSize: responsiveSize.fontSize.xs,
    color: '#999',
    textAlign: 'center',
  },
  
  resultContainer: {
    alignItems: 'center',
    marginBottom: responsiveSize.spacing.lg,
    padding: responsiveSize.spacing.md,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
  },
  coverImage: {
    width: 200,
    height: 300,
    borderRadius: 8,
    marginBottom: responsiveSize.spacing.md,
  },
  resultTitle: {
    fontSize: responsiveSize.fontSize.large,
    fontWeight: 'bold',
    color: '#2c2c2c',
    textAlign: 'center',
    marginBottom: responsiveSize.spacing.xs,
  },
  resultSubtitle: {
    fontSize: responsiveSize.fontSize.medium,
    color: '#666',
    textAlign: 'center',
    marginBottom: responsiveSize.spacing.md,
  },
  addToCollectionButton: {
    backgroundColor: '#f26012',
    paddingVertical: responsiveSize.spacing.md,
    paddingHorizontal: responsiveSize.spacing.lg,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  
  colecoesListScroll: {
    maxHeight: 300,
  },
  colecaoItem: {
    backgroundColor: '#f5f5f5',
    padding: responsiveSize.spacing.md,
    borderRadius: 12,
    marginBottom: responsiveSize.spacing.sm,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  colecaoNome: {
    fontSize: responsiveSize.fontSize.medium,
    fontWeight: 'bold',
    color: '#2c2c2c',
    marginBottom: 4,
  },
  colecaoInfo: {
    fontSize: responsiveSize.fontSize.small,
    color: '#666',
  },
});

export default styles;
