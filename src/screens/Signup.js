import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import axios from 'axios';
import {useFormik} from 'formik';
import SignUpValidation from '../validation/SignUpValidation';
import { SetUserInfo} from '../utils/LocalStorage';
import Icon from '../assets/svg';
import Config from '../../config';
import SignupBackground from '../assets/svg/SignupBackground';
import ModalSuccess from '../components/global/ModalSuccess';
import ModalError from '../components/global/ModalError';

export default function Signup({navigation}) {
 
  const formik = useFormik({
    initialValues: {fullName: '', email: '', password: '', passwordConfirm: ''},
    validationSchema: SignUpValidation,
    onSubmit: async (values, bag) => {
      let requestObject = {
        fullName: values.fullName,
        email: values.email,
        password: values.password,
        autheticatorType: 1,
      };
      console.log("gönderilen => ", requestObject);
      axios.post(Config.SignupUrl, requestObject).then(responseAxios => responseAxios.data)
        .then(response => {
          console.log("response => ", JSON.stringify(response))
          ShowSuccessModal('Devam Edebilmek için Hesabınızı Onaylamanız Gerekmekte.')
          setTimeout(() => navigation.navigate('UserVerify', { email: requestObject.email }), 4000);
        })
        .catch((error, status) => { 
          var detail = error?.response?.data?.detail;
          ShowErrorModal(detail != null && detail == "Email Address Already Exist" ? "Eposta Adresi Kullanılmaktadır, Farklı Bir Eposta Adresi ile Tekrar deneyiniz." : 'Bir hata oluştu, lütfen tekrar deneyiniz!'); 
        });
    },
  });

  
  // --------------- Error Modal ---------------
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorModalContent, setErrorModalContent] = useState('');
  
  const ShowErrorModal = message => {
    setErrorModalContent(message);
    setErrorModalVisible(true);
    setTimeout(() => setErrorModalVisible(false), 4000);
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
      <View style={{position:"absolute", width:"100%",height:"50%"} }>
        <SignupBackground/>
      </View>
      <View style={styles.body}>
        <View style={styles.formBody}>
          <View style={styles.header}>
            <Text style={styles.title}>Kaydol</Text>
          </View>
          <View>
            <TextInput
              name="fullName"
              value={formik.values.fullName}
              onBlur={formik.handleBlur('fullName')}
              onChangeText={formik.handleChange('fullName')}
              style={styles.inputText}
              placeholderTextColor={'#aaa'}
              placeholder="İsim Soyisim"
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <Text style={styles.alert}>
                <Icon name="alert-circle" c={'#c93838'} w={14} h={14} />
                {formik.errors.fullName}
              </Text>
            )}
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
                {formik.errors.email}787937
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
            <TextInput
              name="passwordConfirm"
              value={formik.values.passwordConfirm}
              onBlur={formik.handleBlur('passwordConfirm')}
              onChangeText={formik.handleChange('passwordConfirm')}
              keyboardType="visible-password"
              style={styles.inputText}
              placeholderTextColor={'#ccc'}
              placeholder="Parolanızı tekrar giriniz"
              autoCapitalize="none"
              secureTextEntry
            />
            {formik.touched.passwordConfirm &&
              formik.errors.passwordConfirm && (
                <Text style={styles.alert}>
                  <Icon name="alert-circle" c={'#c93838'} w={14} h={14} />
                  {formik.errors.passwordConfirm}
                </Text>
              )}
            <View style={styles.buttonsRow}>
              <TouchableOpacity
                style={styles.buttonSignUp}
                onPress={() => navigation.navigate('Login')}>
                <Text style={styles.textButtonSignUp}>Hesabım Var</Text>
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
    flex: 4,
    display: 'flex',
    justifyContent: 'center',
  },
  formBody: {
    marginTop: "30%",
    padding: '5%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#dfdfdf',
    borderRadius: 20,
    shadowColor: '#555',
    shadowOffset: {
      width: 0,
      height: 1,
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
    marginBottom: '5%',
  },
  title: {
    fontSize: 36,
    fontWeight:"300"
  },
  inputText: {
    backgroundColor: '#fff',
    padding: 10,
    paddingLeft: 20,
    marginTop: 28,
    borderColor: '#ebebeb',
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
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: '#c93838',
  },
});
