import React from 'react';

import BackButton from '../components/BackButton';
import Screen from '../components/Screen';
import routes from '../navigation/routes';

function MyGroupScreen({ navigation }) {
    return (
        <Screen>
            <BackButton onPress={() => navigation.navigate(routes.ACCOUNT)} />   
        </Screen>
    );
}

export default MyGroupScreen;