import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import axios from 'axios';
import Icon from '../assets/svg';
import { SetUserInfo } from './LocalStorage';
import Config from '../../config';

export const GoogleLoginButton = ({navigation, ShowSuccessModal, ShowErrorModal}) => {
  
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      webClientId: Config.WebClientIdGoogle,
    }); 
  
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          try {
            const userInfo = await GoogleSignin.signIn();

            axios.post(Config.GoogleAuthApiUrl, {idToken: userInfo.idToken}).then(responseAxios => responseAxios.data).then(response => {
              SetUserInfo(response)
                .then(() => {
                  ShowSuccessModal('Giriş İşlemi Başarılı.')
                  setTimeout(()=> navigation.navigate('Home'),3500)
                })
                .catch((error) => {
                  ShowErrorModal('Bir Hata Oluştu Lütfen Tekrar Deneyiniz!');
                });
            })
            .catch((error, status) => {
              ShowErrorModal('Bir Hata Oluştu Lütfen Tekrar Deneyiniz!');
            });
          }
          catch (error) {
            ShowErrorModal('Bir Hata Oluştu Lütfen Tekrar Deneyiniz!');
          }
        }}>

        <Icon name="google" c={'#c93838'} w={38} h={38} />
        <View style={styles.bodyText}>
          <Text style={styles.text}>Googe ile devam et</Text>
        </View>
      </TouchableOpacity>
    );
  };
  
  export const GetCurrentUserByGoogle = async () => {
    // const currentUser = GoogleSignin.getCurrentUser();
  };
  
  export const SignOutByGoogle = async () => {
    await GoogleSignin.signOut();
  };
  
  const styles = StyleSheet.create({
    button: {
      width:'90%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      margin: 10,
      gap: 10,
      paddingVertical: 8,
      paddingHorizontal: 18,
      borderWidth: 1,
      borderColor: '#ededed',
      borderRadius: 20,
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    bodyText: {
      marginHorizontal: 5,
      alignItems: 'center',
    },
    text: {
      fontSize: 16,
      fontWeight: 'bold',
    },
  });