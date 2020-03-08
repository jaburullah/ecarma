import firebase from 'react-native-firebase';
const weeklyTasksRef = firebase.firestore().collection('weeklyTasks');

export const updateWeeklyTasks = (doc) => {
    weeklyTasksRef.doc(doc.id).update({
        review: doc.review,
        status: doc.status,
        modifiedDate: new Date()
    });
}