import React, { StyleSheet, View, TouchableOpacity, Dimensions, Image } from 'react-native';
import Animated, { useSharedValue, withSpring, useAnimatedStyle, withDelay, withSequence, withTiming, withRepeat } from 'react-native-reanimated';

const screenWidth = Dimensions.get('window').width - 50;
const OFFSET = 20;
const TIME = 150;
const DELAY = 100;

export default function WrongCard({word, PressedWrong}) {

  const handlePressWrong = () => {
    rotate.value = withDelay(
      DELAY,
      withSequence(
        withTiming(-OFFSET, {duration: TIME / 2}),
        withRepeat(withTiming(OFFSET, {duration: TIME}), 3, true),
        withTiming(0, {duration: TIME / 2}),
      ),
    );
    PressedWrong();
  };

  const rotate = useSharedValue(0);
  const animatedShake = useAnimatedStyle(() => ({
    transform: [{rotate: withSpring(rotate.value + 'deg')}],
  }));

  return (
    <View style={styles.backGround}>
      <Animated.View style={[animatedShake, styles.card]}>
        <TouchableOpacity
          onPress={handlePressWrong}
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
    backgroundColor: '#D83F3190',
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
