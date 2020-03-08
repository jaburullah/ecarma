import React from 'react';
import { AppReducer } from './reducer'
import { appModel } from '../common/model/model'
const initialState = {
    user: null,
    isAuthenticated: false,
    apartmentID: null,
    apartmentsInfo: null,
    apartmentTickets: null,
    apartmentDailyTasks: null,
    apartmentWeeklyTasks: null,
    apartmentMonthlyTasks: null,
}



export const AuthContext = React.createContext(initialState);

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(AppReducer, initialState);

    const model = appModel(state)

    return <AuthContext.Provider value={{ globalState: state, dispatch, model }}>{children}</AuthContext.Provider>
}