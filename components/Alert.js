import { StyleSheet, Text, TextInput, View, Image, Pressable, ScrollView, Modal, Keyboard } from 'react-native';
import { useState } from 'react';
export default function AlertModal(props){
    const [alert, setalert] = useState(props.alertstate)
return (
    <Modal visible={alert} onRequestClose={() => setalert(!alert)} transparent={true} animationType={"slide"}>
        <View style={{ flex: 1, alignContent: "center", alignSelf: "center", justifyContent: "center" }}>
            <View style={styles.alertmodal}>
                <Text style={styles.alert}>{props.alert}</Text>
            </View>
        </View>
    </Modal>
)
}
const styles = StyleSheet.create({
    alert: {
        fontSize: 15,
        width: "100%",
        textAlign: "center",
        fontWeight: "bold"
    },
    alertmodal: {
        padding: 10,
        backgroundColor: "#c5ee7d",
        alignItems: "center",
        minWidth: "80%"
    },
});