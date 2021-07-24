import React, { useContext, useState } from 'react';
import { Image, View, StyleSheet, TouchableHighlight, Button } from 'react-native';
import colors from '../../config/colors';
import AppText from '../Text';
import AppButton from '../Button';
import AuthContext from '../../auth/context';
import { firebase } from '../../../firebase/config';

function GroupList({ title, image, onPress }) {
    const { user } = useContext(AuthContext);
    const [ follow, setFollow ] = useState(true);

    const usersRef = firebase.firestore().collection("users").doc(user.id);

    const handleFollow = async () => {
        setFollow(false)
        const addGroup = await usersRef.update({
            groups: firebase.firestore.FieldValue.arrayUnion(title)
        }).catch((error) => alert(error));
    }
    const handleUnfollow = async () => {
        setFollow(true)
        const removeGroup = await usersRef.update({
            groups: firebase.firestore.FieldValue.arrayRemove(title)
        }).catch((error) => alert(error));
    }
    return (
        <TouchableHighlight
            underlayColor={colors.primary}
            onPress={onPress}
        >
            <View style={styles.containter}>
                <Image style={styles.image} source={image} />
                <View style={styles.title}>
                    <AppText>{title}</AppText>
                </View>
                <View style={styles.button}>
                    <Button
                        color={follow ? colors.primary : colors.white}
                        title={follow ? "Following" : "Follow"}
                        onPress={follow ? handleUnfollow : handleFollow} 
                    />
                </View>
            </View>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    containter: {
        flexDirection: "row",
        flex: 1,
    },
    image: {
        justifyContent: 'flex-start',
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight: 30,
        backgroundColor: "grey"
    },
    title: {
        justifyContent: 'center',
        color: colors.medium,
        width: 170
    },
    button: {
        width: 100,
        alignItems: 'flex-end',
        justifyContent: 'center'
    }
})

export default GroupList;