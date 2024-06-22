import axios from "axios";
import {GetUserInfo} from "./LocalStorage"
import Config from "../../config";

const GoToLogin = (navigation) => {
    navigation?.reset({
        index: 0,
        routes: [{ name: 'Login' }],
    });
} 

export async function GetRequest(url, navigation) {
    
    let storedUserInfo;
    try {
        storedUserInfo = await GetUserInfo(navigation);       
    }
    catch (error) { 
        GoToLogin(navigation);
        throw error;
    }

    try {
        let response = await axios.get(Config.BaseUrl + url, { headers: { Authorization: `Bearer ${storedUserInfo.accessToken.token}` }});
        return response.data;
    } 
    catch (error) {
        if (error && error.response && (error.response.status == 401 || error.response.status == 403)) {
            GoToLogin(navigation);
        }
        throw error;
    }
}

export async function PostRequest(url, data, navigation) {

    let storedUserInfo;
    try {
        storedUserInfo = await GetUserInfo(navigation);       
    }
    catch (error) { 
        GoToLogin(navigation);
        throw error;
    }

    try {
        let response = await axios.post(Config.BaseUrl + url, data, { headers: { Authorization: `Bearer ${storedUserInfo.accessToken.token}` }});
        return response.data;
    } 
    catch (error) { 
        if (error && error.response && (error.response.status == 401 || error.response.status == 403)) {
            GoToLogin(navigation);
        }
        throw error;
    }
}

export async function DeleteRequest(url, navigation) {

    let storedUserInfo;
    try {
        storedUserInfo = await GetUserInfo(navigation);       
    }
    catch (error) { 
        GoToLogin(navigation);
        throw error;
    }

    try { 
        let response = await axios.delete(Config.BaseUrl + url, { headers: { Authorization: `Bearer ${storedUserInfo.accessToken.token}` }});
        return response.data;
    } 
    catch (error) { 
        if (error && error.response && (error.response.status == 401 || error.response.status == 403)) {
            GoToLogin(navigation);
        }
        throw error;
    }
}