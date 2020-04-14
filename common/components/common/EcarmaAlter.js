import {
    Alert
} from 'react-native';



export const AlterWithSingleButton = (title, msg, onOkCallBack) => {

    Alert.alert(
        title,
        msg,
        [
            { text: "OK", onPress: onOkCallBack }
        ],
        { cancelable: false }
    );
}

export const AlterWithOkAndCancelButton = (title, msg, okCallBack, cancelCallBack) => {

    Alert.alert(
        title,
        msg,
        [
            {
                text: "Cancel",
                onPress: cancelCallBack,
                style: "cancel"
            },
            { text: "OK", onPress: okCallBack }
        ],
        { cancelable: false }
    );
}