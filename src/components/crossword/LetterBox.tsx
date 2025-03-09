import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import { wordInteractionModel } from './LetterContent';

type SectionProps = {
  wordModel: wordInteractionModel, 
  HandleSelectLetter:(wordModel: wordInteractionModel) => void 
}

function LetterBox(props: SectionProps) {

  return (
    <TouchableOpacity
      onPress={() => {
        props.HandleSelectLetter(props.wordModel);
      }}
      disabled={props.wordModel.disabled}
      style={
        props.wordModel.isCorrect ? styles.selectedCorrectLetter :
        props.wordModel.isWrong ? styles.selectedWrongLetter :
        props.wordModel.disabled ? styles.selectedLetter :
        styles.nonSelectedLetter
      }
    >
      <Text
        style={
            props.wordModel.isCorrect ? styles.selectedCorrectText :
            props.wordModel.isWrong ? styles.selectedWrongText :
            props.wordModel.disabled ? styles.selectedText :
            styles.nonSelectedText
        }>
        {props.wordModel.letter}
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
