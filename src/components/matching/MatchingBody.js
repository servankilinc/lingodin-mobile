
import React from 'react';
import { StyleSheet, View } from 'react-native';
import CorrectCard from './CorrectCard.js';
import WrongCard from './WrongCard.js';

export default function MatchingBody({wordList, PressedCorrect, PressedWrong}) {
 
  return (
    <View style={styles.bodyCards}>
      { wordList != null && wordList.length > 0 &&
        wordList.map((item, index) => {
          if (item.isCorrect != null && item.isCorrect === true) {
            return (<CorrectCard key={index} word={item} PressedCorrect={PressedCorrect}/>);
          }
          else {
            return (<WrongCard key={index} word={item} PressedWrong={PressedWrong}/>);
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
