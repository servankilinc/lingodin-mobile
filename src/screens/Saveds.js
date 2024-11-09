import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView, View, Text, TouchableOpacity} from 'react-native';
import {GetUserInfo} from '../utils/LocalStorage';
import {GetRequest, PostRequest} from '../utils/GlobalApiCall';
import Icon from '../assets/svg';
import Header from '../components/global/Header';
import ModalError from '../components/global/ModalError';

export default function Saveds({navigation, route}) {

  const [data, setData] = useState([]);


  useEffect(() => {
    GetUserInfo(navigation).then(storedUserInfo => {
      GetRequest(`/api/Favorite/GetFavoriteWordsForUserByCategoryAsync?categoryId=${route.params.categoryId}&userId=${storedUserInfo.user.id}`, navigation)
        .then(response => {
          setData(response);
        });
    })
  }, []);

  const DeleteWordFormFavorites = async wordId => {
    GetUserInfo(navigation).then(storedUserInfo => {
      PostRequest('/api/Favorite/RemoveWordFromFavorites', { userId: storedUserInfo.user.id, wordId: wordId }, navigation)
        .then(() => {
          setData(prev => prev.filter(w => w.id !== wordId));
        })
        .catch(() => { ShowErrorModal('Kelime Kaldırılamadı!'); });
      });
  };

  // --------------- Error Modal ---------------
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');
  
  const ShowErrorModal = message => {
    setModalContent(message);
    setModalVisible(true);
    setTimeout(() => setModalVisible(false), 2000);
  };
  // --------------- Error Modal ---------------

  return (
    <ScrollView style={styles.container}>

      <Header title={route.params.categoryTitle} />

      <View style={styles.body}>
        {data.map((word, key) => {
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

      <ModalError content={modalContent} visible={modalVisible} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
  },
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
