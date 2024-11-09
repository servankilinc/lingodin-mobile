import * as yup from 'yup';

const SignUpValidation = yup.object().shape({
  fullName: yup
  .string() 
  .nonNullable()
  .required('Lütfen isim soyisim bilgisi giriniz'),
  email: yup
    .string()
    .email('Geçerli bir email adresi giriniz!')
    .required('Email bilgisi boş geçilemez'),
  password: yup
    .string()
    .min(6, 'Parola bilgisi en az 6 karakter olmalı')
    .required('Parola bilgisi boş geçilemez'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Parola bilgileri eşleşmiyor')
    .required('Bilgisi boş geçilemez'),
});
export default SignUpValidation;
