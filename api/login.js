import firebase from 'react-native-firebase';
const db = firebase.firestore();



export const login = (mobileNo, pwd, callBack) => {
    db.collection('users').where('mobileNo', '==', mobileNo).get()
        .then(callBack)
        .catch(err => {
            console.log('Error getting documents', err);
        });
}


export const getUserApartmentInfo = (user, callBack) => {

    const userApartmentInfoQuery = [];
    user.apartmentID.forEach(d => {
        userApartmentInfoQuery.push(db.collection('apartments').doc(d).get());
    });

    Promise.all(userApartmentInfoQuery).then(allData => {
        const apartmentsInfo = {}
        allData.forEach(c => {
            apartmentsInfo[c.id] = c.data();
        });
        callBack(apartmentsInfo)
    }).catch(e => {
        console.log(e);
    });
}