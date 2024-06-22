import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {GetRequest, PostRequest} from '../utils/GlobalApiCall.js';
import {GetUserInfo} from '../utils/LocalStorage.js';
import ProgressBar from '../components/global/ProgressBar.js';
import ChartResult from '../components/crossword/GraphicResult.js'; 
import WordCardStatic from '../components/crossword/WordCardStatic.js';
import Header from '../components/global/Header.js';
import LetterContent from '../components/crossword/LetterContent.js';

export default function Crossword({navigation, route}) {

  const [data, setData] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [learnedWordCount, setLearnedWordCount] = useState(0);

  const [pageWordsFinished, setPageWordsFinished] = useState(false);

  useEffect(() => {
    GetUserInfo(navigation).then(storedUserInfo => {
      GetRequest(`/api/Word/GetWordsByCategoryForUser?categoryId=${route.params.categoryId}&userId=${storedUserInfo.user.id}`, navigation)
        .then(response => {
          setData(response);
        });
      })
  }, []);
 

  const CompletedWord = (isWordLearned) => {
    
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

  const SendInteraction = (isWordLearned) => {
    GetUserInfo(navigation).then((storedUserInfo)=>{
      let requestLearning = { userId: storedUserInfo.user.id, wordId: data[currentWordIndex].word.id };
      if (isWordLearned) {
        setLearnedWordCount(prev => prev + 1);
        PostRequest('/api/Learning/AddWordAsLearned', requestLearning, navigation);
      }
      else {  
        PostRequest('/api/Learning/RemoveWordFromLearned', requestLearning, navigation);
      } 
    })
  }; 


  return (
    <View style={styles.container}>
      <Header title={route.params.categoryTitle} />

      {data != null && data.length > 0 &&
        <>
          <ProgressBar percent={ pageWordsFinished ? 100 : (currentWordIndex / data.length) * 100 } />

          {
            !pageWordsFinished ? 
            (
              <View style={styles.body}>
                <View style={{flex:1, display:'flex', justifyContent:'center', alignItems:'center'}}>
                  <WordCardStatic data={data[currentWordIndex]} />
                </View>

                <LetterContent word={data[currentWordIndex].word.english} CompletedWord={CompletedWord}  />
    
              </View>
            ) : 
            (
              <View style={[styles.body]}>
                <View style={styles.bodyResult}>
                  <Text style={styles.titleBodyResult}>İlerleme Oranı</Text>
                  <ChartResult total={data.length} learnedWordCount={learnedWordCount} />
                </View>
              </View>
            )
          }
        </>
      }
    </View>
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
