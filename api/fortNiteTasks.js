import firebase from 'react-native-firebase';
const fortNiteTasksRef = firebase.firestore().collection('fortNiteTasks');

export const updateFortNiteTasks = (doc) => {
    fortNiteTasksRef.doc(doc.id).update({
        review: doc.review,
        status: doc.status,
        modifiedDate: new Date()
    });
}