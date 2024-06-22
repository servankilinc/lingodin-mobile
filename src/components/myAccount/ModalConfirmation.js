import React from 'react'
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import Icon from '../../assets/svg'

export function ModalConfirmation({visible, content, methodAccept, methodCancel}) {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.modalView}>
        <Icon name={'circle-question'} c={'#ffab40'} w={36} h={36} />
        <Text style={styles.modalText}>{content}</Text>
        <View style={styles.buttonGroup}>
          <Pressable style={styles.acceptButton} onPress={methodAccept}>
            <Text style={styles.acceptButtonText}>
              Sil
            </Text>
          </Pressable>
          <Pressable style={styles.cancelButton} onPress={methodCancel}>
            <Text style={styles.cancelButtonText}>
              İptal
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
    backgroundColor:"#e93e3e",
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