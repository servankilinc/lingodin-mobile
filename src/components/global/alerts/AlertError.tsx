import { useEffect } from "react";
import { CircleAlert } from "lucide-react-native";
import { Modal, StyleSheet, Text, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { closeAlertError } from "../../../redux/reducers/AlertSlice";

export default function AlertError(): React.JSX.Element {

    const dispatch = useAppDispatch();

    var _showStatus = useAppSelector((state) => state.alertReducer.errorModal.showStatus);
    var _timeOut = useAppSelector((state) => state.alertReducer.errorModal.timeOut);
    var _message = useAppSelector((state) => state.alertReducer.errorModal.message);
    var _callback  = useAppSelector((state) => state.alertReducer.errorModal.callback)
    
    useEffect(() => {
        if (_showStatus) {
            setTimeout(() => {
                dispatch(closeAlertError());
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
                <Text style={styles.modalErrorText}>{_message}</Text>
                {/* <Icon name={'alert-circle'} c={'#c93838'} w={36} h={36} /> */}
                <CircleAlert size={38} color="#dc2626" />
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
    modalErrorText: {
        marginBottom: 15,
        textAlign: 'center',
        color: '#c93838',
    },
})