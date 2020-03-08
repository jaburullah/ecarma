import firebase from 'react-native-firebase';
const db = firebase.firestore();



export const login = (mobileNo, pwd, callBack) => {
    db.collection('users').where('mobileNo', '==', mobileNo).get()
        .then(callBack)
        .catch(err => {
            console.log('Error getting documents', err);
        });
}