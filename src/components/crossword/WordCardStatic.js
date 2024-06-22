import React, {useState} from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import Animated from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import Icon from '../../assets/svg';
import {GetUserInfo} from '../../utils/LocalStorage';
import {PostRequest} from '../../utils/GlobalApiCall';
import ModalSuccess from '../global/ModalSuccess';

export default function WordCardStatic({data}) {

  const navigation = useNavigation();
  
  const [activeWordFavStatus, setActiveWordFavStatus] = useState(false);

  const HandleSavingFavorite = () => {
    GetUserInfo(navigation).then(storedUserInfo => {
      let jsonData = {userId: storedUserInfo.user.id, wordId: data.word.id};
      if (data.isUeserAddedFav) {
        PostRequest('/api/Favorite/RemoveWordFromFavorites', jsonData, navigation).then(() => {
            data.isUeserAddedFav = false;
            setActiveWordFavStatus(false);
            ShowSuccessModal('Favorilerden Kaldırıldı!');
        });
      } else {
        PostRequest('/api/Favorite/AddWordAsFavorite', jsonData, navigation).then(() => {
            data.isUeserAddedFav = true;
            setActiveWordFavStatus(true);
            ShowSuccessModal('Favorilere Eklendi!');
        });
      }
    });
  };

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
    <Animated.View style={styles.card}>
      <View style={styles.bodyImage}>
        <TouchableOpacity
          onPressOut={HandleSavingFavorite}
          style={styles.buttonBodyFav}
        >
          <Icon name="heart" w={34} h={34} c={ data.isUeserAddedFav || activeWordFavStatus ? '#e93737' : 'orange'} />
        </TouchableOpacity>
        <Image
          style={styles.image}
          source={
            data.word.hasImage
              ? {uri: data.word.image}
              : require('../../assets/placeholder.png')
          }
        />
      </View>
      <ModalSuccess content={successModalContent} visible={successModalVisible}/>
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
