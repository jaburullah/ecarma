
import React from 'react';
import { dashboardData } from '../../../api/dashboard'
import { AuthContext } from '../../../store/context';
import { ACTION_APARTMENT_TICKETS, ACTION_APARTMENT_DAILY_TASKS, ACTION_APARTMENT_WEEKLY_TASKS, ACTION_APARTMENT_FORTNITE_TASKS } from '../../constants';
function numLengthCheck(num) {
    num = num + '';
    num = num.length >= 2 ? num : '0' + num;
    return num;
}

function calculatePercentage(ticketCount, totalTicketCount) {
    let s = Math.floor(ticketCount / totalTicketCount * 100)
    return isNaN(s) ? 0 : s;
}

function separateTickets(data, type, dispatch) {
    let sadTickets = [];
    let normalTickets = [];
    let happyTickets = [];
    let noReview = [];
    let openTickets = [];
    data.forEach(o => {
        let d = o.data();
        d.id = o.id


        if (d.review === 'happy') {
            happyTickets.push(d);
        } else if (d.review === 'normal') {
            normalTickets.push(d);
        } else if (d.review === 'sad') {
            sadTickets.push(d);
        }
        else {
            noReview.push(d);
        }


        if (d.status === 'Open') {
            openTickets.push(d);
        }
    });
    let d = happyTickets.concat(normalTickets).concat(sadTickets).concat(noReview);
    if (type === 'tickets') {
        dispatch({
            type: ACTION_APARTMENT_TICKETS,
            payload: d
        });
    }
    else if (type === 'daily') {
        dispatch({
            type: ACTION_APARTMENT_DAILY_TASKS,
            payload: d
        });
    }
    else if (type === 'weekly') {
        dispatch({
            type: ACTION_APARTMENT_WEEKLY_TASKS,
            payload: d
        });
    }
    else if (type === 'fortNite') {
        dispatch({
            type: ACTION_APARTMENT_FORTNITE_TASKS,
            payload: d
        });
    }

    let totalCount =
        sadTickets.length + normalTickets.length + happyTickets.length;
    let allCount = data.length;
    let m = {
        name: type,
        title: type.toUpperCase(),
        openTicketCount: numLengthCheck(openTickets.length),
        happyPercent: numLengthCheck(
            calculatePercentage(happyTickets.length, totalCount),
        ),
        normalPercent: numLengthCheck(
            calculatePercentage(normalTickets.length, totalCount),
        ),
        sadPercent: numLengthCheck(
            calculatePercentage(sadTickets.length, totalCount),
        ),
    };

    let s = [+m.happyPercent, +m.normalPercent, +m.sadPercent]
    let maxS = Math.max(...s);
    if (maxS === +m.happyPercent) {
        m.max = 'happy'
    }
    else if (maxS === +m.normalPercent) {
        m.max = 'normal'
    }
    else if (maxS === +m.sadPercent) {
        m.max = 'sad'
    }
    return m;
}

const Dashboard = (C) => {
    return (props) => {

        const { model, dispatch } = React.useContext(AuthContext);



        const [state, setState] = React.useState({
            tickets: [],
            isLoading: true,
            apartmentInfo: [],
            count: 0
        });

        const getData = () => {
            const apartmentsID = model.getApartmentsID();
            dashboardData(apartmentsID, (data) => {

                let d = [[], [], [], []]
                for (let i = 0; i < data.length - 1; i++) {
                    for (let j = 0; j < data[i].length; j++) {
                        let docs = data[i][j]._docs
                        for (let k = 0; k < docs.length; k++) {
                            d[i].push(docs[k]);
                        }
                    }
                }

                const titles = ['tickets', 'daily', 'weekly', 'fortNite']
                let dd = d.map((d, i) => {
                    return separateTickets(d, titles[i], dispatch);
                });
                let ap = data[data.length - 1];
                let apName = ap.map(doc => doc.data().name)

                setState(c => ({ tickets: dd, isLoading: false, apartmentInfo: apName }));
            });

        }



        React.useEffect(() => {
            // props.navigation.addListener('didFocus', () => {
            getData();
            // });
        }, [])


        return (<C {...props} state={state} />);

    }
};

export default Dashboard;