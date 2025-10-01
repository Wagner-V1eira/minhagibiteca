import React from 'react';
import { BaseToast, ErrorToast, InfoToast } from 'react-native-toast-message';


export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: '#28a745' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: '600',
        color: '#28a745'
      }}
      text2Style={{
        fontSize: 14,
        color: '#333'
      }}
    />
  ),
  
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: '#dc3545' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: '600',
        color: '#dc3545'
      }}
      text2Style={{
        fontSize: 14,
        color: '#333'
      }}
    />
  ),
  
  info: (props: any) => (
    <InfoToast
      {...props}
      style={{ borderLeftColor: '#17a2b8' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: '600',
        color: '#17a2b8'
      }}
      text2Style={{
        fontSize: 14,
        color: '#333'
      }}
    />
  ),
  
  customToast: ({ text1, text2 }: any) => (
    <BaseToast
      style={{
        borderLeftColor: '#007bff',
        width: '90%',
        height: 80,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1={text1}
      text2={text2}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007bff'
      }}
      text2Style={{
        fontSize: 14,
        color: '#333',
        marginTop: 4
      }}
    />
  )
};