// import React from 'react' 
// import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
// import { AccessToken, LoginManager, Profile, Settings } from 'react-native-fbsdk-next';
// import axios from 'axios';
// import { SetUserInfo } from './LocalStorage';
// import Icon from '../assets/svg';
// import Config from '../../config';

// export const FacebookLoginButton = ({navigation, ShowSuccessModal, ShowErrorModal}) => {
//   Settings.setAppID(Config.AppIdFacebook);

  
//   return (
//     <TouchableOpacity
//       style={styles.button}
//       onPress={async () => {
//         try {
//             LoginManager.logInWithPermissions(["public_profile", "email"]).then((result) => {
//                 console.log('Login result declinedPermissions => ' + JSON.stringify(result)); 
//                 if (result.isCancelled) {
//                   console.log('Login cancelled');
//                 } else {
//                   AccessToken.getCurrentAccessToken().then((data) => {
//                     console.log("Login success ACCESTOKEN => ",data?.accessToken.toString());
//                   });
//                   Profile.getCurrentProfile().then((data) => {
//                     console.log("Login success  PROFILE => ", data);
//                   });
//                 }
//             },
//             function(error) {
//                 console.log('Login fail with error: ' + error);
//             }
//         );
//           // axios
//           //   .post('', {})
//           //   .then(responseAxios => {
//           //     let response = responseAxios.data;
//           //     console.log('Response => ', response);
//           //     if (response.success) {
//           //       SetUserInfo(response.data)
//           //         .then(() => {
//           //           navigation.popTo('Home');
//           //         })
//           //         .catch(() => {
//           //           ShowErrorModal('Bir Hata Oluştu Lütfen Tekrar Deneyiniz!');
//           //         });
//           //     } else {
//           //       ShowErrorModal('Bir Hata Oluştu Lütfen Tekrar Deneyiniz!');
//           //     }
//           //   })
//           //   .catch((error, status) => {
//           //     ShowErrorModal('Bir Hata Oluştu Lütfen Tekrar Deneyiniz!');
//           //   });
//         } catch (error) {
//           console.log('error USER FROM METHOD => ', error);
//           ShowErrorModal('Bir Hata Oluştu Lütfen Tekrar Deneyiniz!');
//         }
//       }}>
//       <Icon name="facebook" c={'#fff'} w={38} h={38} />
//       <View style={styles.bodyText}>
//         <Text style={styles.text}>Facebook ile devam et</Text>
//       </View>
//     </TouchableOpacity>
//   );
// }


// export const GetCurrentUserByFacebook = async () => {
//     let currentProfile = await Profile.getCurrentProfile();
//     console.log(
//       'The current user facebook is: ' + JSON.stringify(currentProfile),
//     );
//   };



  
// const styles = StyleSheet.create({
//     button: {
//       width:'90%',
//       display: 'flex',
//       flexDirection: 'row',
//       alignItems: 'center',
//       alignSelf: 'center',
//       margin: 10,
//       gap: 10,
//       paddingVertical: 8,
//       paddingHorizontal: 18,
//       borderWidth: 1,
//       borderColor: '#5a92ef',
//       borderRadius: 20,
//       backgroundColor: '#0866ff',
//       shadowColor: '#000',
//       shadowOffset: {
//         width: 0,
//         height: 1,
//       },
//       shadowOpacity: 0.25,
//       shadowRadius: 4,
//       elevation: 5,
//     },
//     bodyText: {
//       marginHorizontal: 5,
//       alignItems: 'center',
//     },
//     text: {
//       fontSize: 16,
//       fontWeight: 'bold',
//       color:'#fff',
//     },
//   });
  