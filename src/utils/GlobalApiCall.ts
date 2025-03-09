import { NavigationProp, ParamListBase } from "@react-navigation/native";
import axios from "axios";
import {GetAccessTokenInfoNavigationLess} from "./LocalStorage"
import AccessToken from "../models/auth/accessToken/AccessToken";
import { RouteList } from "./RouteList";
import ProblemDetail, { ErrorTypes } from "./ProblemDetail";
import Config from "../../config";

const api = axios.create(
    {
        baseURL: Config.BaseUrl,
        timeout: 10000,
    }
);

api.interceptors.request.use(
    async (request) => {
        let stringValue = await GetAccessTokenInfoNavigationLess();
        if (stringValue != null) {
            let _tokenModel: AccessToken = JSON.parse(stringValue);
            request.headers['Authorization'] = `Bearer ${_tokenModel.token}`;
        }
        return request;
    },
    (error) => {
        return Promise.reject(error);
    }
);
 
const GoToLogin = (navigation: NavigationProp<ParamListBase>) => {
    navigation?.reset({
        index: 0,
        routes: [{ name: RouteList.login }],
    });
}


export async function GetRequest<TResponse>(url: string,  navigation: NavigationProp<ParamListBase>): Promise<TResponse> {
    try {
        const response = await api.get<TResponse>(url);
        return response.data;
    }
    catch (error) {
        const problemDetail = HandleError(error, navigation);
        throw problemDetail;
    }
}

export async function PostRequest<TRequest, TResponse = void>(url: string, data: TRequest, navigation: NavigationProp<ParamListBase>): Promise<TResponse | void> {
    try {
        const response = await api.post(url, data);
        return response.data ?? undefined;
    }
    catch (error) {
        const problemDetail = HandleError(error, navigation);
        throw problemDetail;
    }
}

export async function PutRequest<TRequest, TResponse = void>(url: string, data: TRequest, navigation: NavigationProp<ParamListBase>): Promise<TResponse | void> {
    try {
        const response = await api.put<TResponse>(url, data);
        return response.data ?? undefined;
    }
    catch (error) {
        const problemDetail = HandleError(error, navigation);
        throw problemDetail;
    }
}

export async function DeleteRequest<TResponse = void>(url: string, navigation: NavigationProp<ParamListBase>): Promise<TResponse | void> {
    try {
        const response = await api.delete<TResponse>(url)
        return response.data ?? undefined;
    }
    catch (error) {
        const problemDetail = HandleError(error, navigation);
        throw problemDetail;
    }
}


function HandleError(error: unknown, navigation: NavigationProp<ParamListBase>) : ProblemDetail{

    const _problemDetail = new ProblemDetail();
    if (axios.isAxiosError(error) && error.response) {
         if (error.response.status == 401 || error.response.status == 403) {
            GoToLogin(navigation);
            _problemDetail.type = ErrorTypes.Authentication;
            _problemDetail.status = error.response.status;
            _problemDetail.detail = "Yetkiniz Bulunmamaktadır"; //You do not have authorization
        }
        else if(error.response.data != null){ 
            const errorResponse = error.response.data as ProblemDetail;
            if (errorResponse.type == ErrorTypes.Business){
                _problemDetail.type = ErrorTypes.Business;
                _problemDetail.detail = errorResponse.detail?? _problemDetail.detail;
            }
            else if (errorResponse.type == ErrorTypes.Validation){
                _problemDetail.type = ErrorTypes.Validation;
                _problemDetail.detail = "Alanları eksiksiz doldurduğunuzdan emin olun"; //Check the fields, you have made an invalid action.
            }
            else if (errorResponse.type == ErrorTypes.DataAccess){
                _problemDetail.type = ErrorTypes.DataAccess;
                // To Do: Her Hata için log atılsa iyi olur
            }
        }
    }
    return _problemDetail;
}
