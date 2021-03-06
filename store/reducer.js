import { ACTION_LOGIN, ACTION_APARTMENT_TICKETS, ACTION_APARTMENT_DAILY_TASKS, ACTION_APARTMENT_WEEKLY_TASKS, ACTION_APARTMENT_FORTNITE_TASKS, ACTION_LOGOUT } from "../common/constants"

export const AppReducer = (state, action) => {

    switch (action.type) {
        case ACTION_LOGIN:
            return {
                ...state,
                user: action.payload.user,
                apartmentsInfo: action.payload.apartmentsInfo,
                isAuthenticated: true,
            }
        case ACTION_LOGOUT:
            return {
                ...state,
                isAuthenticated: false
            }
        case ACTION_APARTMENT_TICKETS:
            state.apartmentTickets = action.payload
            return state
        case ACTION_APARTMENT_DAILY_TASKS:
            state.apartmentDailyTasks = action.payload
            return state
        case ACTION_APARTMENT_WEEKLY_TASKS:
            state.apartmentWeeklyTasks = action.payload
            return state
        case ACTION_APARTMENT_FORTNITE_TASKS:
            state.apartmentFortNiteTasks = action.payload
            return state
        default:
            return state;
    }
}