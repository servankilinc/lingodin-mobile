import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Dimensions} from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, runOnJS, withTiming} from 'react-native-reanimated';
import {GetUserInfo} from '../utils/LocalStorage';
import {GetRequest} from '../utils/GlobalApiCall';
import ProgressBar from '../components/global/ProgressBar';
import WordCard from '../components/words/WordCard';
import Icon from '../assets/svg/index';
import { RouteList } from '../utils/RouteList';
import { RootStackParamList } from '../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import WordByUserModel from '../models/word/WordByUserModel';
import { useAppDispatch } from '../redux/hooks';
import { showAlertError } from '../redux/reducers/AlertSlice';
import ProblemDetail, { ErrorTypes } from '../utils/ProblemDetail';
import AppTemplate from '../templates/AppTemplate';

const SIZE = (Dimensions.get('screen').width * 5) / 5;

type SectionProps = NativeStackScreenProps<RootStackParamList, RouteList.words>;

export default function Words({navigation, route}: SectionProps) {
  
  const dispatch = useAppDispatch();

  const [data, setData] = useState<WordByUserModel[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);

  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () =>{
    try {
      var user = await GetUserInfo(navigation);
      var response = await GetRequest<WordByUserModel[]>(`/api/Word/GetWordsByCategoryForUser?categoryId=${route.params.categoryId}&userId=${user.id}`, navigation);
      setData(response);    
    }
    catch (error) {
      dispatch(showAlertError({message: error instanceof ProblemDetail && error.type == ErrorTypes.Business ? error.detail : undefined}))
    }
  }


  const [cardBtnDisabled, setCardBtnDisabled] = useState<boolean>(false);

  const offset = useSharedValue<number>(0);
  const animatedStyles = useAnimatedStyle(() => ({left: offset.value}));

  const Swipe = (position: number) => {
    if ((position == -1 && currentCardIndex != 0) || (position == 1 && currentCardIndex < data.length - 1)) {
      
      if (isTurned){ // rotate back
        toRotate();
      }

      setCardBtnDisabled(true);
      const newOffset = offset.value + SIZE * -position;
      offset.value = withSpring(
        newOffset,
        {restDisplacementThreshold: 5, restSpeedThreshold: 5},
        isFinished => {
          if (isFinished) {
            runOnJS(setCardBtnDisabled)(false);
          }
        },
      );
      setCurrentCardIndex(prev => prev + position); // -1 or +1
    }
  };

  const [isTurned, setIsTurned] = useState(false);
  const rotateY = useSharedValue(0);

  const toRotate = () => {
    rotateY.value = withTiming(rotateY.value + 90, { duration: 200 }, (finished) => {
      if (finished) {
        rotateY.value += 180
        rotateY.value = withTiming(rotateY.value + 90, { duration: 200 });
        runOnJS(setIsTurned)(!isTurned);
      }
    });
  };


  return (
    <AppTemplate title={route.params.categoryTitle} returnHomeEnable={true} returnbackEnable={true}>
      <View style={styles.collapse}>

      {data != null && data.length > 0 && (
        <View style={styles.body}>
          <ProgressBar percent={(currentCardIndex / (data.length - 1)) * 100} />
          <View style={styles.bodyOfWords}>
            <Animated.View style={[styles.row, animatedStyles]}>
              {data.map((word, index) => (
                <WordCard key={index} model={word} rotateY={rotateY} isTurned={isTurned} />
              ))}
            </Animated.View>
          </View>
        </View>
      )}

      <View style={styles.bodyButtons}>
        <TouchableOpacity
          onPress={() => Swipe(-1)}
          disabled={cardBtnDisabled}
          style={styles.buttonArrow}>
          <Icon name="chevron-left" w={36} h={36} c={'#7e7e7e'} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={toRotate}
          disabled={cardBtnDisabled}
          style={styles.buttonRotate}>
          <Icon name="rotate" w={48} h={48} c={'#fff'} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Swipe(1)}
          disabled={cardBtnDisabled}
          style={styles.buttonArrow}>
          <Icon name="chevron-right" w={36} h={36} c={'#7e7e7e'} />
        </TouchableOpacity>
      </View>
            </View>
    </AppTemplate>
  );
}

const styles = StyleSheet.create({
  collapse:{
    display:"flex",
    height: Dimensions.get('window').height*9/10 
  },
  body: {
    flex: 4,
    flexDirection: 'column',
  },
  bodyOfWords: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  row: {
    flexDirection: 'row',
    position: 'absolute',
  },
  box: {
    height: SIZE,
    width: SIZE,
    borderRadius: 5,
  },

  bodyButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 36,
  },
  buttonArrow: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 50,
    padding: 10,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#727272',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonRotate: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 50,
    padding: 15,
    backgroundColor: '#004cad',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#727272',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
