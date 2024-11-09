import React from 'react';
import {Svg, Circle, Text as SVGText} from 'react-native-svg';

export default function App({total, learned}) {
  const size = 90;
  const strokeWidth = 20;
  const text = `${learned}/${total}`;
  const radius = (size - strokeWidth) / 2;
  const circum = radius * 2 * Math.PI;
  let svgProgress = 0;
  if (total !== 0 || total != null) {
    svgProgress = Math.round(100 - (learned / total) * 100);
  }

  return (
    <Svg width={size} height={size}>
      <Circle
        stroke={
          svgProgress > 50
            ? '#efefef'
            : svgProgress > 25
            ? '#ff9b0020'
            : '#0ba14820'
        }
        fill="none"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={10}
      />
      <Circle
        stroke={
          svgProgress > 50
            ? '#efefef'
            : svgProgress > 25
            ? '#ff9b00'
            : '#0ba148'
        }
        fill="none"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeDasharray={`${circum} ${circum}`}
        strokeDashoffset={circum * (svgProgress / 100)}
        strokeLinecap="round"
        //transform={`rotate(-90, ${size / 2}, ${size / 2})`}
        transform={`rotate(300, ${size / 2}, ${size / 2})`}
        strokeWidth={10}
      />
      <SVGText
        fontSize={'9'}
        x={size / 2}
        y={size / 2 + (10 ? 10 / 2 - 1 : 5)}
        textAnchor="middle"
        fill={'#333333'}>
        {text}
      </SVGText>
    </Svg>
  );
}
