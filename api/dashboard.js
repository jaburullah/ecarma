import firebase from 'react-native-firebase';
const db = firebase.firestore();


export const dashboardData = (apartmentsID, callBack) => {
    const mapAppTickets = apartmentsID.map(v => db.collection('tickets').where('apartmentID', '==', v).orderBy('modifiedDate', 'desc').get())
    const mapAppDaily = apartmentsID.map(v => db.collection('dailyTasks').where('apartmentID', '==', v).orderBy('modifiedDate', 'desc').get())
    const mapAppWeekly = apartmentsID.map(v => db.collection('weeklyTasks').where('apartmentID', '==', v).orderBy('modifiedDate', 'desc').get())
    const mapAppMonth = apartmentsID.map(v => db.collection('monthlyTasks').where('apartmentID', '==', v).orderBy('modifiedDate', 'desc').get())

    let pT = Promise.all(mapAppTickets);
    let pD = Promise.all(mapAppDaily);
    let pW = Promise.all(mapAppWeekly);
    let pM = Promise.all(mapAppMonth);

    const mapApartments = apartmentsID.map(v => db.collection('apartments').doc(v).get())

    let pA = Promise.all(mapApartments);

    Promise.all([pT, pD, pW, pM, pA]).then(callBack).catch(e => console.log(e));
}