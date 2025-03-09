import React,{ useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import Animated, { useAnimatedStyle, SharedValue } from 'react-native-reanimated';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { GetUserInfo } from '../../utils/LocalStorage';
import { PostRequest } from '../../utils/GlobalApiCall';
import Icon from '../../assets/svg/index';
import WordByUserModel from '../../models/word/WordByUserModel';
import Config from '../../../config';
import { RootStackParamList } from '../../../App';
import FavoriteWordRequestDto from '../../models/word/FavoriteWordRequestDto';
import { useAppDispatch } from '../../redux/hooks';
import { showAlertError, showAlertSuccess } from '../../redux/reducers/AlertSlice';
import ProblemDetail, { ErrorTypes } from '../../utils/ProblemDetail';

type SectionProps = {
  model: WordByUserModel, 
  rotateY: SharedValue<number>, 
  isTurned: boolean
}

const SIZE = Dimensions.get('screen').width * 5 / 5;

export default function WordCard(props: SectionProps): React.JSX.Element {  
  
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [activeWordFavStatus, setActiveWordFavStatus] = useState(false);

  useEffect(() => {
    setActiveWordFavStatus(props.model.isWordAddedFav)
  }, [props.model]);

  const HandleSavingFavorite = async () => {
    try {
      var user = await GetUserInfo(navigation);
      let jsonData: FavoriteWordRequestDto = {
        userId: user.id,
        wordId: props.model.word.id
      };
      if (activeWordFavStatus) {
        await PostRequest<FavoriteWordRequestDto>('/api/Favorite/RemoveWordFromFavorites', jsonData, navigation);
        dispatch(showAlertSuccess({message: 'Kaydedilenlerden Kaldırıldı'}));
        setActiveWordFavStatus(false);
      }
      else{
        await PostRequest<FavoriteWordRequestDto>('/api/Favorite/AddWordAsFavorite', jsonData, navigation);
        dispatch(showAlertSuccess({message: 'Kaydedilenlere Eklendi'}));
        setActiveWordFavStatus(true);
      }
    }
    catch (error) {
      dispatch(showAlertError({message: error instanceof ProblemDetail && error.type == ErrorTypes.Business ? error.detail : undefined}))
    }
  };

  const animatedRotate = useAnimatedStyle(() => ({
    transform: [{rotateY: props.rotateY.value + 'deg'}], 
  }));
  
  return (
    <Animated.View style={[animatedRotate, styles.card]}>
      <View style={styles.bodyImage}>
        <TouchableOpacity onPressOut={HandleSavingFavorite} style={styles.buttonBodyFav}>
          <Icon name="heart" w={34} h={34} c={activeWordFavStatus ? '#e93737' : 'orange'} />
        </TouchableOpacity>
        <Image
          style={styles.image}
          source={props.model.word.hasImage ? {uri: Config.BaseUrl+props.model.word.image} : require('../../assets/placeholder.png')}
        />
        <View style={styles.info}>
          <Text style={styles.infoText}>
            {props.isTurned ? props.model.word.turkish : props.model.word.english}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    zIndex: 5,
    width: SIZE,
    height: SIZE,
    paddingHorizontal:SIZE / 10,
    alignItems: 'center',
  },
  bodyImage: {
    width: '100%',
    height: '100%',
    position:'relative',
    borderRadius: 26,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth:1,
    shadowColor: '#727272',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonBodyFav: {
    position:'absolute',
    alignSelf:'flex-end',
    top:'3%',
    right:'4%',
    zIndex:2,
    padding: 8,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#cecece80',
    backgroundColor: '#f5f5f5dd',
  },
  image: {
    flex:1,
    borderRadius: 26,
  },
  info: {
    width: '80%',
    position:'absolute',
    bottom:'-5%',
    margin:0,
    left:'10%',
    padding: 12,
    borderRadius: 26,
    borderWidth:2,
    borderColor:'#004398',
    backgroundColor: '#004cad',
  },
  infoText: {
    fontSize: 18,
    alignSelf: 'center',
    color: '#fff',
  },
});
