import AsyncStorage from '@react-native-async-storage/async-storage';
import UserAuthResponseModel from '../models/auth/UserAuthResponseModel';
import UserResponseDto from '../models/user/UserResponseDto';
import AccessToken from '../models/auth/accessToken/AccessToken';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { RouteList } from './RouteList';
import RoleResponseDto from '../models/auth/role/RoleResponseDto';

export enum StorageKeys {
    UserInfo = "_UserInfo_",
    AccessToken = "_AccessToken_",
    RoleList = "_RoleList_",
}


export async function SetStorageToAuth(value: UserAuthResponseModel): Promise<void> {
    try {
        let userInfo: string = JSON.stringify(value.user);
        let accessTokenInfo: string = JSON.stringify(value.accessToken);
        let roleListInfo: string = JSON.stringify(value.roles);

        await AsyncStorage.multiSet([
            [StorageKeys.UserInfo, userInfo],
            [StorageKeys.AccessToken, accessTokenInfo],
            [StorageKeys.RoleList, roleListInfo]
        ]);
    }
    catch (error) {
        throw error;
    }
}

export async function SetUserInfo(value: UserResponseDto): Promise<void> {
    try {
        let userInfo: string = JSON.stringify(value);
        await AsyncStorage.setItem(StorageKeys.UserInfo, userInfo);
    }
    catch (error) {
        throw error;
    }
}

export async function SetAccessTokenInfo(value: AccessToken): Promise<void> {
    try {
        let accessTokenInfo: string = JSON.stringify(value);
        await AsyncStorage.setItem(StorageKeys.AccessToken, accessTokenInfo);
    }
    catch (error) {
        throw error;
    }
}

export async function GetUserInfo(navigation: NavigationProp<ParamListBase>): Promise<UserResponseDto> {
    try {
        const stringValue = await AsyncStorage.getItem(StorageKeys.UserInfo);
        if (stringValue == null) {
            throw new Error('User not found');
        }
        const userData: UserResponseDto = JSON.parse(stringValue);
        if (userData == null) {
            throw new Error('User data is null');
        }
        return userData;
    }
    catch (error) {
        navigation?.reset({
            index: 0,
            routes: [{ name: RouteList.login }],
        });
        throw error;
    }
}

export async function GetAccessTokenInfo(navigation: NavigationProp<ParamListBase>): Promise<AccessToken> {
    try {
        const stringValue = await AsyncStorage.getItem(StorageKeys.AccessToken);
        if (stringValue == null) {
            throw new Error('Access token not found');
        }
        let accessTokenData: AccessToken = JSON.parse(stringValue);
        if (accessTokenData == null) {
            throw new Error('Access Token is null');
        }
        return accessTokenData;
    }
    catch (error) {
        navigation?.reset({
            index: 0,
            routes: [{ name: RouteList.login }],
        });
        throw error;
    }
}

export async function GetRoleListInfo(navigation: NavigationProp<ParamListBase>): Promise<RoleResponseDto[]> {
    try {
        const stringValue = await AsyncStorage.getItem(StorageKeys.UserInfo);
        if (stringValue == null) {
            throw new Error('Role list not found');
        }
        const roleList = JSON.parse(stringValue);
        if (roleList == null) {
            throw new Error('Role list data is null');
        }
        return roleList;
    }
    catch (error) {
        navigation?.reset({
            index: 0,
            routes: [{ name: RouteList.login }],
        });
        throw error;
    }
}

export async function GetAccessTokenInfoNavigationLess(): Promise<string | null> {
    try {
        const stringValue = await AsyncStorage.getItem(StorageKeys.AccessToken);
        return stringValue;
    }
    catch (error) {
        throw error;
    }
}

export async function ClearStorage() {
    try {
        await AsyncStorage.clear();
        return true;
    }
    catch (error) {
        throw new Error('Failed to clear all storage data!');
    }
}
