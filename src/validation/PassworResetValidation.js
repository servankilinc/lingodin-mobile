import * as yup from 'yup';

const ValidationPasswordReset = yup.object().shape({
  password: yup
    .string()
    .min(6, 'Parola bilgisi en az 6 karakter olmalı')
    .required('Parola bilgisi boş geçilemez'),
  confirmedPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Parola bilgileri eşleşmiyor')
    .required('Bilgisi boş geçilemez'),
    otpCode: yup
    .string()
    .min(6, 'Kod bilgisi 6 karakter olmalı')
    .max(6, 'Kod bilgisi 6 karakter olmalı')
    .required('Kod bilgisi boş geçilemez'),
});

export default ValidationPasswordReset;
