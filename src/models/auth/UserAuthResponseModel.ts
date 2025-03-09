import UserResponseDto from "../user/UserResponseDto";
import AccessToken from "./accessToken/AccessToken";
import RoleResponseDto from "./role/RoleResponseDto";

export default class UserAuthResponseModel {
    user!: UserResponseDto;
    accessToken!: AccessToken;
    roles!: RoleResponseDto[];

    public constructor(user: UserResponseDto, accessToken: AccessToken, roles: RoleResponseDto[]) {
        this.user = user;
        this.accessToken = accessToken;
        this.roles = roles;
    }
}
    