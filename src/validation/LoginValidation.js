import * as yup from 'yup';

const validation = yup.object().shape({
  email: yup
    .string()
    .email('Geçerli bir email adresi giriniz!')
    .required('Email bilgisi boş geçilemez'),
  password: yup
    .string()
    .min(6, 'Parola bilgisi en az 6 karakter olmalı')
    .required('Parola bilgisi boş geçilemez'),
});

export default validation;
