import { StyleSheet, Dimensions, PixelRatio } from 'react-native';
import { responsiveSize } from '../../utils/responsive';
import type { ViewStyle, TextStyle } from "react-native";

const { width } = Dimensions.get('window');
const scale = width / 320;
function normalize(size: number) {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

const baseButton: ViewStyle = {
  borderRadius: 12,
  alignItems: 'center',
  justifyContent: 'center',
  width: responsiveSize.width.button,
  minHeight: responsiveSize.height.button,
  paddingHorizontal: responsiveSize.spacing.xl,
};

const baseButtonText: TextStyle = {
  fontWeight: 'bold',
  fontSize: responsiveSize.fontSize.large,
};

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdc556ff',
  },
  header: {
    position: 'absolute', 
    top: 50, 
    right: responsiveSize.padding.container, 
    zIndex: 1, 
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: responsiveSize.padding.screen,
    paddingBottom: responsiveSize.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center', 
  },
  contentContainer: {
    width: '100%',
    maxWidth: responsiveSize.width.container,
    alignItems: 'center',
  },
  logo: {
    width: width > 1024 ? normalize(120) : width > 768 ? normalize(100) : normalize(80),
    height: width > 1024 ? normalize(120) : width > 768 ? normalize(100) : normalize(80),
    marginBottom: responsiveSize.spacing.xl,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    gap: responsiveSize.spacing.md,
    marginTop: responsiveSize.spacing.lg,
  },

  welcomeText: {
    fontSize: responsiveSize.fontSize.xxlarge,
    fontWeight: 'bold',
    marginBottom: responsiveSize.spacing.md,
    textAlign: 'center',
    color: '#2c2c2c',
  },
  
  primaryButton: {
    ...baseButton,
    backgroundColor: '#f26012', 
    paddingVertical: responsiveSize.spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  primaryButtonText: {
    ...baseButtonText,
    color: '#fff',
  },
  secondaryButton: {
    ...baseButton,
    backgroundColor: 'transparent', 
    borderWidth: 2, 
    borderColor: '#f26012',
    paddingVertical: responsiveSize.spacing.md,
  },
  secondaryButtonText: {
    ...baseButtonText,
    color: '#2c2c2c', 
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    borderRadius: 8,
    padding: responsiveSize.spacing.sm, 
  },
  logoutIcon: {
    color: '#fff',
    fontSize: responsiveSize.fontSize.xlarge, 
  },
});