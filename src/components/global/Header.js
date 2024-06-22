import * as React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Icon from '../../assets/svg';
import {useNavigation} from '@react-navigation/native';

function Header({title}) {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.buttonBack}
        onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" w={30} h={30} c={'#bcbcbc'} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}
export default Header;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 3,
    borderBottomColor: '#e5e5e5',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
  },
  buttonBack: {
    position:'absolute',
    left:24,
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
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
