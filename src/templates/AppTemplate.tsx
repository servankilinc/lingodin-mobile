import React, { PropsWithChildren } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Header, { HeaderProps } from '../components/global/Header';
import AlertSuccess from '../components/global/alerts/AlertSuccess';
import AlertError from '../components/global/alerts/AlertError';

type SectionProps = PropsWithChildren<HeaderProps>;

export default function AppTemplate({ children, title, returnbackEnable, returnHomeEnable }: SectionProps): React.JSX.Element {
    return (
        <View style={styles.container}>
            <Header title={title} returnbackEnable={returnbackEnable} returnHomeEnable={returnHomeEnable} />
            <ScrollView>
                {children}
            </ScrollView>
            <AlertSuccess />
            <AlertError />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5"
    },
});