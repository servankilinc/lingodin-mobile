import { useEffect } from "react";
import { CheckCircle } from "lucide-react-native";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { closeAlertSuccess } from "../../../redux/reducers/AlertSlice";
import { Modal, StyleSheet, Text, View } from "react-native";

export default function AlertSuccess(): React.JSX.Element {

    const dispatch = useAppDispatch();

    var _showStatus = useAppSelector((state) => state.alertReducer.successModal.showStatus);
    var _timeOut = useAppSelector((state) => state.alertReducer.successModal.timeOut);
    var _message = useAppSelector((state) => state.alertReducer.successModal.message);
    var _callback = useAppSelector((state) => state.alertReducer.successModal.callback);

    useEffect(() => {
        if (_showStatus) {
            setTimeout(() => {
                dispatch(closeAlertSuccess());
                if (_callback != undefined) {
                    console.log("code-1 = ")
                    _callback();
                }
            }, _timeOut);
        }
    }, [_showStatus])

    return (
        <Modal animationType="fade" transparent={true} visible={_showStatus}>
            <View style={styles.modalView}>
                <Text style={styles.modalSuccessText}>{_message}</Text>
                {/* <Icon name={'circle-check'} c={'#28a745'} w={36} h={36} /> */}
                <CheckCircle size={38} color="#26A560" />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalSuccessText: {
        marginBottom: 15,
        textAlign: 'center',
        color: '#183153',
    },
})