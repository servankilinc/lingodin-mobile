import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { GetUserInfo } from '../utils/LocalStorage';
import { GetRequest } from '../utils/GlobalApiCall';
import Icon from '../assets/svg';
import CardCategory from '../components/home/CardCategory.js';

export default function Home({navigation}) {
 
  const [data, setData] = useState([]); 
 
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      GetUserInfo(navigation).then(storedUserInfo=>{ 
        GetRequest(`/api/Category/GetCategoriesForUser?userId=${storedUserInfo.user.id}`, navigation)
          .then(res=>{
            setData(res);
          })
        })
    }
  }, [isFocused]);

  return (
    <ScrollView>
      <View style={styles.header}>
        <TouchableOpacity style={styles.buttonHeader} onPress={()=> navigation.navigate('MyAccount')}>
          <Icon name="user-gear" w={36} h={36} c={'#656565'}/>
        </TouchableOpacity>
        <Text style={styles.title}>
          Kelime Grupları
        </Text>
      </View>

      <View style={styles.body}>
      {
        data != null && data.length > 0 && data.map((value,key)=>{
          return (
            <CardCategory
              key={key}
              categoryId={value.category.id}
              title={value.category.english}
              total={value.totalWordCount}
              learned={value.learnedWordCount}
              srcImage={ value.category.hasImage ? { uri: value.category.image } : require('../assets/placeholder.png') }
            />
          );
        })
      }
      </View>
    </ScrollView>
  )
}




const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 3,
    borderBottomColor: '#e5e5e5',
    justifyContent:'center',
  },
  buttonHeader: {
    position:'absolute',
    left:24,
  },
  title: {
    fontSize: 28,
    textAlign:'center',
  },
  body:{
    padding:'4%',
    backgroundColor: '#f1f1f1',
  },
});
