import { useState, useEffect, React } from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView, Image } from "react-native";
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
      setShowSearchbar(!showSearchbar)
    }
  }, [newRecipe]);

  const renderRecipeItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.rowContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.image }} // Assuming you have a URL for the image
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      </View>
    </View>
  )

  const header = "Total calories: " + calories.toFixed(0)

  return (
    <SafeAreaView style={styles.container}>
      {!showSearchbar && (
        <>
          <View style={styles.headerItem}>
            <Text style={styles.headerTitle}>{header}</Text>
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
  headerTitle: {
    fontSize: 32,
    textAlign: 'center',
    color: '#000000'
  },
  title: {
    fontSize: 24,
    textAlign: 'left',
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
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  imageContainer: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  }
});
