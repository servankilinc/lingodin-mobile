import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Rect, Svg} from 'react-native-svg';

type SectionProps = {
  percent: number
}

export default function ProgressBar(props: SectionProps) {
  let stylePercent = `${props.percent - 2}%`;

  return (
    <View style={styles.collapse}>
      <Svg width={'80%'} height={15} style={styles.svgBody}>
        <Rect
          width={stylePercent}
          height={'70%'}
          x={'1%'}
          y={'14%'}
          rx={5}
          ry={5}
          fill={'#004cad'}
        />
        {/*<Text x={'39%'} y={'50%'} fontSize={3} fill={'white'} textAnchor="middle" alignmentBaseline="middle">
          78%
        </Text>*/}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  collapse: {
    width: '100%',
    marginVertical: '3%',
  },
  svgBody: {
    backgroundColor: '#004cad40',
    borderRadius: 8,
    marginHorizontal: '10%',
  },
});
