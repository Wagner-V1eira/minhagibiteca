import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const screenInfo = {
  width,
  height,
  isSmallMobile: width < 480,        
  isMobile: width >= 480 && width < 768,  
  isTablet: width >= 768 && width < 1024, 
  isDesktop: width >= 1024,         
  isLargeDesktop: width >= 1440,   
  
  isSmallScreen: height < 700,      
  isTallScreen: height >= 900,      
  
  isMobileDevice: width < 768,
  isTabletOrLarger: width >= 768,
  isDesktopOrLarger: width >= 1024,
};

export const responsiveSize = {
  fontSize: {
    xs: screenInfo.isDesktop ? 12 : screenInfo.isTablet ? 11 : 10,
    small: screenInfo.isLargeDesktop ? 16 : screenInfo.isDesktop ? 14 : screenInfo.isTablet ? 13 : screenInfo.isSmallMobile ? 11 : 12,
    medium: screenInfo.isLargeDesktop ? 18 : screenInfo.isDesktop ? 16 : screenInfo.isTablet ? 15 : screenInfo.isSmallMobile ? 13 : 14,
    large: screenInfo.isLargeDesktop ? 20 : screenInfo.isDesktop ? 18 : screenInfo.isTablet ? 17 : screenInfo.isSmallMobile ? 15 : 16,
    xlarge: screenInfo.isLargeDesktop ? 26 : screenInfo.isDesktop ? 22 : screenInfo.isTablet ? 20 : screenInfo.isSmallMobile ? 16 : 18,
    xxlarge: screenInfo.isLargeDesktop ? 34 : screenInfo.isDesktop ? 28 : screenInfo.isTablet ? 24 : screenInfo.isSmallMobile ? 18 : 20,
    title: screenInfo.isLargeDesktop ? 42 : screenInfo.isDesktop ? 36 : screenInfo.isTablet ? 30 : screenInfo.isSmallMobile ? 22 : 26,
  },

  spacing: {
    xs: screenInfo.isLargeDesktop ? 10 : screenInfo.isDesktop ? 8 : screenInfo.isTablet ? 6 : screenInfo.isSmallMobile ? 3 : 4,
    sm: screenInfo.isLargeDesktop ? 14 : screenInfo.isDesktop ? 12 : screenInfo.isTablet ? 10 : screenInfo.isSmallMobile ? 6 : 8,
    md: screenInfo.isLargeDesktop ? 18 : screenInfo.isDesktop ? 16 : screenInfo.isTablet ? 14 : screenInfo.isSmallMobile ? 10 : 12,
    lg: screenInfo.isLargeDesktop ? 28 : screenInfo.isDesktop ? 24 : screenInfo.isTablet ? 20 : screenInfo.isSmallMobile ? 14 : 16,
    xl: screenInfo.isLargeDesktop ? 38 : screenInfo.isDesktop ? 32 : screenInfo.isTablet ? 28 : screenInfo.isSmallMobile ? 20 : 24,
    xxl: screenInfo.isLargeDesktop ? 56 : screenInfo.isDesktop ? 48 : screenInfo.isTablet ? 40 : screenInfo.isSmallMobile ? 28 : 32,
    xxxl: screenInfo.isLargeDesktop ? 80 : screenInfo.isDesktop ? 64 : screenInfo.isTablet ? 56 : screenInfo.isSmallMobile ? 40 : 48,
  },

  width: {
    button: screenInfo.isLargeDesktop 
      ? Math.min(400, width * 0.25)
      : screenInfo.isDesktop 
      ? Math.min(350, width * 0.3) 
      : screenInfo.isTablet 
      ? Math.min(320, width * 0.6)
      : screenInfo.isSmallMobile
      ? Math.min(260, width * 0.75)
      : Math.min(280, width * 0.7),
    
    container: screenInfo.isLargeDesktop 
      ? 600
      : screenInfo.isDesktop 
      ? 500 
      : screenInfo.isTablet 
      ? 400
      : screenInfo.isSmallMobile
      ? width * 0.85
      : width * 0.8,
      
    input: screenInfo.isLargeDesktop 
      ? 400
      : screenInfo.isDesktop 
      ? 350 
      : screenInfo.isTablet 
      ? 320
      : screenInfo.isSmallMobile
      ? width * 0.75
      : width * 0.7,
    
    logo: screenInfo.isLargeDesktop 
      ? 280
      : screenInfo.isDesktop 
      ? 220
      : screenInfo.isTablet 
      ? 180
      : screenInfo.isSmallMobile
      ? 140
      : 180,
  },

  padding: {
    container: screenInfo.isLargeDesktop ? 80 : screenInfo.isDesktop ? 60 : screenInfo.isTablet ? 40 : screenInfo.isMobileDevice ? 8 : 16,
    form: screenInfo.isLargeDesktop ? 50 : screenInfo.isDesktop ? 40 : screenInfo.isTablet ? 30 : screenInfo.isMobileDevice ? 12 : 16,
    screen: screenInfo.isLargeDesktop ? 24 : screenInfo.isDesktop ? 20 : screenInfo.isTablet ? 16 : screenInfo.isMobileDevice ? 8 : 12,
  },

  height: {
    button: screenInfo.isSmallScreen 
      ? 44 
      : screenInfo.isLargeDesktop 
      ? 60 
      : screenInfo.isDesktop 
      ? 56 
      : screenInfo.isTablet 
      ? 52 
      : screenInfo.isSmallMobile 
      ? 46 
      : 48,
      
    input: screenInfo.isSmallScreen 
      ? 46 
      : screenInfo.isLargeDesktop 
      ? 58 
      : screenInfo.isDesktop 
      ? 54 
      : screenInfo.isTablet 
      ? 50 
      : screenInfo.isSmallMobile 
      ? 44 
      : 48,
      
    header: screenInfo.isSmallScreen 
      ? 50 
      : screenInfo.isDesktop 
      ? 70 
      : screenInfo.isTablet 
      ? 60 
      : 55,
  },
};

export const getLogoSize = (context: 'home' | 'auth') => {
  const baseSize = responsiveSize.width.logo;
  
  if (context === 'home') {
    const factor = screenInfo.isLargeDesktop 
      ? 1.3 
      : screenInfo.isDesktop 
      ? 1.1 
      : screenInfo.isTablet 
      ? 0.9 
      : screenInfo.isSmallMobile 
      ? 0.7  
      : 0.8; 
    return { 
      width: Math.round(baseSize * factor), 
      height: Math.round(baseSize * factor) 
    };
  } else {
    const factor = screenInfo.isLargeDesktop 
      ? 1.1 
      : screenInfo.isDesktop 
      ? 1.0 
      : screenInfo.isTablet 
      ? 0.9 
      : screenInfo.isSmallMobile 
      ? 0.75  
      : 0.85; 
    return { 
      width: Math.round(baseSize * factor), 
      height: Math.round(baseSize * factor) 
    };
  }
};

export const getResponsiveMarginTop = () => {
  if (screenInfo.isSmallScreen) return height * 0.05;
  if (screenInfo.isTallScreen && screenInfo.isLargeDesktop) return height * 0.18;
  if (screenInfo.isLargeDesktop) return height * 0.15;
  if (screenInfo.isDesktop) return height * 0.12;
  if (screenInfo.isTablet) return height * 0.10;
  return height * 0.08;
};

export const getSafeAreaPadding = () => {
  return {
    top: screenInfo.isSmallScreen ? 20 : screenInfo.isTablet ? 35 : 45,
    bottom: screenInfo.isSmallScreen ? 15 : screenInfo.isTablet ? 25 : 30,
    horizontal: responsiveSize.padding.container,
  };
};

export const getGridColumns = () => {
  if (screenInfo.isLargeDesktop) return 4;
  if (screenInfo.isDesktop) return 3;
  if (screenInfo.isTablet) return 2;
  return 1;
};