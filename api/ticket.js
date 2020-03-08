import firebase from 'react-native-firebase'
const ticketsRef = firebase.firestore().collection('tickets');

export const addTicket = (newTicket) => {
    ticketsRef.add(newTicket).then((doc) => {
        console.log(doc);
    });
}

export const updateTicket = doc => {
    ticketsRef.doc(doc.id).update({
        review: doc.review,
        status: doc.status,
        modifiedDate: new Date()
    });
};