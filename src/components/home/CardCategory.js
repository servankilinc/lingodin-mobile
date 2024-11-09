import React from 'react';
import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GraphicCategory from './GraphicCategory.js';

export default function CardCategory({categoryId, title, srcImage, total, learned}) {

  const navigation = useNavigation();
  const routingPage = () => navigation.navigate('Steps', {categoryId, categoryTitle: title});

  return (
    <Pressable style={styles.container} onPress={routingPage}>
      <View style={styles.firstColumn}>
        <Image style={styles.tinyLogo} source={srcImage} />
        <Text style={styles.title}>{title}</Text>
      </View>
      <GraphicCategory total={total} learned={learned} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 6,
    marginBottom: 20,
    borderRadius: 13,
    shadowColor: '#727272',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  firstColumn: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  tinyLogo: {
    alignSelf: 'center',
    borderRadius: 9,
    width: 90,
    height: 90,
  },
  title: {
    fontSize: 16,
    color: '#0A2647',
  },
});
