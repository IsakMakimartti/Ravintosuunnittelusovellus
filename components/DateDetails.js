import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DateDetails = ({ route, navigation }) => {
    let parsedDate;

    try {
        const { date } = route.params || {};
        parsedDate = date ? new Date(date) : new Date();
    } catch (error) {
        console.error('Error parsing date:', error);
        parsedDate = new Date();
    }

    const [savedRecipes, setSavedRecipes] = useState([]);

    useEffect(() => {
        const fetchSavedRecipes = async () => {
            try {
                const savedRecipesJSON = await AsyncStorage.getItem('savedRecipes');
                if (savedRecipesJSON) {
                    const savedRecipes = JSON.parse(savedRecipesJSON);
                    const recipesForDate = savedRecipes.filter(recipe => recipe.recipeDate === parsedDate.toDateString());
                    setSavedRecipes(recipesForDate);
                }
            } catch (error) {
                console.error('Error fetching saved recipes:', error);
            }
        };

        fetchSavedRecipes();
    }, []);

    const navigateToRecipe = (id) => {
        navigation.navigate('Recipe', { id });
    };

    const removeRecipe = async (recipeId, recipeDate) => {
        console.log("Removing recipe:", recipeId, "for date:", recipeDate); // Check if function is triggered and parameters are correct
        Alert.alert(
            'Confirm',
            'Are you sure you want to remove this recipe?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: async () => {
                        try {
                            const savedRecipesJSON = await AsyncStorage.getItem('savedRecipes');
                            console.log("Saved recipes JSON:", savedRecipesJSON); // Check if saved recipes are retrieved
                            if (savedRecipesJSON) {
                                let savedRecipes = JSON.parse(savedRecipesJSON);
                                console.log("Saved recipes before removal:", savedRecipes); // Check saved recipes before removal
                                // Filter out the recipe to be removed
                                savedRecipes = savedRecipes.filter(recipe => !(recipe.recipeId === recipeId && recipe.recipeDate === recipeDate));
                                console.log("Saved recipes after removal:", savedRecipes); // Check saved recipes after removal
                                // Update AsyncStorage with the new saved recipes
                                await AsyncStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
                                console.log("Recipes removed successfully.");
                                setSavedRecipes(savedRecipes);
                                navigation.navigate('Calendar');
                            }
                        } catch (error) {
                            console.error('Error removing recipe:', error);
                            Alert.alert('Error', 'Failed to remove recipe');
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };

    useEffect(() => {
        navigation.setOptions({ title: parsedDate.toDateString(), headerTitleStyle: { fontSize: 30 } });
    }, [parsedDate, navigation]);

    return (
        <View style={styles.container}>
            {savedRecipes.length > 0 ? (
                <>
                    <Text style={styles.sectionTitle}>Your saved recipes for {parsedDate.toLocaleDateString('en-US', { weekday: 'long' })} {parsedDate.getDate()}:</Text>
                    {savedRecipes.map((recipe, index) => (
                        <View key={index} style={styles.recipeItem}>
                            <TouchableOpacity onPress={() => navigateToRecipe(recipe.recipeId)}>
                                <Text style={styles.recipeTitle}>{recipe.recipeTitle}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => removeRecipe(recipe.recipeId, parsedDate.toDateString())} style={styles.removeButton}>
                                <Text style={styles.removeButtonText}>X</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </>
            ) : (
                <Text style={styles.noRecipesText}>No recipes saved for {parsedDate.toLocaleDateString('en-US', { weekday: 'long' })} {parsedDate.getDate()}.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    sectionTitle: {
        fontSize: 20,
        marginBottom: 20,
    },
    recipeItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        marginBottom: 10,
    },
    recipeTitle: {
        fontSize: 20,
        textDecorationLine: 'underline',
    },
    removeButton: {
        backgroundColor: 'red',
        borderRadius: 10,
        padding: 5,
    },
    removeButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    noRecipesText: {
        fontSize: 20,
        fontStyle: 'italic',
    },
});

export default DateDetails;