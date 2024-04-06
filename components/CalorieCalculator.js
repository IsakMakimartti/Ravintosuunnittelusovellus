import { useState, useEffect, React } from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";
import { Button } from 'react-native-paper';
import Searchbar from "./Searchbar";

// For testing
const TESTDATA = [
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'First Item',
    },
    {
        id: '58699a0f-3da1-471f-bd96-145571e29d72',
        title: 'Second Item',
    },
    {
        id: '58694b0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '58693c0f-3da1-471f-bd96-145571e29d72',
        title: 'Fourth Item',
    },
    {
        id: '58690c0f-3da1-471f-bd96-145571e29d72',
        title: 'Fifth Item',
    },
    {
        id: '58691c0f-3da1-471f-bd96-145571e29d72',
        title: 'Sixth Item',
    },
    {
        id: '58692c0f-3da1-471f-bd96-145571e29d72',
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
    const [calories, setCalories] = useState("")
    const [showSearchbar, setShowSearchbar] = useState(false)

    const toggleSearchbar = () => {
        setShowSearchbar(!showSearchbar)
    }

    return (
        <SafeAreaView style={styles.container}>
          {!showSearchbar && (
            <>
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
                style={styles.buttonAdd}
                icon="plus"
                mode="contained"
                onPress={toggleSearchbar}>
                Add
              </Button>
            </>
          )}
          {showSearchbar && (
            <View style={styles.searchbarContainer}>
              <View style={styles.searchbar}>
                <Searchbar />
              </View>
              <View style={styles.cancelButton}>
                <Button
                  textColor="#000000"
                  buttonColor="#D3D3D3"
                  style={styles.buttonCancel}
                  icon="minus"
                  mode="contained"
                  onPress={toggleSearchbar}>
                  Cancel
                </Button>
              </View>
            </View>
          )}
        </SafeAreaView>
      )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 16,
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
    buttonAdd: {
        marginBottom: 16,
        padding: 8,
        marginHorizontal: 16,
    },
    buttonCancel: {
        marginTop: 110,
        marginBottom: 16,
        padding: 8,
        marginHorizontal: 16,
    },
    searchbar: {
        marginTop: 16
    }
});
