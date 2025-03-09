import { AutheticatorType } from "../../utils/AutheticatorType";

export default class UserResponseDto {
    id!: string;
    fullName?: string;
    email?: string;
    isVerifiedUser?: boolean;
    autheticatorType?: AutheticatorType;

    public constructor(id: string, fullName: string, email: string, isVerifiedUser: boolean, autheticatorType: AutheticatorType) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.isVerifiedUser = isVerifiedUser;
        this.autheticatorType = autheticatorType;
    }
}
