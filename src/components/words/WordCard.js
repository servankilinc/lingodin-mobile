import React,{ useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import Animated, { withSpring, useAnimatedStyle } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { GetUserInfo } from '../../utils/LocalStorage.js';
import { PostRequest } from '../../utils/GlobalApiCall.js';
import ModalSuccess from '../global/ModalSuccess.js';
import Icon from '../../assets/svg/index.js';

const SIZE = Dimensions.get('screen').width * 5 / 5;

export default function WordCard({data, rotateY, isTurned}) {  
  
  const navigation = useNavigation();

  const [activeWordFavStatus, setActiveWordFavStatus] = useState(false);

  useEffect(() => setActiveWordFavStatus(data.isUeserAddedFav), [data]);

  const HandleSavingFavorite = () => {
    GetUserInfo(navigation)
      .then(storedUserInfo => {
        let jsonData = { userId: storedUserInfo.user.id, wordId: data.word.id };
        if (activeWordFavStatus) {
          PostRequest('/api/Favorite/RemoveWordFromFavorites', jsonData, navigation).then(response => {
            setActiveWordFavStatus(false);
            ShowSuccessModal('Favorilerden Kaldırıldı!');
          });
        }
        else {
          PostRequest('/api/Favorite/AddWordAsFavorite', jsonData, navigation).then(response => {
            setActiveWordFavStatus(true);
            ShowSuccessModal('Favorilere Eklendi!');
          });
        }
      }) 
  };

  const animatedRotate = useAnimatedStyle(() => ({
    transform: [{rotateY: rotateY.value + 'deg'}], 
  }));


  // --------------- Success Modal ---------------
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [successModalContent, setSuccessModalContent] = useState('');
  
  const ShowSuccessModal = message => {
    setSuccessModalContent(message);
    setSuccessModalVisible(true);
    setTimeout(() => setSuccessModalVisible(false), 2000);
  };
  // --------------- Success Modal ---------------

  return (
    <Animated.View style={[animatedRotate, styles.card]}>
      <View style={styles.bodyImage}>
        <TouchableOpacity onPressOut={HandleSavingFavorite} style={styles.buttonBodyFav}>
          <Icon name="heart" w={34} h={34} c={activeWordFavStatus ? '#e93737' : 'orange'} />
        </TouchableOpacity>
        <Image
          style={styles.image}
          source={data.word.hasImage ? {uri: data.word.image} : require('../../assets/placeholder.png')}
        />
        <View style={styles.info}>
          <Text style={styles.infoText}>
            {isTurned ? data.word.turkish : data.word.english}
          </Text>
        </View>
      </View>
      <ModalSuccess content={successModalContent} visible={successModalVisible}/>
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
