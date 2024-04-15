import { useState, useEffect, React } from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";
import { Button } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import Searchbar from "./Searchbar";

export default function CalorieCalculator() {
  const [calories, setCalories] = useState(0)
  const [showSearchbar, setShowSearchbar] = useState(false)
  const [recipes, setRecipes] = useState([]);

  const route = useRoute()

  // Default value is an empty array, otherwise assigns the values from route.params
  const { newRecipe = {} } = route.params || {};

  const toggleSearchbar = () => {
    setShowSearchbar(!showSearchbar)
  }

  useEffect(() => {
    if (newRecipe && newRecipe.title) {
      // Adds the new recipe to the recipes state
      setRecipes(prevRecipes => [...prevRecipes, newRecipe]);
      // Sums calories to previous the previous value
      setCalories(prevCalories => prevCalories + newRecipe.calories)
    }
  }, [newRecipe]);
  
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
