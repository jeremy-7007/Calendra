import React from 'react';
import { Image, View, StyleSheet, TouchableHighlight } from 'react-native';
import colors from '../../config/colors';
import AppText from '../Text';

function GenericList({ title, image, onPress }) {
    return (
        <TouchableHighlight
            underlayColor={colors.light}
            onPress={onPress}
        >
            <View style={styles.containter}>
                <Image style={styles.image} source={image} />
                <View>
                    <AppText style={styles.title}>{title}</AppText>
                </View>
            </View>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    containter: {
        flexDirection: "row"
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight: 10
    }
})

export default GenericList;