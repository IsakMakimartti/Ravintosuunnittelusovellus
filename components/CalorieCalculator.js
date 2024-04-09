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
const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

export default function CalorieCalculator() {
  const [calories, setCalories] = useState(0)
  const [showSearchbar, setShowSearchbar] = useState(false)

  const toggleSearchbar = () => {
    setShowSearchbar(!showSearchbar)
  }

  const header = "Total calories: " + calories

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
          <View style={styles.addButtonContainer}>
            <Button
              textColor="#000000"
              buttonColor="#D3D3D3"
              style={styles.buttonAdd}
              icon="plus"
              mode="contained"
              onPress={toggleSearchbar}>
              Add
            </Button>
          </View>
        </>
      )}
      {showSearchbar && (
        <>
          <View style={styles.searchbarContainer}>
            <View style={styles.searchbar}>
              <Searchbar />
            </View>
          </View>
          <View style={styles.cancelButtonContainer}>
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
        </>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerItem: {
    backgroundColor: '#F1F1F1',
    padding: 20,
    marginBottom: 32,
    marginHorizontal: 8,
    borderBottomWidth: 2,
    borderColor: '#000000'
  },
  item: {
    backgroundColor: '#F1F1F1',
    padding: 20,
    marginVertical: 4,
    marginHorizontal: 8,
    borderBottomWidth: 2,
    borderColor: '#000000'
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    color: '#000000'
  },
  addButtonContainer: {
    marginBottom: 16,
    marginHorizontal: 16,
  },
  cancelButtonContainer: {
    marginBottom: 16,
    marginHorizontal: 16,
  },
  buttonAdd: {
    padding: 8,
    backgroundColor: '#c5ee7d',
  },
  buttonCancel: {
    padding: 8,
    backgroundColor: '#c5ee7d'
  },
  searchbarContainer: {
    flex: 1,
    backgroundColor: '#F1F1F1',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  searchbar: {
  }
});
