import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdc556ff', // bege claro
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 120,
    height: 120,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000ff',
    marginTop: 12,
  },
  subtitle: {
    fontSize: 18,
    color: '#000000ff',
    marginTop: 4,
  },
  form: {
    width: '100%',
  },
  input: {
    borderWidth: 2,
    borderColor: '#E07A5F', // laranja
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#3A2E2E',
    marginBottom: 16,
    backgroundColor: '#ffffffff',
  },
  primaryButton: {
    backgroundColor: '#F75C03',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: '#5C4033',
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#7B5E4C',
    fontSize: 14,
  },
});

export default styles;
