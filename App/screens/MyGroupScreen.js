import React from 'react';

import BackButton from '../components/BackButton';
import Screen from '../components/Screen';

function MyGroupScreen({ navigation }) {
    return (
        <Screen>
            <BackButton onPress={() => navigation.navigate(routes.ACCOUNT)} />
        </Screen>
    );
}

export default MyGroupScreen;