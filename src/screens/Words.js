import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Dimensions} from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, runOnJS, withTiming} from 'react-native-reanimated';
import {GetUserInfo} from '../utils/LocalStorage.js';
import {GetRequest} from '../utils/GlobalApiCall.js';
import ProgressBar from '../components/global/ProgressBar.js';
import Header from '../components/global/Header.js';
import WordCard from '../components/words/WordCard.js';
import Icon from '../assets/svg/index.js';

const SIZE = (Dimensions.get('screen').width * 5) / 5;

export default function Words({navigation, route}) {
  const [data, setData] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const [cardBtnDisabled, setCardBtnDisabled] = useState(false);

  useEffect(() => {
    GetUserInfo(navigation).then(storedUserInfo => {
      GetRequest(`/api/Word/GetWordsByCategoryForUser?categoryId=${route.params.categoryId}&userId=${storedUserInfo.user.id}`, navigation)
        .then(function (response) {
          setData(response);
        });
    })
  }, []);

  const offset = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => ({left: offset.value}));

  const Swipe = position => {
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
    <View style={styles.container}>
      <Header title={route.params.categoryTitle} />

      {data != null && data.length > 0 && (
        <View style={styles.body}>
          <ProgressBar percent={(currentCardIndex / (data.length - 1)) * 100} />
          <View style={styles.bodyOfWords}>
            <Animated.View style={[styles.row, animatedStyles]}>
              {data.map((word, index) => (
                <WordCard key={index} data={word} rotateY={rotateY} isTurned={isTurned} />
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
