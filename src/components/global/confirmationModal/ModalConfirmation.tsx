import React from 'react'
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import Icon from '../../../assets/svg'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { closeConfirmationModal } from '../../../redux/reducers/ConfirmationSlice';
import { showAlertError, showAlertSuccess } from '../../../redux/reducers/AlertSlice';

export function ModalConfirmation() {
  const dispatch = useAppDispatch();

  var _showStatus = useAppSelector((state) => state.confirmationReducer.showStatus);
  var _message = useAppSelector((state) => state.confirmationReducer.message);
  var _callback = useAppSelector((state) => state.confirmationReducer.callback);
  var _callbackAsync = useAppSelector((state) => state.confirmationReducer.callbackAsync);
  var _textConfirmation = useAppSelector((state) => state.confirmationReducer.textButton_confirmation);
  var _textCancel = useAppSelector((state) => state.confirmationReducer.textButton_cancel);
  var _colorBtnConfirmation = useAppSelector((state) => state.confirmationReducer.colorButton_confirmation);

  const methodAccept = async (): Promise<void> =>{
    try {
      if(_callback != undefined){
        _callback();
      }
      if(_callbackAsync != undefined){
        await _callbackAsync();
      }
      dispatch(showAlertSuccess({message:"İşlem Başarıyla Gerçekleşti."}));
    } 
    catch (error) {
     dispatch(showAlertError({message:"İşlem Sırasında Bir Sorun Oluştu."}));
    }
    finally{
      dispatch(closeConfirmationModal());
    }
  }
  
  const methodCancel = (): void =>{
    dispatch(closeConfirmationModal());
  }
  
  return (
    <Modal animationType="fade" transparent={true} visible={_showStatus}>
      <View style={styles.modalView}>
        <Icon name={'circle-question'} c={'#ffab40'} w={36} h={36} />
        <Text style={styles.modalText}>{_message}</Text>
        <View style={styles.buttonGroup}>
          <Pressable style={styles.cancelButton} onPress={methodCancel}>
            <Text style={styles.cancelButtonText}>
              {_textCancel}
            </Text>
          </Pressable>
          <Pressable style={[styles.acceptButton, {backgroundColor: _colorBtnConfirmation?? "#e93e3e" }]} onPress={methodAccept}>
            <Text style={styles.acceptButtonText}>
              {_textConfirmation}
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}



const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
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
  modalText: {
    marginTop: 15,
    textAlign: 'center',
    color: '#183153',
  },
  buttonGroup:{
    flexDirection:"row",
    justifyContent:"center",
    gap:12,
    marginVertical:20,
  },
  acceptButton:{
    borderRadius:8,
    paddingVertical:10,
    paddingHorizontal:20
  },
  acceptButtonText:{
    color:"#fff"
  },
  cancelButton:{
    backgroundColor:"#ccc",
    borderRadius:8,
    paddingVertical:10,
    paddingHorizontal:12
  },
  cancelButtonText:{
    color:"#505050"
  }
})