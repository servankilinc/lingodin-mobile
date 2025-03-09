import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import {GetRequest, PostRequest} from '../utils/GlobalApiCall';
import GraphicResult from '../components/matching/GraphicResult';
import ProgressPage from '../components/global/ProgressBar';
import MatchingBody from '../components/matching/MatchingBody';
import { GetUserInfo } from '../utils/LocalStorage';
import { RouteList } from '../utils/RouteList';
import { RootStackParamList } from '../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import WordResponseDto from '../models/word/WordResponseDto';
import LearningWordRequestDto from '../models/word/LearningWordRequestDto';
import { showAlertError } from '../redux/reducers/AlertSlice';
import ProblemDetail, { ErrorTypes } from '../utils/ProblemDetail';
import { useAppDispatch } from '../redux/hooks';
import AppTemplate from '../templates/AppTemplate';

export class ExtendedWordResponseDto extends WordResponseDto{
  isCorrect?: boolean
}

type SectionProps = NativeStackScreenProps<RootStackParamList, RouteList.matching>;

export default function Matching({navigation, route}: SectionProps) {

  const dispatch = useAppDispatch();

  const [data, setData] = useState<ExtendedWordResponseDto[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [randomWords, setRandomWords] = useState<ExtendedWordResponseDto[]>([]);

  const [wasWordSendedAsForgotenBefore, setWasWordSendedAsForgotenBefore] = useState(false);

  const [showResults, setShowResults] = useState(false);
  const [learnedWordCount, setLearnedWordCount] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => { 
    var response = await GetRequest<ExtendedWordResponseDto[]>(`/api/Word/GetWordsByCategory?categoryId=${route.params.categoryId}`, navigation)
    setData(response);
  }

  useEffect(() => {
    if (data.length > 3 && currentWordIndex < data.length) {
      PreparePageToNewWords();
    }
  }, [data, currentWordIndex]);
  
  
  const PreparePageToNewWords = () => {
    setWasWordSendedAsForgotenBefore(false);
    GenerateRandomWords();
  };

  const GenerateRandomWords = () =>{
    let indexes = [currentWordIndex];
    while (indexes.length < 4) {
      let randomIndex = Math.floor(Math.random() * data.length);
      if (!indexes.includes(randomIndex)) {
        indexes.push(randomIndex);
      }
    }
    let extendedCorrectObject = data[currentWordIndex];
    extendedCorrectObject.isCorrect = true;
    indexes.map(i => {
        if(i != currentWordIndex){
          data[i].isCorrect = false;
        }
      }
    );
    let selectedItems = indexes.map(i => i == currentWordIndex ? extendedCorrectObject : data[i]);
    selectedItems.sort(() => Math.random() - 0.5); 
    setRandomWords(selectedItems);
  }
 
  const PressedCorrect = () => {
    SendInteraction(true);
     
    if (currentWordIndex + 1 < data.length) {
      // current word does correct and not last so next
      setCurrentWordIndex(prev => prev + 1);
    }
    else{
      // words finished
      setShowResults(true);
    } 
  };

  const PressedWrong = () => {
    SendInteraction(false);
    setWasWordSendedAsForgotenBefore(true);
  };

  const SendInteraction = async (isWordLearned: boolean) => {
    if (wasWordSendedAsForgotenBefore) { 
      return;
    }
    try {
        let user = await GetUserInfo(navigation);
        let requestLearning: LearningWordRequestDto = { 
          userId: user.id, 
          wordId: data[currentWordIndex].id
        };

        if (isWordLearned) {
          setLearnedWordCount(prev => prev + 1);
          PostRequest<LearningWordRequestDto>('/api/Learning/AddWordAsLearned', requestLearning, navigation);
        }
        else {
          PostRequest<LearningWordRequestDto>('/api/Learning/RemoveWordFromLearned', requestLearning, navigation);
        }
    }
    catch (error) {
      dispatch(showAlertError({message: error instanceof ProblemDetail && error.type == ErrorTypes.Business ? error.detail : undefined}))
    }
  };


  return (
    <AppTemplate title={route.params.categoryTitle} returnbackEnable={true} returnHomeEnable={true}>
      <View style={styles.container}>
      {
        !showResults && data.length > 3 && randomWords.length > 0 ? 
        (
          <View style={styles.body}>
            <ProgressPage percent={(currentWordIndex / (data.length - 1)) * 100} />
            <View style={styles.collapse}>
              <View style={styles.wordBody}>
                <Text style={styles.wordText}>{data[currentWordIndex].english}</Text>
              </View>
              <MatchingBody wordList={randomWords} PressedCorrect={PressedCorrect} PressedWrong={PressedWrong} />
            </View>
          </View>
        ) : 
        (
          <View style={[styles.bodyResult]}>
            <View style={styles.cardResult}>
              <Text style={styles.titleBodyResult}>İlerleme Oranı</Text>
              <GraphicResult total={data.length} learned={learnedWordCount} />
            </View>
          </View>
        )
      }
      </View>
    </AppTemplate>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height 
  },
  body: {
    flex: 1,
    alignItems: 'center',
  },
  collapse:{
    position:'relative',
    flex:1,
    width:'100%',
    flexDirection:'row',
    justifyContent:'center',
    marginTop: 60,
    borderWidth:2,
    borderTopWidth:10,
    borderTopLeftRadius:40,
    borderTopRightRadius:40,
    borderColor:'#427D9D50',
    backgroundColor:'#427D9D20',
  },
  wordBody: {
    position:'absolute',
    backgroundColor: '#004cad',
    paddingVertical: 22,
    paddingHorizontal: 36,
    borderRadius: 50,
    top:-42,
  },
  wordText: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
  },
  bodyResult:{
    flex: 1,
    justifyContent:'center',
    alignItems: 'center',
  },
  cardResult: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#eee',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#727272',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  titleBodyResult: {
    fontWeight: 'bold',
    color: '#3f5e87',
    fontSize: 32,
    marginBottom: 28,
  },
});
