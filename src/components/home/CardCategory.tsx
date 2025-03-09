import React from 'react';
import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import GraphicCategory from './GraphicCategory';
import Config from '../../../config.js';
import { RouteList } from '../../utils/RouteList';
import { RootStackParamList } from '../../../App';

type SectionProps = {
  categoryId: string,
  title: string,
  total: number,
  learnedCount: number,
  hasImage: boolean,
  srcImage: string | undefined,
}

export default function CardCategory(props: SectionProps): React.JSX.Element {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const routingPage = () => navigation.navigate(RouteList.steps, {categoryId: props.categoryId, categoryTitle: props.title});

  return (
    <Pressable style={styles.container} onPress={routingPage}>
      <View style={styles.firstColumn}>
        <Image 
          style={styles.tinyLogo}
          source={ props.srcImage != undefined && props.hasImage ? { uri: Config.BaseUrl+ props.srcImage } : require('../../assets/placeholder.png')} 
        />
        <Text style={styles.title}>{props.title}</Text>
      </View>
      <GraphicCategory total={props.total} processedCount={props.learnedCount} />
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
