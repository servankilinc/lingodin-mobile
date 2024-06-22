import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { SetUserInfo } from '../utils/LocalStorage';
import ModalSuccess from '../components/global/ModalSuccess';
import ModalError from '../components/global/ModalError';
import Config from '../../config';
import UserVerifyBackground from '../assets/svg/UserVerifyBackground';


export default function UserVerify({navigation, route}) {
  
  const [sendButtonActivate, setSendButtonActivate] = useState(false);
  const [otpCode, setOTPCode] = useState('');

  useEffect(()=>{
    if(otpCode.length == 6 && !otpCode.includes(" ")){
      setSendButtonActivate(true);
    }
    else{
      setSendButtonActivate(false);
    }
  },[otpCode])


  const code1Input = useRef(null);
  const code2Input = useRef(null);
  const code3Input = useRef(null);
  const code4Input = useRef(null);
  const code5Input = useRef(null);
  const code6Input = useRef(null);
  

  const HandleCodeChange = (content, inputIndex, nextInputRef) => {
    if(content != null && content.length > 0){
      if(nextInputRef != null){
        nextInputRef.current.focus();
      }
      setOTPCode(prev => { 
        let updatedOTP = prev.split('');
        updatedOTP[inputIndex] = content;
        return updatedOTP.join(''); 
      })
    }
    else{
      setOTPCode(prev => { 
        let updatedOTP = prev.split('');
        updatedOTP[inputIndex] = " ";
        return updatedOTP.join(''); 
      })
    }
  }

 
  const SendCode =  ()  => {
    let requestObject = {
      email: route.params.email,
      code: otpCode
    };
    axios.post(Config.VerifyUserByMailUrl, requestObject)
      .then(responseAxios => {
        let response = responseAxios.data;  
        SetUserInfo(response).then(() => {
            ShowSuccessModal('Hesabınız Başarıyla Doğrulandı.');
            setTimeout(() => navigation.navigate('Home'), 4000);
          })
          .catch(() => ShowErrorModal('Bir Hata Oluştu Lütfen Tekrar Deneyiniz!')); 
      })
      .catch(error=> {
        let errorDetail = error && error.response ? error.response.data : null;
        ShowErrorModal((errorDetail != null && errorDetail.detail != null) ? errorDetail.detail : 'Kod Gönderilemedi, Lütfen Tekrar Deneyiniz!');
      })
  }


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
      <View style={{position:"absolute", width:"100%",height:"50%"} }>
        <UserVerifyBackground/>
      </View>
      <View style={styles.body}>
        <View style={styles.formBody}>
          <View style={styles.header}>
            <Text style={styles.title}>Hesabı Doğrulayın</Text>
          </View>
          <View>
            <TextInput
              name="email"
              editable={false}
              value={route.params.email} 
              keyboardType="email-address"
              style={styles.inputText}
              placeholderTextColor={'#aaa'}
              placeholder="E-Posta Addresi"
              autoCapitalize="none"
            />

            <View style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center", marginTop:"20%", marginBottom:"5%", gap:10}}>
              <TextInput ref={code1Input} onChangeText={(content) => HandleCodeChange(content, 0, code2Input)} style={styles.inputOfCode} inputMode='numeric' maxLength={1}></TextInput>
              <TextInput ref={code2Input} onChangeText={(content) => HandleCodeChange(content, 1, code3Input)} style={styles.inputOfCode} inputMode='numeric' maxLength={1}></TextInput>
              <TextInput ref={code3Input} onChangeText={(content) => HandleCodeChange(content, 2, code4Input)} style={styles.inputOfCode} inputMode='numeric' maxLength={1}></TextInput>
              <TextInput ref={code4Input} onChangeText={(content) => HandleCodeChange(content, 3, code5Input)} style={styles.inputOfCode} inputMode='numeric' maxLength={1}></TextInput>
              <TextInput ref={code5Input} onChangeText={(content) => HandleCodeChange(content, 4, code6Input)} style={styles.inputOfCode} inputMode='numeric' maxLength={1}></TextInput>
              <TextInput ref={code6Input} onChangeText={(content) => HandleCodeChange(content, 5, null)} style={styles.inputOfCode} inputMode='numeric' maxLength={1}></TextInput>
            </View>

            <OTPCodeInfoSection/>

            <View style={styles.buttonsRow}>
              {
                sendButtonActivate &&
                  <TouchableOpacity
                    style={styles.buttonLogin}
                    onPress={SendCode}
                  >
                    <Text style={styles.textButtonLogin}>Gönder</Text>
                  </TouchableOpacity>
              }
            </View>
          </View>
        </View>
      </View>

      <ModalSuccess content={successModalContent} visible={successModalVisible} />
      <ModalError content={errorModalContent} visible={errorModalVisible} />

    </View>
  )
}



function OTPCodeInfoSection() {

  const route = useRoute();

  const SendCodeAgain = async () =>{
    axios.get(`${Config.SendVerifyCodeAganByMailUrl}?email=${route.params.email}`).then(() => {
      ShowSuccessModal('Kod Yeniden Gönderildi.');
      OtpExpiryTimeRequest();
    })
    .catch(error=> {
      console.log("error => ",JSON.stringify(error))
      let errorDetail = error && error.response ? error.response.data : null;
      ShowErrorModal((errorDetail != null && errorDetail.detail != null) ? errorDetail.detail : 'Kod Gönderilemedi, Lütfen Tekrar Deneyiniz!');
    })
  }

  const [expirationTime, setExpirationTime] = useState("");

  useEffect(()=> OtpExpiryTimeRequest(), [])

  const OtpExpiryTimeRequest = () => {
    axios.get(`${Config.GetOTPExpirationTimeByMail}?email=${route.params.email}`)
      .then(responseAxios => {
        let date = new Date(responseAxios.data);
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
    <View style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
      <Text style={{color:"blue", margin:12}}>
        {expirationTime}
      </Text>
      <TouchableOpacity onPress={SendCodeAgain}>
        <Text>
          Yeni Kod Gönder.
        </Text>
      </TouchableOpacity>
      
      <ModalSuccess content={successModalContent} visible={successModalVisible} />
      <ModalError content={errorModalContent} visible={errorModalVisible} />
    </View>
  )
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
    marginTop: "40%",
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
  },
  title: {
    fontSize: 32,
  },
  inputText: {
    backgroundColor: '#fff',
    padding: 14,
    paddingLeft: 20,
    marginTop: 28,
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
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor:"#efefef",
    gap: 8,
  },
  buttonLogin: {
    backgroundColor: '#23689B',
    marginTop: 36,
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
  },
  inputOfCode:{
    borderWidth:1, 
    borderRadius:10, 
    borderColor:"#ddd",
    paddingLeft:"5%",
    paddingRight:0,
    backgroundColor: "#fff",
    shadowColor: '#727272',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  }
});
