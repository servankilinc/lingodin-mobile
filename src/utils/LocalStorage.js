import AsyncStorage from '@react-native-async-storage/async-storage';

export async function SetUserInfo(value) {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('userInfo', jsonValue);
    }
    catch (error) {
        throw error;
    }
}

export async function GetUserInfo(navigation) {
    try {
        const stringValue = await AsyncStorage.getItem('userInfo');
        if (stringValue == null) {
            throw new Error('User not found');
        }
        const userData = JSON.parse(stringValue);
        if (userData == null)
        {
            throw new Error('User data is null');
        }
        return userData;
    }
    catch (error) {
        navigation?.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
        throw error;
    }
}

export async function ClearUserInfo() {
    try {
        await AsyncStorage.removeItem('userInfo');
        return true;
    }
    catch (error) {
        throw new Error('Failed to clear user info');
    }
}
