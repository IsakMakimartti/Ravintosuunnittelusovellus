import { useState, useEffect, React } from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";
import { Button } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
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
/*const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);*/

export default function CalorieCalculator() {
  const [calories, setCalories] = useState(0)
  const [showSearchbar, setShowSearchbar] = useState(false)
  const [recipes, setRecipes] = useState([]);

  const route = useRoute()
  const { totalCalories = 0, recipeLabel = "" } = route.params || {};

  const toggleSearchbar = () => {
    setShowSearchbar(!showSearchbar)
  }

  useEffect(() => {
    // Update calories state with totalCalories from route params
    setCalories(totalCalories);
  }, [totalCalories]);

  const addRecipe = () => {
    const newRecipe = {
      id: Math.random().toString(),
      title: recipeLabel
    }
    setRecipes([...recipes, newRecipe])
  }

  const renderRecipeItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
    </View>
  )

  const header = "Total calories: " + calories

  return (
    <SafeAreaView style={styles.container}>
      {!showSearchbar && (
        <>
          <View style={styles.headerItem}>
            <Text style={styles.title}>{header}</Text>
          </View>
          <FlatList
            data={recipes}
            renderItem={renderRecipeItem}
            keyExtractor={(item) => item.id}
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
