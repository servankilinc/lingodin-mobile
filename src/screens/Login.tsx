import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useFormik } from 'formik';
import { useAppDispatch } from '../redux/hooks';
import { showAlertError, showAlertSuccess } from '../redux/reducers/AlertSlice';
import { ClearStorage, SetStorageToAuth } from '../utils/LocalStorage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { RouteList } from '../utils/RouteList';
import LoginByEmailDto, { LoginByEmailDtoValidation } from '../models/auth/LoginByEmailDto';
import { PostRequest } from '../utils/GlobalApiCall';
import UserAuthResponseModel from '../models/auth/UserAuthResponseModel';
import ProblemDetail, { ErrorTypes } from '../utils/ProblemDetail';
import LoginBackground from '../assets/svg/LoginBackground';
import { AlertCircle, LoaderCircle } from 'lucide-react-native';
import PureTemplate from '../templates/PureTemplate';
import ButtonPrimary from '../components/global/buttons/ButtonPrimary';

type SectionProps = NativeStackScreenProps<RootStackParamList, RouteList.login>;

export default function Login({ navigation }: SectionProps): React.JSX.Element {

  useEffect(() => { ClearStorage(); }, []);

  const dispatch = useAppDispatch();

  // -------- process handle states -------
  const [isPending, setIsPending] = useState(false);

  // -------- Login Submit  -------
  const formik = useFormik({
    initialValues: new LoginByEmailDto('', ''),
    validationSchema: LoginByEmailDtoValidation,
    onSubmit: async (values, bag) => {
      try {
        setIsPending(true);
        const response = await PostRequest<LoginByEmailDto, UserAuthResponseModel>('/api/Auth/Login', values, navigation);
        if (response == null) { throw new Error(); }

        await SetStorageToAuth(response);
        dispatch(showAlertSuccess({
          message: "Giriş İşlemi Başarıyla Gerçekleşti",
          callback: () => navigation.navigate(RouteList.home)
        }));
      }
      catch (error) {
        /*if(errorDetail != null && errorDetail.detail != null && errorDetail.detail == "NotVerifiedUser"){
          ShowSuccessModal('Devam Edebilmek için Hesabınızı Onaylamanız Gerekmekte.')
          setTimeout(() => navigation.navigate('UserVerify', { email: requestObject.email }), 4000);}*/
        dispatch(showAlertError({
          message: error instanceof ProblemDetail && error.type == ErrorTypes.Business ? error.detail : undefined
        }))
      }
      finally {
        setIsPending(false);
      }
    },
  });

  return (
    <PureTemplate>
      <View style={{ position: "absolute", width: "100%", height: "60%" }}>
        <LoginBackground />
      </View>
      <View style={styles.body}>
        <View style={styles.formBody}>
          <View style={styles.header}>
            <Text style={styles.title}>Giriş Yap</Text>
          </View>
          <View>
            <TextInput
              value={formik.values.email}
              onBlur={formik.handleBlur('email')}
              onChangeText={formik.handleChange('email')}
              keyboardType="email-address"
              style={styles.inputText}
              placeholderTextColor={'#aaa'}
              placeholder="E-Posta Addresi"
              autoCapitalize="none"
            />
            {(formik.touched.email || formik.submitCount > 0) && formik.errors.email && (
              <Text style={styles.alert}>
                <AlertCircle color={'#c93838'} size={14} />
                {formik.errors.email}
              </Text>
            )}
            <TextInput
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
            {(formik.touched.password || formik.submitCount > 0) && formik.errors.password && (
              <Text style={styles.alert}>
                <AlertCircle color={'#c93838'} size={14} />
                {formik.errors.password}
              </Text>
            )}
            <View style={styles.buttonsRow}>
              <ButtonPrimary callback={() => navigation.navigate('Signup')} mode='light' text='Hesabım Yok' />
              <ButtonPrimary callback={() => formik.handleSubmit()} isPending={isPending} mode='blue' text='Giriş Yap' />
            </View>
          </View>
        </View>
      </View>

      {/* <View style={styles.oauthButtonsBody}>
        <GoogleLoginButton navigation={navigation} ShowSuccessModal={ShowSuccessModal} ShowErrorModal={ShowErrorModal} />
        <FacebookLoginButton navigation={navigation} ShowSuccessModal={ShowSuccessModal} ShowErrorModal={ShowErrorModal} />
      </View> */}
    </PureTemplate>
  );
}



const styles = StyleSheet.create({
 
  body: {
    flex: 1, 
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: 120,
    marginHorizontal: 20
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
    fontWeight: "300",
    color: "#aaa"
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
    marginTop: 30
  }, 
  oauthButtonsBody: {
    flex: 2,
    justifyContent: 'flex-end',
  },
});
