import React from 'react'
import { Modal, StyleSheet, Text, View } from 'react-native'
import Icon from '../../assets/svg'

export default function ModalError({visible, content}) {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
        <View style={styles.modalView}>
            <Text style={styles.modalErrorText}>{content}</Text>
            <Icon name={'alert-circle'} c={'#c93838'} w={36} h={36} />
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