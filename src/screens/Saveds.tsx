import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {GetUserInfo} from '../utils/LocalStorage';
import {GetRequest, PostRequest} from '../utils/GlobalApiCall';
import Icon from '../assets/svg';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { RouteList } from '../utils/RouteList';
import WordResponseDto from '../models/word/WordResponseDto';
import FavoriteWordRequestDto from '../models/word/FavoriteWordRequestDto';
import { useAppDispatch } from '../redux/hooks';
import { showAlertError } from '../redux/reducers/AlertSlice';
import ProblemDetail, { ErrorTypes } from '../utils/ProblemDetail';
import AppTemplate from '../templates/AppTemplate';

type SectionProps = NativeStackScreenProps<RootStackParamList, RouteList.saveds>;

export default function Saveds({navigation, route }: SectionProps) {

  const dispatch = useAppDispatch();

  const [data, setData] = useState<WordResponseDto[]>([]);
  
  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () =>{
    try {
      var user = await GetUserInfo(navigation);
      var response = await GetRequest<WordResponseDto[]>(`/api/Favorite/GetFavoriteWordsForUserByCategoryAsync?categoryId=${route.params.categoryId}&userId=${user.id}`, navigation);
      setData(response);    
    }
    catch (error) {
      dispatch(showAlertError({message: error instanceof ProblemDetail && error.type == ErrorTypes.Business ? error.detail : undefined}))
    }
  }

  const DeleteWordFormFavorites = async (wordId: string) => {
    try {
      var user = await GetUserInfo(navigation);
      var data = { 
        userId: user.id, 
        wordId: wordId
      };
      await PostRequest<FavoriteWordRequestDto>('/api/Favorite/RemoveWordFromFavorites', data, navigation); 
      setData(prev => prev.filter(w => w.id !== wordId));
    }
    catch (error) {
      dispatch(showAlertError({message: error instanceof ProblemDetail && error.type == ErrorTypes.Business ? error.detail : undefined}))
    }
  };

  return (
    <AppTemplate title={route.params.categoryTitle} returnHomeEnable={true} returnbackEnable={true}>
      <View style={styles.body}>
        {data != null && data.length > 0 && data.map((word, key) => {
          return (
            <View style={styles.card} key={key}>
              <Text style={styles.infoText}>{word.english}</Text>
              <TouchableOpacity
                onPress={() => DeleteWordFormFavorites(word.id)}>
                <Icon name={'circle-xmark'} c={'#D83F31'} w={28} h={28} />
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </AppTemplate>
  );
}

const styles = StyleSheet.create({
  body: {
    padding:'3%',
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
    padding: 18,
    borderRadius: 12,
    shadowColor: '#727272',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 12,
  },
  infoText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#878787',
  },
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
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: '#c93838',
  },
});
