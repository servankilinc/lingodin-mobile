import React, { useEffect, useState } from 'react'
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { useFormik } from 'formik';
import { GetUserInfo } from '../utils/LocalStorage';
import { GetRequest, PostRequest } from '../utils/GlobalApiCall';
import Header from '../components/global/Header'
import ModalSuccess from '../components/global/ModalSuccess';
import ModalError from '../components/global/ModalError';
import ValidationPasswordReset from '../validation/PassworResetValidation';
import Icon from '../assets/svg';


export default function PasswordReset({navigation, route}) {

    const [expirationTime, setExpirationTime] = useState("");

    useEffect(()=> SendCodePassworResetOTPCode(), []);
    
    const formik = useFormik({
        initialValues: { password:'', confirmedPassword: '', otpCode: '' },
        validationSchema: ValidationPasswordReset,
        onSubmit: async (values, bag) => {
            let requestObject = { 
                email: route.params.email,
                password: values.password,
                confirmedPassword: values.confirmedPassword,
                otpCode: values.otpCode
            };

            PostRequest("/api/Auth/ResetPassword", requestObject, navigation)
                .then(response => {
                    ShowSuccessModal("Parolanız Başarıyla Güncellendi.");
                    setTimeout(() => navigation.navigate("Login"), 4000);
                })
                .catch(error => {
                    let errorDetail = error?.response?.data;
                    ShowErrorModal((errorDetail != null && errorDetail.detail != null) ? errorDetail.detail : 'İşlem Sırasında Bir Sorun Oluştu!');
                })
        },
    });

    
    

    // --------------- Code Timer Field ---------------    
    const SendCodePassworResetOTPCode = () =>{
        GetRequest(`/api/Auth/SendPasswordResetMail?email=${route.params.email}`, navigation).then(() => {
          OtpExpiryTimeRequest();
        })
        .catch(error=> {
          let errorDetail = error?.response?.data;
          ShowErrorModal((errorDetail != null && errorDetail.detail != null) ? errorDetail.detail : 'Kod Gönderilemedi, Lütfen Tekrar Deneyiniz!');
        })
    }
    
    
    const OtpExpiryTimeRequest = () => {
        GetRequest(`/api/Auth/GetOTPExpirationTimeByMail?email=${route.params.email}`, navigation)
            .then(response => {
                let date = new Date(response);
                if(date != null){
                    TimerHandler(date);
                }
            })
    }
    
    const TimerHandler = (expirDate) => {
    
        if (typeof timerInterval !== "undefined") {
          clearInterval(timerInterval);
        }
        
        timerInterval = setInterval(() => {
           let min = 0;
           let second = 0;
           let currentDate = new Date();
    
           let remaindSecond = (expirDate.getTime() - currentDate.getTime()) / 1000;
     
           if (remaindSecond <= 0) {
             min = 0;
             second = 0;
             clearInterval(timerInterval);
           }
           else {
             min = Math.floor(remaindSecond / 60);
             second = Math.floor(remaindSecond % 60);
           }
     
           const formattedMin = String(min).padStart(2, '0');
           const formattedSecond = String(second).padStart(2, '0');
     
           setExpirationTime(`${formattedMin}:${formattedSecond}`);
        }, 1000);
    };
    // --------------- Code Timer Field ---------------




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
            <Header title="Parola Yenile" />
            <ScrollView style={styles.bodyCollapse}>
  
                <View style={styles.body}>
                    <Text style={styles.inputLable}>
                        Yeni Parola
                    </Text>
                    <TextInput
                        name="password"
                        value={formik.values.password}
                        onBlur={formik.handleBlur('password')}
                        onChangeText={formik.handleChange('password')}
                        keyboardType="visible-password"
                        style={styles.inputText}
                        placeholderTextColor={'#ccc'}
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
                    <Text style={styles.inputLable}>
                        Yeni Parolayı Tekrar Giriniz
                    </Text>
                    <TextInput
                        name="confirmedPassword"
                        value={formik.values.confirmedPassword}
                        onBlur={formik.handleBlur('confirmedPassword')}
                        onChangeText={formik.handleChange('confirmedPassword')}
                        keyboardType="visible-password"
                        style={styles.inputText}
                        placeholderTextColor={'#ccc'}
                        placeholder="Parolanızı tekrar giriniz"
                        autoCapitalize="none"
                        secureTextEntry
                    />
                    {formik.touched.confirmedPassword && formik.errors.confirmedPassword && (
                        <Text style={styles.alert}>
                            <Icon name="alert-circle" c={'#c93838'} w={14} h={14} />
                            {formik.errors.confirmedPassword}
                        </Text>
                    )}
                    <Text style={styles.inputLable}>
                        Eposta Addresinize Gönderilen Güvenlik Kodunu Giriniz
                    </Text>
                    <TextInput
                        name="otpCode"
                        value={formik.values.otpCode}
                        onBlur={formik.handleBlur('otpCode')}
                        onChangeText={formik.handleChange('otpCode')}
                        keyboardType="numeric"
                        style={styles.inputText}
                        placeholderTextColor={'#ccc'}
                        placeholder="Güvenlik kodunu giriniz"
                        autoCapitalize="none"
                    />
                    {formik.touched.otpCode && formik.errors.otpCode && (
                        <Text style={styles.alert}>
                            <Icon name="alert-circle" c={'#c93838'} w={14} h={14} />
                            {formik.errors.otpCode}
                        </Text>
                    )}
                        <View style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                            <Text style={{color:"blue", margin:12}}>
                                {expirationTime}
                            </Text>
                            <TouchableOpacity onPress={SendCodePassworResetOTPCode}>
                                <Text style={{color:"#aaa"}}>
                                    Yeni Kod Gönder.
                                </Text>
                            </TouchableOpacity>
                        </View>
                    <View style={styles.buttonsRow}> 
                        <TouchableOpacity
                            style={styles.buttonSubmit}
                            onPress={formik.handleSubmit}>
                            <Text style={styles.textButtonSubmit}>Onayla</Text>
                        </TouchableOpacity>
                    </View>
                </View>  
            </ScrollView>
  
            <ModalSuccess visible={successModalVisible} content={successModalContent} />
            <ModalError visible={errorModalVisible} content={errorModalContent} />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    bodyCollapse: {
        backgroundColor: '#f1f1f1',
    }, 
    body: {
        backgroundColor: '#fff',
        gap: 4,
        margin: '5%',
        padding: 12,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#eee",
        shadowColor: '#aaa',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 12,
    },
    inputLable:{
        fontSize:12,
        marginLeft:6,
        color: "#a0a0a0"
    },
    inputText: {
        backgroundColor: '#fff',
        padding: 10,
        paddingLeft: 20,
        marginBottom: 28,
        borderColor: '#dfdfdf',
        color: "#a0a0a0",
        borderWidth: 1,
        borderRadius: 12,
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
      buttonSubmit: {
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
      textButtonSubmit: {
        color: '#fff',
      },
});