import React, {useState} from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import Animated from 'react-native-reanimated';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Icon from '../../assets/svg';
import {GetUserInfo} from '../../utils/LocalStorage';
import {PostRequest} from '../../utils/GlobalApiCall';
import WordByUserModel from '../../models/word/WordByUserModel';
import { RootStackParamList } from '../../../App';
import { useAppDispatch } from '../../redux/hooks';
import { showAlertError, showAlertSuccess } from '../../redux/reducers/AlertSlice';
import ProblemDetail, { ErrorTypes } from '../../utils/ProblemDetail';
import Config from '../../../config';

type SectionProps = {
  wordModel: WordByUserModel
}

export default function WordCardStatic(props: SectionProps) {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  
  const dispatch = useAppDispatch();
  const [activeWordFavStatus, setActiveWordFavStatus] = useState(false);

  const HandleSavingFavorite = async () => {
    try{
      var user = await GetUserInfo(navigation);
      let jsonData = {userId: user.id, wordId: props.wordModel.word.id};
      if (props.wordModel.isWordAddedFav) {
        PostRequest('/api/Favorite/RemoveWordFromFavorites', jsonData, navigation).then(() => {
            props.wordModel.isWordAddedFav = false;
            setActiveWordFavStatus(false);
            dispatch(showAlertSuccess({message: 'Kaydedilenlerden Kaldırıldı'}));
        });
      }
      else {
        PostRequest('/api/Favorite/AddWordAsFavorite', jsonData, navigation).then(() => {
            props.wordModel.isWordAddedFav = true;
            setActiveWordFavStatus(true);
            dispatch(showAlertSuccess({message: 'Kaydedilenlere Eklendi'}));
        });
      }
    }
    catch (error) {
      dispatch(showAlertError({message: error instanceof ProblemDetail && error.type == ErrorTypes.Business ? error.detail : undefined}))
    }
  };


  return (
    <Animated.View style={styles.card}>
      <View style={styles.bodyImage}>
        <TouchableOpacity
          onPressOut={HandleSavingFavorite}
          style={styles.buttonBodyFav}
        >
          <Icon name="heart" w={34} h={34} c={ props.wordModel.isWordAddedFav || activeWordFavStatus ? '#e93737' : 'orange'} />
        </TouchableOpacity>
        <Image
          style={styles.image}
          source={
            props.wordModel.word.hasImage
              ? {uri: Config.BaseUrl+props.wordModel.word.image}
              : require('../../assets/placeholder.png')
          }
        />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    zIndex: 5,
    position: 'absolute',
    width: '90%',
    height: '90%',
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 28,
    shadowColor: '#727272',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  bodyImage: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  buttonBodyFav: {
    position: 'absolute',
    alignSelf: 'flex-end',
    top: 12,
    right: 12,
    zIndex: 2,
    padding: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#cecece80',
    backgroundColor: '#f5f5f5dd',
  },
  image: {
    width: '100%',
    height: '100%',
    marginBottom: 20,
    borderRadius: 28,
  },
});
