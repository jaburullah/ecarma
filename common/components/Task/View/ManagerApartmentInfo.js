
import React from 'react';
import { View, Text } from 'react-native';
import { managerApartmentInfo } from '../../../../api/managerApartmentInfo'
import { AuthContext } from '../../../../store/context';
import { ACTION_USER_APARTMENT } from '../../../constants';
const ManagerApartmentInfo = (C) => {
    return (props) => {
        const [state, setState] = React.useState({ isLoading: true, apartments: [] })
        const { model, dispatch } = React.useContext(AuthContext);
        const apartmentsID = model.getApartmentsID();
        const getTabs = () => {
            managerApartmentInfo(apartmentsID, (docs) => {
                const apartments = docs.map(document => { let data = document.data(); data.id = document.id; return data; });
                model.setApartments(apartments)
                // dispatch({
                //     action: ACTION_USER_APARTMENT,
                //     payload: apartments
                // })

                setState(c => ({ isLoading: false, apartments }));
            });
        };

        React.useEffect(() => {
            getTabs();
        }, []);
        return state.isLoading ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Loading...</Text></View> : (<C {...props} apartments={state.apartments} />)

    }
}

export default ManagerApartmentInfo;