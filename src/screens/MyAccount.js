import React, { useEffect, useState } from 'react'
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Header from '../components/global/Header'
import { GetUserInfo } from '../utils/LocalStorage';
import { DeleteRequest, GetRequest } from '../utils/GlobalApiCall';
import ModalError from '../components/global/ModalError.js';
import ModalSuccess from '../components/global/ModalSuccess';
import { ModalConfirmation as ModalUserDeleteConfirmation } from '../components/myAccount/ModalConfirmation.js';
import Icon from '../assets/svg';

export default function MyAccount({ navigation, route }) {

    const [data, setData] = useState();

    useEffect(() => {
        GetUserInfo(navigation).then(storedUserInfo => {
            GetRequest(`/api/User/GetUserInfoById?userId=${storedUserInfo.user.id}`, navigation)
                .then(res => {
                    setData(res);
                })
        })
    }, []);


    const DeleteUser = () => {
        GetUserInfo(navigation).then(storedUserInfo => {
            DeleteRequest(`/api/User/Delete?userId=${storedUserInfo.user.id}`, navigation)
                .then(() => {
                    ShowSuccessModal("Hesabınız Başarıyla Silindi");
                    setTimeout(() => navigation.navigate("Login"), 4000);
                })
                .catch(error => {
                    let errorDetail = error?.response?.data;
                    ShowErrorModal((errorDetail != null && errorDetail.detail != null) ? errorDetail.detail : 'İşlem Sırasında Bir Sorun Oluştu!');
                })
        })
    }



    // --------------- Error Modal ---------------
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [errorModalContent, setErrorModalContent] = useState('');

    const ShowErrorModal = message => {
        setErrorModalContent(message);
        setErrorModalVisible(true);
        setTimeout(() => setErrorModalVisible(false), 3000);
    };
    // --------------- Error Modal ---------------


    // --------------- Success Modal ---------------
    const [successModalVisible, setSuccessModalVisible] = useState(false);
    const [successModalContent, setSuccessModalContent] = useState('');

    const ShowSuccessModal = message => {
        setSuccessModalContent(message);
        setSuccessModalVisible(true);
        setTimeout(() => setSuccessModalVisible(false), 3000);
    };
    // --------------- Success Modal ---------------

    // --------------- Confirmation Modal ---------------
    const [confirmationModalVisible, setConfirmationModalVisible] = useState(false); 

    const ShowUserDeleteConfirmationModal = () => { 
        setConfirmationModalVisible(true);
    };
    const HideUserDeleteConfirmationModal = () => {
        setConfirmationModalVisible(false);
    };
    // --------------- Confirmation Modal ---------------

    return (
        <View style={styles.container}>
            <Header title="Hesabım" />
            <ScrollView style={styles.bodyCollapse}>
                {data &&
                    <View style={styles.body}>
                        <View style={styles.card}>
                            <View style={styles.row}>
                                <Text style={styles.rowTitle}>
                                    Kullanıcı Adı:
                                </Text>
                                <Text style={styles.rowContent}>
                                    {data.fullName}
                                </Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.rowTitle}>
                                    Eposta Adresi:
                                </Text>
                                <Text style={styles.rowContent}>
                                    {data.email}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.buttonGroup}>
                            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.buttonLogOut}>
                                <Text style={{ fontSize: 16, fontWeight: "700", color: "#fff" }}>
                                    Çıkış Yap
                                </Text>
                                <Icon name="logout" c={'#fff'} w={18} h={18} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate("PasswordReset", {email: data.email})} style={styles.buttonResetPassword}>
                                <Text style={{ fontSize: 16, fontWeight: "700", color: "#fff" }}>
                                    Parola Yenile
                                </Text>
                                <Icon name="key" c="#fff" h={16} w={16} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={ShowUserDeleteConfirmationModal} style={styles.buttonDeleteUser}>
                                <Text style={{ fontSize: 16, fontWeight: "700", color: "#fff" }}>
                                    Hesabı Sil
                                </Text>
                                <Icon name="user-slash" c="#fff" h={18} w={18} />
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            </ScrollView>

            <ModalUserDeleteConfirmation visible={confirmationModalVisible} content="Hesabınız Silmek İstediğinize Emin misiniz?" methodAccept={DeleteUser} methodCancel={HideUserDeleteConfirmationModal} />
            <ModalSuccess visible={successModalVisible} content={successModalContent} />
            <ModalError visible={errorModalVisible} content={errorModalContent} />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    bodyCollapse: {
        backgroundColor: '#f1f1f1',
    },
    body: {
        display: 'flex',
        padding: 2,
        margin: '5%',
        backgroundColor: "#fafafa",
        borderRadius: 18,
        shadowColor: '#999',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 12,
    },
    card: {
        backgroundColor: '#fff',
        gap: 16,
        margin: 10,
        padding: 12,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#eee",
        shadowColor: '#727272',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 12,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 8
    },
    rowTitle: {
        fontWeight: "700",
        fontSize: 14,
        color: "#aaa"
    },
    rowContent: {
        fontWeight: "800",
        fontSize: 14,
        color: "#aaa"
    },
    buttonGroup: {
        gap: 20,
        margin: 10,
        marginTop: 36
    },
    buttonResetPassword:{
        flexDirection: "row",
        backgroundColor: "#146ebe",
        borderRadius: 16,
        padding: 12,
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
        shadowColor: '#727272',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 12,
    },
    buttonDeleteUser: {
        flexDirection: "row",
        backgroundColor: "#f35555",
        borderRadius: 16,
        padding: 12,
        justifyContent: "center", 
        alignItems: "center",
        gap: 12,
        shadowColor: '#727272',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 12,
    },
    buttonLogOut: {
        flexDirection: "row",
        backgroundColor: "#bbb",
        borderRadius: 16,
        padding: 12,
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
        shadowColor: '#727272',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 12,
    }
});
