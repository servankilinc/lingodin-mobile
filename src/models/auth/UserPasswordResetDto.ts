import * as yup from 'yup';

export default class UserPasswordResetDto {
    email!: string;
    password!: string;
    confirmedPassword!: string;

    public constructor(email: string, password: string, confirmedPassword: string) {
        this.email = email;
        this.password = password;
        this.confirmedPassword = confirmedPassword;
    }
}

export const UserPasswordResetDtoValidation = yup.object().shape({ 
    email: yup
        .string()
        .email('Please enter a valid email address!')
        .required('You must enter an email address!'),
    password: yup
        .string()
        .min(6, 'Password must be at least 6 characters long!')
        .required('You must enter a password!'),
    confirmedPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Parola bilgileri eşleşmiyor')
        .required('You must enter a password again!'),
});