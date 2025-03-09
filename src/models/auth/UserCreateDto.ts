import * as yup from 'yup';

export default class UserCreateDto {
    fullName!: string;
    email!: string;
    password!: string;
    passwordConfirm?: string; // using only form side wont send with api

    public constructor(fullName: string, lastName: string, email: string, password: string) {
        this.fullName = fullName;
        this.email = email;
        this.password = password;
    }
}

export const UserCreateDtoValidation = yup.object().shape({
    fullName: yup.string()
        .nonNullable()
        .min(2, "Field must be at least 2 characters long!")
        .required("You must enter your first name!"),
    email: yup
        .string()
        .email('Please enter a valid email address!')
        .required('You must enter an email address!'),
    password: yup
        .string()
        .min(6, 'Password must be at least 6 characters long!')
        .required('You must enter a password!'),
    passwordConfirm: yup
        .string()
        .oneOf([yup.ref('password')], 'Parola bilgileri eşleşmiyor')
        .required('Bilgisi boş geçilemez'),
});