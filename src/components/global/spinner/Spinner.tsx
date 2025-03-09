import { LoaderCircle } from 'lucide-react-native';
import React from 'react'
import Animated, {
    ReduceMotion,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSpring,
} from 'react-native-reanimated';

export class SpinnerProps {
    color?: string;
    size?: number;
}
export default function Spinner(props: SpinnerProps): React.JSX.Element {
    
    const sv = useSharedValue<number>(0);

    React.useEffect(() => {
        sv.value = withRepeat(withSpring(1, {
            duration: 2000,
            dampingRatio: 0.5,
            stiffness: 100,
            overshootClamping: false,
            restDisplacementThreshold: 0.01,
            restSpeedThreshold: 2,
            reduceMotion: ReduceMotion.System,
        }), 0);
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${sv.value * 360}deg` }],
    }));
    return (
        <Animated.View style={animatedStyle}>
            <LoaderCircle color={props.color ?? "#aaa"} size={props.size ?? 22} />
        </Animated.View>
    )
}
