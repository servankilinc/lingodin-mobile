import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { GetUserInfo } from '../utils/LocalStorage';
import { GetRequest } from '../utils/GlobalApiCall';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { RouteList } from '../utils/RouteList';
import CategoryByUserModel from '../models/category/CategoryByUserModel.ts';
import CardCategory from '../components/home/CardCategory';
import Config from '../../config';
import AppTemplate from '../templates/AppTemplate.tsx';
import { useAppDispatch } from '../redux/hooks.ts';
import { showAlertError } from '../redux/reducers/AlertSlice.ts';
import ProblemDetail, { ErrorTypes } from '../utils/ProblemDetail.ts';
// import { Settings, Settings2 } from 'lucide-react-native';

type SectionProps = NativeStackScreenProps<RootStackParamList, RouteList.home>;

export default function Home({navigation}: SectionProps): React.JSX.Element {
 
  const dispatch = useAppDispatch();
  
  const [data, setData] = useState<CategoryByUserModel[]>([]); 
  const [isPending, setIsPending] = useState(true);
 
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);
  
  const fetchData = async () =>{
    try {
      setIsPending(true);
      const user = await GetUserInfo(navigation);
      const response = await GetRequest<CategoryByUserModel[]>(`/api/Category/GetCategoriesForUser?userId=${user.id}`, navigation);
      setData(response);
    }
    catch (error) {
      dispatch(showAlertError({message: error instanceof ProblemDetail && error.type == ErrorTypes.Business ? error.detail : undefined}))
    }
    finally{
      setIsPending(false);
    }
  }

  return (
    <AppTemplate title='Kelime Gurupları'>
      {/* 
         <View style={styles.header}>
          <TouchableOpacity style={styles.buttonHeader} onPress={()=> navigation.navigate('MyAccount')}>
            <Icon name="user-gear" w={36} h={36} c={'#656565'}/> 
            <Settings2 size={36} color={'#656565'} /> 
          </TouchableOpacity>
          <Text style={styles.title}>
            Kelime Grupları
          </Text>
        </View>
      */}
       
      <View style={styles.body}>
      {
        data != null && data.length > 0 && data.map((value, key)=>{
          return (
            <CardCategory
              key={key}
              categoryId={value.category.id}
              title={value.category.english}
              total={value.totalWordCount}
              learnedCount={value.learnedWordCount}
              hasImage={value.category.hasImage}
              srcImage={value.category.image}
            />
          );
        })
      }
      </View>
    </AppTemplate>
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
    color: "#aaa",
  },
  body:{
    padding:'4%',
    backgroundColor: '#f1f1f1',
  },
});
