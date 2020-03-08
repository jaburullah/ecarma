import firebase from 'react-native-firebase';
const dailyTasksRef = firebase.firestore().collection('dailyTasks');

export const updateDailyTasks = (doc) => {
    dailyTasksRef.doc(doc.id).update({
        review: doc.review,
        status: doc.status,
        modifiedDate: new Date()
    });
}