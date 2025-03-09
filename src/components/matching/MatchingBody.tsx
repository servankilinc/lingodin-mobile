import React from 'react';
import { StyleSheet, View } from 'react-native';
import CorrectCard from './CorrectCard';
import WrongCard from './WrongCard';
import { ExtendedWordResponseDto } from '../../screens/Matching';

type SectionProps = {
  wordList: ExtendedWordResponseDto[],
  PressedCorrect: () => void,
  PressedWrong: () => void
}

export default function MatchingBody(props: SectionProps) {
 
  return (
    <View style={styles.bodyCards}>
      { props.wordList != null && props.wordList.length > 0 &&
        props.wordList.map((item, index) => {
          if (item.isCorrect != null && item.isCorrect === true) {
            return (<CorrectCard key={index} word={item} PressedCorrect={props.PressedCorrect}/>);
          }
          else {
            return (<WrongCard key={index} word={item} PressedWrong={props.PressedWrong}/>);
          }
        })
      }
    </View>
  );
}


const styles = StyleSheet.create({
  bodyCards:{
    alignSelf:'center',
    flexDirection:'row',
    justifyContent:'space-around',
    flexWrap:'wrap',
    rowGap:35,
  },
});
