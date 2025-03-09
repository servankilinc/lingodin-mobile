import * as React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Icon from '../../assets/svg';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import { RootStackParamList } from '../../../App';

export class HeaderProps {
  title?: string;
  returnbackEnable?: boolean = false;
  returnHomeEnable?: boolean = false;
}

function Header(props:HeaderProps) : React.JSX.Element {
  
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.header}>
      {
        props.returnbackEnable &&
        <TouchableOpacity
          style={styles.buttonBack}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" w={30} h={30} c={'#bcbcbc'} />
        </TouchableOpacity>
      }

      <Text style={styles.title}>{props.title}</Text>
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
    color:"#aaa"
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
