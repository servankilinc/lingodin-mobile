import React, { PropsWithChildren } from 'react';
import { View, StyleSheet } from 'react-native';
import AlertSuccess from '../components/global/alerts/AlertSuccess';
import AlertError from '../components/global/alerts/AlertError';

export default function PureTemplate({ children }: PropsWithChildren): React.JSX.Element {
    return (
        <View style={styles.container}>
            <AlertSuccess />
            <AlertError />
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5"
    },
});