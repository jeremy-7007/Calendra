import React from 'react';

import BackButton from '../components/BackButton';
import Screen from '../components/Screen';

function SettingScreen(props) {
    return (
        <Screen>
            <BackButton onPress={() => navigation.navigate(routes.ACCOUNT)} />
        </Screen>
    );
}

export default SettingScreen;