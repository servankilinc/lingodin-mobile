import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity, TextInput} from 'react-native';
import Icon from '../../assets/svg/index';
import LetterBox from './LetterBox';

export type wordInteractionModel = {
  index: number;
  letter: string;
  disabled: boolean;
  isCorrect: boolean;
  isWrong: boolean;
}

type SectionProps = {
  wordText: string, 
  CompletedWord: (isWordLearned: boolean) =>  void
}

export default function LetterContent(props: SectionProps) {

  const [text, setTextInput] = useState('');
  const [letterList, setLetterList] = useState<wordInteractionModel[]>([]);
  const [selectedLetterList, setSelectedLetterList] = useState<wordInteractionModel[]>([]);

  const [isWordCorrect, setIsWordCorrect] = useState(false);
  const [wasWordWrongBefore, setWasWordWrongBefore] = useState(false); 
  
  const [cardBtnDisabled, setCardBtnDisabled] = useState(true);
  const [showAlertToInput, setShowAlertToInput] = useState(false);


  useEffect(() => {
    PreparePageToNewWord();
  }, [props.wordText]);
  
  useEffect(() => {
    LetterSelecetionHandler();
  }, [selectedLetterList]);
   


  const PreparePageToNewWord = () => {
    setTextInput('');
    setSelectedLetterList([]); 
    setWasWordWrongBefore(false);

    if (props.wordText != null) {
      let letters = props.wordText.split('');
      letters = letters.sort(() => 0.5 - Math.random());
      let objLetters = letters.map((letter, index) => {
        var _obj: wordInteractionModel = {
          index: index,
          letter: letter,
          disabled: false,
          isCorrect: false,
          isWrong: false,
        };
        return _obj;
      });
      setLetterList(objLetters);
    }
  }    


  const LetterSelecetionHandler = () => {
    if (selectedLetterList.length > 0 && letterList.length === selectedLetterList.length){ // word entered correctly
      setIsWordCorrect((props.wordText.toUpperCase() === text.toUpperCase()));
      setCardBtnDisabled(false);
    }
    else {
      setIsWordCorrect(false);
      setCardBtnDisabled(true);
    }
  }
  


  // --------------- Letter Selection Processes --------------- 
  const HandleSelectLetter = (wordModel: wordInteractionModel) => {
    wordModel.disabled = true;

    setSelectedLetterList(prev => [...prev, wordModel]);

    setTextInput(prev => prev + wordModel.letter.toUpperCase());
  };
  
  const HandleDeleteLetter = () => {
    if (selectedLetterList.length > 0) {
      setSelectedLetterList(prev => prev.slice(0, -1));
      
      var deletedLetterIndex = selectedLetterList[selectedLetterList.length - 1].index;
      var selected = letterList.find(l => l.index === deletedLetterIndex);
      if(selected != null) {
        selected.disabled = false
      }
      setLetterList(letterList);

      setTextInput(prev => prev.slice(0, -1));
    }
  };
  // --------------- Letter Selection Processes --------------- 


  // --------------- Show Hint --------------- 
  const HandleHintShowing = () => {
    ShowHint(); 
    setTimeout(()=> HideHint(), 3000); 
  }
  
  const ShowHint = () => { 
    selectedLetterList.map((letter, index)=>{
      const updatedList = [...letterList];
      const target = updatedList.find(value => value.index === letter.index);
      if (target == null) { return }
      if (letter.letter.toUpperCase() === props.wordText[index].toUpperCase()) {
        target.isCorrect = true;
        target.isWrong = false;
      }
      else {
        target.isCorrect = false;
        target.isWrong = true;
      }
      setLetterList(updatedList);
    }); 
  }
  
  const HideHint  = () => {
    setLetterList(prevList => {
      return prevList.map(item => {
        return {
          ...item,
          isCorrect: false,
          isWrong: false,
        };
      });
    });
  }
  // --------------- Show Hint --------------- 



  // --------------- Check Word By Confir Button --------------- 
  const CheckWordToNext = () => {
    if (isWordCorrect == true) {
      props.CompletedWord(wasWordWrongBefore == false);
    }
    else {
      setWasWordWrongBefore(true);
      // current word does not correct
      setShowAlertToInput(true);
      setTimeout(() => setShowAlertToInput(false), 1500);
    }
  };
  // --------------- Check Word By Confir Button --------------- 

  
  return (
    <>
      <View style={styles.letteListBody}>
        <View style={styles.bodyInput}>
          <TextInput
            editable={false}
            style={ showAlertToInput ? styles.inputByAlert : styles.input}
            value={text}
          />
          <TouchableOpacity style={styles.buttonRemove} onPress={HandleDeleteLetter}>
            <Icon name="delete-left" w={28} h={28} c={'#cb3434'} />
          </TouchableOpacity>
        </View>
        {letterList &&
          letterList.map((object, key) => {
            return (
              <LetterBox key={key} wordModel={object} HandleSelectLetter={HandleSelectLetter}/>
            );
          })
        }
      </View>

      <View style={styles.bodyButtons}>
        <TouchableOpacity style={styles.buttonInfo} onPress={HandleHintShowing}>
          <Icon name="lightbulb" w={48} h={48} c={'#fff'} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={CheckWordToNext}
          disabled={cardBtnDisabled}
          style={ cardBtnDisabled ? styles.buttonNextDisabled : styles.buttonNext }
        >
          <Icon name="circle-check" w={48} h={48} c={'#fff'} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  letteListBody: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    gap: 8,
    marginVertical: 12,
    width: '70%',
  }, 
  bodyInput: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginHorizontal: 12,
  },
  input: {
    width: '90%',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderColor: '#dfdfdf',
    color: "#bbb",
    padding: 12,
    shadowColor: '#72727220',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  inputByAlert: {
    width: '80%',
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: '#ff00001a',
    borderColor: '#dd5050',
    color: "#bbb",
    padding: 12,
    shadowColor: '#72727220',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonRemove: {
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderColor: '#dfdfdf',
    padding: 12,
    shadowColor: '#72727220',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  bodyButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 36,
    marginVertical: 40,
    shadowColor: '#727272',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonNext: {
    borderWidth: 3,
    borderColor: '#0ab15ca6',
    borderRadius: 50,
    padding: 15,
    backgroundColor: '#0ab15c',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#727272',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonNextDisabled: {
    borderWidth: 3,
    borderColor: '#0ab15c4f',
    borderRadius: 50,
    padding: 15,
    backgroundColor: '#8cd1ac',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#727272',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonInfo: {
    borderWidth: 3,
    borderColor: '#ffab40a6',
    borderRadius: 50,
    padding: 15,
    backgroundColor: '#ffab40',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#727272',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
