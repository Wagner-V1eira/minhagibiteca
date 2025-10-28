import { Dimensions, PixelRatio, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { responsiveSize } from '../../utils/responsive';

const { width } = Dimensions.get('window');
const scale = width / 320;
function normalize(size: number) {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

const baseButton: ViewStyle = {
  borderRadius: 12,
  alignItems: 'center',
  minHeight: responsiveSize.height.button,
  justifyContent: 'center',
};

const baseButtonText: TextStyle = {
  fontWeight: 'bold',
  fontSize: responsiveSize.fontSize.large,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdc556ff',
  },
  scrollContainer: {
    flexGrow: 1, 
    padding: responsiveSize.spacing.md, 
  },
  contentWrapper: {
    width: '100%',
    maxWidth: responsiveSize.width.container,
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: responsiveSize.spacing.lg,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: responsiveSize.spacing.lg,
  },
  logo: {
    width: width > 1024 ? normalize(180) : width > 768 ? normalize(150) : normalize(120),
    height: width > 1024 ? normalize(180) : width > 768 ? normalize(150) : normalize(120),
    marginBottom: responsiveSize.spacing.lg,
  },
  form: {
    width: '100%',
    maxWidth: responsiveSize.width.input,
    alignSelf: 'center',
    gap: responsiveSize.spacing.md,
  },
  input: {
    backgroundColor: '#ffffffff',
    color: '#3A2E2E',
    borderWidth: 2,
    borderColor: '#E07A5F', 
    borderRadius: 12,
    paddingHorizontal: responsiveSize.spacing.md,
    paddingVertical: responsiveSize.spacing.sm,
    fontSize: responsiveSize.fontSize.medium,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minHeight: 48,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: responsiveSize.width.input,
    alignSelf: 'center',
    gap: responsiveSize.spacing.md,
    marginTop: responsiveSize.spacing.lg,
  },
  
  primaryButton: {
    ...baseButton,
    backgroundColor: '#F75C03', 
    paddingVertical: responsiveSize.spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  primaryButtonText: {
    ...baseButtonText,
    color: '#FFF',
  },
  secondaryButton: {
    ...baseButton,
    borderWidth: 2,
    borderColor: '#5C4033',
    paddingVertical: responsiveSize.spacing.md,
  },
  secondaryButtonText: {
    ...baseButtonText,
    color: '#020202ff',
    fontWeight: '600',
    fontSize: responsiveSize.fontSize.medium,
  },
});

export default styles;