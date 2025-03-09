import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Spinner from "../spinner/Spinner";

export class ButtonProps {
    isPending?: boolean | undefined;
    callback!: () => void;
    text!: string;
    mode!: string;
}

export default function ButtonPrimary(props: ButtonProps): React.JSX.Element {
    return (
        <TouchableOpacity
            disabled={props.isPending != undefined && props.isPending ? true : false}
            onPress={() => props.callback()}
            style={[styles.buttonSignUp, {
                backgroundColor:
                    props.mode == "light" ? "#eee" :
                        props.mode == "blue" ? '#23689B' :
                            "#fff"
            }]}
        >
            {
                props.isPending != undefined && props.isPending ?
                    <Spinner color={"#fff"} />
                    :
                    <Text style={[styles.textButtonSignUp, {
                        color:
                            props.mode == "light" ? "#3b3b3b" :
                                props.mode == "blue" ? '#fff' :
                                    "#3b3b3b"
                    }]}>
                        {props.text}
                    </Text>
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonSignUp: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 15,
        alignSelf: 'flex-end',
        shadowColor: '#aaa',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    textButtonSignUp: {
        fontWeight: "600"
    },
})