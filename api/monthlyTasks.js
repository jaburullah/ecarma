import firebase from 'react-native-firebase';
const monthlyTasksRef = firebase.firestore().collection('monthlyTasks');

export const updateMonthlyTasks = (doc) => {
    monthlyTasksRef.doc(doc.id).update({
        review: doc.review,
        status: doc.status,
        modifiedDate: new Date()
    });
}