import * as yup from 'yup';

export default class LoginByEmailDto {
    email!: string;
    password!: string;

    public constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}

export const LoginByEmailDtoValidation = yup.object().shape({
    email: yup
        .string()
        .email('Please enter a valid email address!')
        .required('You must enter an email address!'),
    password: yup
        .string()
        .min(6, 'Password must be at least 6 characters long!')
        .required('You must enter a password!'),
});
