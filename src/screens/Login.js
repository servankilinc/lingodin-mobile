import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useFormik } from 'formik';
import axios from 'axios';
import validation from '../validation/LoginValidation';
import { ClearUserInfo, SetUserInfo } from '../utils/LocalStorage';
import {GoogleLoginButton} from '../utils/GoogleLoginButton';
// import {FacebookSignButton} from '../utils/FacebookAuth';
import ModalSuccess from '../components/global/ModalSuccess';
import ModalError from '../components/global/ModalError';
import Icon from '../assets/svg';
import Config from '../../config';
import LoginBackground from '../assets/svg/LoginBackground';
import { FacebookLoginButton } from '../utils/FacebookLoginButton';


export default function Login({navigation}) {
  
  useEffect(() =>{ ClearUserInfo();}, []);

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: validation,
    onSubmit: async (values, bag) => {
      
      let requestObject = {
        email: values.email,
        password: values.password
      };

      axios.post(Config.LoginUrl, requestObject).then(responseAxios => responseAxios.data)
        .then(response => { 
          SetUserInfo(response)
            .then(() => navigation.navigate('Home'))
            .catch(() => ShowErrorModal('Bir Hata Oluştu Lütfen Tekrar Deneyiniz!'));
        })
        .catch((error, status) => {
          let errorDetail =  error && error.response ? error.response.data : null;
          if(errorDetail != null && errorDetail.detail != null && errorDetail.detail == "NotVerifiedUser"){
            ShowSuccessModal('Devam Edebilmek için Hesabınızı Onaylamanız Gerekmekte.')
            setTimeout(() => navigation.navigate('UserVerify', { email: requestObject.email }), 4000);
          }
          else{
            //2(errorDetail != null && errorDetail.detail != null) ? errorDetail.detail :
            ShowErrorModal( 'Bir hata oluştu, lütfen bilgilerinizi kontrol edinip tekrar deneyiniz!'); 
          } 
        });
    },
  });

  
  // --------------- Error Modal ---------------
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorModalContent, setErrorModalContent] = useState('');
  
  const ShowErrorModal = message => {
    setErrorModalContent(message);
    setErrorModalVisible(true);
    setTimeout(() => setErrorModalVisible(false), 3000);
  };
  // --------------- Error Modal ---------------
  

  // --------------- Success Modal ---------------
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [successModalContent, setSuccessModalContent] = useState('');
  
  const ShowSuccessModal = message => {
    setSuccessModalContent(message);
    setSuccessModalVisible(true);
    setTimeout(() => setSuccessModalVisible(false), 3000);
  };
  // --------------- Success Modal ---------------


  return (
    <View style={styles.container}>
      <View style={{position:"absolute",  width:"100%",height:"60%"} }>
        <LoginBackground/>
      </View>
      <View style={styles.body}>
        <View style={styles.formBody}>
          <View style={styles.header}>
            <Text style={styles.title}>Giriş Yap</Text>
          </View>
          <View>
            <TextInput
              name="email"
              value={formik.values.email}
              onBlur={formik.handleBlur('email')}
              onChangeText={formik.handleChange('email')}
              keyboardType="email-address"
              style={styles.inputText}
              placeholderTextColor={'#aaa'}
              placeholder="E-Posta Addresi"
              autoCapitalize="none"
            />
            {formik.touched.email && formik.errors.email && (
              <Text style={styles.alert}>
                <Icon name="alert-circle" c={'#c93838'} w={14} h={14} />
                {formik.errors.email}
              </Text>
            )}
            <TextInput
              name="password"
              value={formik.values.password}
              onBlur={formik.handleBlur('password')}
              onChangeText={formik.handleChange('password')}
              keyboardType="visible-password"
              style={styles.inputText}
              placeholderTextColor={'#aaa'}
              placeholder="Parola"
              autoCapitalize="none"
              secureTextEntry
            />
            {formik.touched.password && formik.errors.password && (
              <Text style={styles.alert}>
                <Icon name="alert-circle" c={'#c93838'} w={14} h={14} />
                {formik.errors.password}
              </Text>
            )}
            <View style={styles.buttonsRow}>
              <TouchableOpacity
                style={styles.buttonSignUp}
                onPress={() => navigation.navigate('Signup')}
              >
                <Text style={styles.textButtonSignUp}>Hesabım Yok</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonLogin}
                onPress={formik.handleSubmit}>
                <Text style={styles.textButtonLogin}>Gönder</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.oauthButtonsBody}>
        <GoogleLoginButton navigation={navigation} ShowSuccessModal={ShowSuccessModal} ShowErrorModal={ShowErrorModal} />
        {/* <FacebookSignButton ShowErrorModal={ShowErrorModal} /> */}
        <FacebookLoginButton navigation={navigation} ShowSuccessModal={ShowSuccessModal} ShowErrorModal={ShowErrorModal} />
      </View>

      <ModalSuccess content={successModalContent} visible={successModalVisible} />
      <ModalError content={errorModalContent} visible={errorModalVisible} />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: '7%',
  },
  body: {
    flex: 6,
    display: 'flex', 
    justifyContent: 'flex-end',
  },
  formBody: { 
    padding: '5%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#dfdfdf',
    borderRadius: 20,
    shadowColor: '#464646',
    shadowOffset: {
      width: 20,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ececec',
    paddingBottom: 12,
    marginBottom: '10%',
  },
  title: {
    fontSize: 24,
    fontWeight:"300",
    color:"#aaa"
  },
  inputText: {
    backgroundColor: '#fff',
    padding: 14,
    paddingLeft: 20,
    marginTop: 28,
    borderColor: '#ebebeb',
    color: "#aaa",
    borderWidth: 1,
    borderRadius: 15,
    shadowColor: '#727272',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  alert: {
    color: '#c93838',
    marginHorizontal: 12,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  buttonSignUp: {
    backgroundColor: '#fff',
    marginTop: 48,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 15,
    alignSelf: 'flex-end',
    shadowColor: '#aaa',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textButtonSignUp: {
    color: '#23689B',
    fontWeight:"600" 
  },
  buttonLogin: {
    backgroundColor: '#23689B',
    marginTop: 48,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 15,
    alignSelf: 'flex-end',
    shadowColor: '#727272',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textButtonLogin: {
    color: '#fff',
    fontWeight:"600" 
  },
  oauthButtonsBody: {
    flex: 2,
    justifyContent: 'flex-end',
  },
});
