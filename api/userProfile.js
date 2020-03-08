import firebase from 'react-native-firebase'
const db = firebase.firestore();
const usersRef = db.collection('users');

export const updateUserData = (updateUser, successCallBack, failCallBack) => {
    usersRef.where('mobileNo', '==', updateUser.mobileNo).get().then(data => {
        if (data.docs.length && data.docs[0].id !== updateUser.userID) { //if (data.docs.length && req.body.userID !== data.docs[0].id) {
            // ToastAndroid.show("Mobile number already exists", ToastAndroid.SHORT);
            failCallBack("Mobile number already exists");
            throw "error: Mobile number already exists"
        }
        else {
            return usersRef.doc(`${updateUser.userID}`)
                .get()
        }
    })
        .then((doc) => {
            if (!doc.exists) {
                failCallBack("User not found");
                console.log({ error: 'User not found' });
            }
            delete updateUser.userID;
            // _storeData(updateUser.mobileNo);
            return doc.ref.update({ ...updateUser })
        })
        .then(successCallBack)
        .catch((err) => {
            console.log(err);
        });
};