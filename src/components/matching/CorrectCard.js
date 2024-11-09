import React, { StyleSheet, View, TouchableOpacity, Dimensions, Image } from 'react-native';
import Animated, { useSharedValue, withSpring, useAnimatedStyle, withDelay, withSequence, withTiming } from 'react-native-reanimated';

const screenWidth = Dimensions.get('window').width - 50;

export default function CorrectCard({word, PressedCorrect}) {

  const handlePressCorrect = () => {
    opactiy.value = withSequence(withTiming(0.1, {duration: 800}), withDelay(200, withTiming(1)));
    setTimeout(() => PressedCorrect(), 1500);
  };

  const opactiy = useSharedValue(1);
  const animatedCorrect = useAnimatedStyle(() => ({
    opacity: withSpring(opactiy.value),
  }));

  return (
    <View style={styles.backGround}>
      <Animated.View style={[animatedCorrect, styles.card]}>
        <TouchableOpacity
          onPress={handlePressCorrect}
          style={styles.btnCollapseImage}>
          <Image
            style={styles.image}
            source={word.hasImage ? {uri: word.image} : require('../../assets/placeholder.png')}
          />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  backGround:{
    width: screenWidth / 2,
    height: screenWidth / 2,
    backgroundColor: '#5BB318',
    zIndex: 3,
    borderRadius: 28,
  },
  card: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 2,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#efefef',
    shadowColor: '#727272',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  btnCollapseImage:{
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    marginBottom: 20,
    borderRadius: 23,
  },
});
