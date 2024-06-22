import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

function LetterBox({objectLetter, HandleSelectLetter}) {

  return (
    <TouchableOpacity
      onPress={() => {
        HandleSelectLetter(objectLetter);
      }}
      disabled={objectLetter.disabled}
      style={
        objectLetter.isCorrect ? styles.selectedCorrectLetter :
        objectLetter.isWrong ? styles.selectedWrongLetter :
        objectLetter.disabled ? styles.selectedLetter :
        styles.nonSelectedLetter
      }
    >
      <Text
        style={
            objectLetter.isCorrect ? styles.selectedCorrectText :
            objectLetter.isWrong ? styles.selectedWrongText :
            objectLetter.disabled ? styles.selectedText :
            styles.nonSelectedText
        }>
        {objectLetter.letter}
      </Text>
    </TouchableOpacity>
  );
}
export default LetterBox;

const styles = StyleSheet.create({
    selectedLetter: {
        backgroundColor: '#ffffff40',
        padding: 12,
        borderWidth: 1,
        borderRadius: 6,
        borderColor: '#dfdfdf',
      },
      nonSelectedLetter: {
        backgroundColor: '#fff',
        padding: 12,
        borderWidth: 1,
        borderRadius: 6,
        borderColor: '#dfdfdf',
        shadowColor: '#72727270',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      selectedCorrectLetter:{
        backgroundColor: '#49cc9070',
        padding: 12,
        borderWidth: 1,
        borderRadius: 6,
        borderColor: '#49cc90ff',
      },
      selectedWrongLetter:{
        backgroundColor: '#cb343470',
        padding: 12,
        borderWidth: 1,
        borderRadius: 6,
        borderColor: '#cb3434aa',
      },
      selectedText:{
        textTransform: 'uppercase',
        color: '#b3b3b3',
      },
      nonSelectedText:{
        textTransform: 'uppercase',
        color: '#606060',
      },
      selectedCorrectText:{
        textTransform: 'uppercase',
        color:'#fff',
      },
      selectedWrongText:{
        textTransform: 'uppercase',
        color: '#fff',
      },
});
