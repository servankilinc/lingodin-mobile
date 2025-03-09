import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {GetRequest, PostRequest} from '../utils/GlobalApiCall';
import {GetUserInfo} from '../utils/LocalStorage';
import ProgressBar from '../components/global/ProgressBar';
import GraphicResult from '../components/crossword/GraphicResult'; 
import WordCardStatic from '../components/crossword/WordCardStatic';
import LetterContent from '../components/crossword/LetterContent';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { RouteList } from '../utils/RouteList';
import WordByUserModel from '../models/word/WordByUserModel';
import LearningWordRequestDto from '../models/word/LearningWordRequestDto';
import AppTemplate from '../templates/AppTemplate';

type SectionProps = NativeStackScreenProps<RootStackParamList, RouteList.matching>;

export default function Crossword({navigation, route}: SectionProps) {

  const [data, setData] = useState<WordByUserModel[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [learnedWordCount, setLearnedWordCount] = useState(0);

  const [pageWordsFinished, setPageWordsFinished] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    var user = await GetUserInfo(navigation);
    var response = await GetRequest<WordByUserModel[]>(`/api/Word/GetWordsByCategoryForUser?categoryId=${route.params.categoryId}&userId=${user.id}`, navigation)
    setData(response);
  }
 

  const CompletedWord = (isWordLearned: boolean) => {
    
    SendInteraction(isWordLearned); 

    if (currentWordIndex + 1 < data.length) {
      // current word does correct and not last
      setCurrentWordIndex(prev => prev + 1);
    }
    else{
      // words finished
      setPageWordsFinished(true);
    }
  };

  const SendInteraction = async (isWordLearned: boolean) => {
    var user = await GetUserInfo(navigation);
    let requestLearning: LearningWordRequestDto = { userId: user.id, wordId: data[currentWordIndex].word.id };
    if (isWordLearned) {
      setLearnedWordCount(prev => prev + 1);
      PostRequest<LearningWordRequestDto>('/api/Learning/AddWordAsLearned', requestLearning, navigation);
    }
    else {
      PostRequest<LearningWordRequestDto>('/api/Learning/RemoveWordFromLearned', requestLearning, navigation);
    }
  }; 


  return (
    <AppTemplate title={route.params.categoryTitle} returnHomeEnable={true} returnbackEnable={true}>
      {/* View style={styles.container} */}
      
      {data != null && data.length > 0 &&
        <>
          <ProgressBar percent={ pageWordsFinished ? 100 : (currentWordIndex / data.length) * 100 } />
          {
            !pageWordsFinished ? 
            (
              <View style={styles.body}>
                <View style={{flex:1, display:'flex', justifyContent:'center', alignItems:'center'}}>
                  <WordCardStatic wordModel={data[currentWordIndex]} />
                </View>
                <LetterContent wordText={data[currentWordIndex].word.english} CompletedWord={CompletedWord}  />
              </View>
            ) : 
            (
              <View style={[styles.body]}>
                <View style={styles.bodyResult}>
                  <Text style={styles.titleBodyResult}>İlerleme Oranı</Text>
                  <GraphicResult total={data.length} learned={learnedWordCount} />
                </View>
              </View>
            )
          }
        </>
      }
    </AppTemplate>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  body: {
    flex: 1,
    zIndex: 1,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  bodyResult: {
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
  card: {
    position: 'absolute',
    width: '80%',
    height: '70%',
    backgroundColor: '#fff',
    alignItems: 'center',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  bodyImage: {
    width: '100%',
    height: '100%',
    padding: 20,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    backgroundColor: '#004cad10',
    borderWidth: 1,
    borderColor: '#004cad50',
  },
  image: {
    width: '100%',
    height: '100%',
    marginBottom: 20,
    borderRadius: 18,
  },
});
