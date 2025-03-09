import * as yup from 'yup';

export default class UserUpdateDto {
    id!: string;
    fullName!: string;
    email!: string;

    public constructor(id: string, fullName: string, email: string) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
    }
}

export const UserLoginValidation = yup.object().shape({
    fullName: yup
        .string()
        .min(2, 'Name must be at least 2 characters long!')
        .required('You must enter name!'),
    email: yup
        .string()
        .email('Please enter a valid email address!')
        .required('You must enter an email address!'),
});
