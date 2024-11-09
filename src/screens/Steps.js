import React from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import Icon from '../assets/svg';
import Header from '../components/global/Header.js';

export default function Steps({navigation, route}) {

  const screenWidth = Dimensions.get('window').width;

  const routingSavedPage = () => navigation.navigate('Saveds', route.params);
  const routingWordsPage = () => navigation.navigate('Words', route.params);
  const routingWordMatchPage = () => navigation.navigate('Matching', route.params);
  const routingCrosswordPage = () => navigation.navigate('Crossword', route.params);

  return (
    <View style={styles.container}>

      <Header title={route.params.categoryTitle}/>

      <ScrollView style={styles.bodyCollapse}>
        <View style={styles.body}>
          <TouchableOpacity
            onPress={routingSavedPage}
            style={[styles.card, {width: screenWidth / 2 - 32, height: screenWidth / 2}]}>
            <Icon name="book" w={108} h={108} c={'#EB6440'} />
            <Text style={styles.infoText}>Kaydedilenler</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={routingWordsPage}
            style={[styles.card, {width: screenWidth / 2 - 32, height: screenWidth / 2}]}>
            <Icon name="layer-group" w={108} h={108} c={'#4C4C6D'} />
            <Text style={styles.infoText}>Kelimeler</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={routingWordMatchPage}
            style={[styles.card, {width: screenWidth / 2 - 32, height: screenWidth / 2}]}>
            <Icon name="creative-commons-share" w={108} h={108} c={'#23689B'} />
            <Text style={styles.infoText}>Eşleştir</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={routingCrosswordPage}
            style={[styles.card, {width: screenWidth / 2 - 32, height: screenWidth / 2}]}>
            <Icon name="brain" w={108} h={108} c={'#6D9886'} />
            <Text style={styles.infoText}>Bulmaca</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  bodyCollapse: {
    backgroundColor:'#f1f1f1',
  },
  body: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent:'space-around',
    padding:10,
  },
  card: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginVertical: 15,
    padding: 12,
    borderRadius: 32,
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
    width: '100%',
    textAlign: 'center',
    color: '#aaa',
    borderTopWidth: 1,
    paddingTop: 6,
    borderTopColor: '#f5f5f5',
  },
});
