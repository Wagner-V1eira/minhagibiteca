import { StyleSheet } from 'react-native';
import type { ViewStyle } from 'react-native';

const baseButton: ViewStyle = {
  paddingVertical: 12,
  paddingHorizontal: 24,
  borderRadius: 8,
  borderWidth: 2,
  alignItems: 'center',
  marginBottom: 16,
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2b2b2bff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ff7300ff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 20,
    color: '#ff7300ff',

    marginBottom: 32,
  },
  buttonContainer: {
    width: '80%',
    alignItems: 'stretch',
  },
  button: {
    ...baseButton,
    borderColor: '#ff7300ff',

  },
  buttonText: {
    color: '#ffffffff',
    fontSize: 16,
  },
  loginButton: {
    ...baseButton,
    borderColor: '#ff7300ff',

    backgroundColor: '#ff7300ff',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});