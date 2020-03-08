import firebase from 'react-native-firebase'
const apartmentRef = firebase.firestore().collection('apartments');
export const managerApartmentInfo = (apartmentsID, callBack) => {
    const apartmentsIDDocs = apartmentsID.map(v => apartmentRef.doc(v).get());
    Promise.all(apartmentsIDDocs).then(callBack).catch(e => console.log(e));
}