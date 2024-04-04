import { useState, useEffect, React } from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";
import { Button } from 'react-native-paper';

// For testing
const TESTDATA = [
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'First Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Second Item',
    },
    {
        id: '58694b0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '58694c0f-3da1-471f-bd96-145571e29d72',
        title: 'Fourth Item',
    },
    {
        id: '58694c0f-3da1-471f-bd96-145571e29d72',
        title: 'Fifth Item',
    },
    {
        id: '58694c0f-3da1-471f-bd96-145571e29d72',
        title: 'Sixth Item',
    },
    {
        id: '58694c0f-3da1-471f-bd96-145571e29d72',
        title: 'Seventh Item',
    },
]

// For testing
const header = "Total calories"

// For testing
const Item = ({ title }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </View>
);

export default function CalorieCalculator() {
    const [calories, setCalories] = useState(0)

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerItem}>
                <Text style={styles.title}>{header}</Text>
            </View>
            <FlatList
                data={TESTDATA}
                renderItem={({ item }) => <Item title={item.title} />}
                keyExtractor={item => item.id}
            />
            <Button
                textColor="#000000"
                buttonColor="#D3D3D3"
                style={styles.button}
                icon="plus" mode="contained"
                onPress={() => ('Button pressed at CalorieCalculator')}>
                Add
            </Button>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 96,
        marginHorizontal: 8
    },
    headerItem: {
        backgroundColor: '#D3D3D3',
        padding: 20,
        marginBottom: 32,
        marginHorizontal: 0
    },
    item: {
        backgroundColor: '#D3D3D3',
        padding: 20,
        marginVertical: 4,
        marginHorizontal: 0
    },
    title: {
        fontSize: 32,
        textAlign: 'center',
        color: '#000000'
    },
    button: {
        marginBottom: 96,
        padding: 8,
        marginHorizontal: 16
    }
});
