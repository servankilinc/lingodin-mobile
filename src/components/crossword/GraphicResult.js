import React, {Circle, Svg, Text as SVGText} from 'react-native-svg';

export default function ChartResult({total, learnedWordCount}) {
  const size = 220;
  const strokeWidth = 50;
  const radius = (size - strokeWidth) / 2;
  const circum = radius * 2 * Math.PI;
  let svgProgress = 0;
  if (total !== 0 || total != null) {
    svgProgress = Math.round(100 - (learnedWordCount / total) * 100);
  }
  return (
    <Svg width={size} height={size}>
      <Circle
        stroke={
          svgProgress > 50
            ? '#ff000020'
            : svgProgress > 25
            ? '#ff9b0020'
            : '#0ba14820'
        } //#0ba14830 #ff9b0030 #ff000030
        fill="none"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={20}
      />
      <Circle
        stroke={
          svgProgress > 50
            ? '#ff0000'
            : svgProgress > 25
            ? '#ff9b00'
            : '#0ba148'
        } //#0ba148 #ff9b00 #ff0000
        fill="none"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeDasharray={`${circum} ${circum}`}
        strokeDashoffset={circum * (svgProgress / 100)}
        strokeLinecap="round"
        transform={`rotate(-90, ${size / 2}, ${size / 2})`}
        strokeWidth={25}
      />
      <SVGText
        fontSize={24}
        x={size / 2}
        y={size / 2 + (10 ? 10 / 2 - 1 : 5)}
        textAnchor="middle"
        fill={'#3f5e87'}>
        {`${100 - svgProgress}%`}
      </SVGText>
    </Svg>
  );
}
