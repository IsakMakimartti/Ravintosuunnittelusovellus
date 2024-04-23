import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Dimensions, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Calendar({ navigation }) {

    const [currentDate, setCurrentDate] = useState(new Date());
    const [recipesForDays, setRecipesForDays] = useState({});
    const route = useRoute()

    useEffect(() => {
        if (!route.params) {
            return;
        }

        const { recipeId, recipeDate, recipeTitle } = route.params;

        if (recipeId && recipeDate) {
            saveRecipe(recipeId, recipeDate, recipeTitle);
        }
    }, []);

    useEffect(() => {
        fetchRecipesForWeek(currentDate);
    }, [currentDate]);

    useFocusEffect(
        React.useCallback(() => {
            fetchRecipesForWeek(currentDate);
        }, [currentDate])
    );


    const saveRecipe = async (recipeId, recipeDate, recipeTitle) => {
        try {

            let savedRecipesJSON = await AsyncStorage.getItem('savedRecipes');

            let savedRecipes = savedRecipesJSON ? JSON.parse(savedRecipesJSON) : [];
            if (!Array.isArray(savedRecipes)) {
                savedRecipes = [];
            }

            savedRecipes.push({ recipeId, recipeDate, recipeTitle });

            await AsyncStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));

            console.log('Saved recipe:', recipeId, 'for date:', recipeDate, 'with the title:', recipeTitle);
            Alert.alert('', 'Recipe saved successfully');
            fetchRecipesForWeek(currentDate);
        } catch (error) {
            console.error('Error saving recipe:', error);
        }
    };

    
    //AsyncStoragen tyhjentäminen testaamista varten
    const clearAsyncStorage = async () => {
        try {
            await AsyncStorage.clear();
            console.log('AsyncStorage cleared successfully.');
        } catch (error) {
            console.error('Error clearing AsyncStorage:', error);
        }
    };

    const goToPreviousWeek = () => {
        const previousWeek = new Date(currentDate);
        previousWeek.setDate(previousWeek.getDate() - 7);
        setCurrentDate(previousWeek);
    };

    const goToNextWeek = () => {
        const nextWeek = new Date(currentDate);
        nextWeek.setDate(nextWeek.getDate() + 7);
        setCurrentDate(nextWeek);
    };

    const handleDatePress = async (day) => {

        const recipesForClickedDay = await fetchRecipesForDay(day);

        navigation.navigate('DateDetails', { date: day.toDateString(), recipes: recipesForClickedDay });
    };

    const fetchRecipesForDay = async (day) => {
        try {
            const savedRecipesJSON = await AsyncStorage.getItem('savedRecipes');
            if (savedRecipesJSON) {
                const savedRecipes = JSON.parse(savedRecipesJSON);

                const recipesForDate = savedRecipes.filter(recipe => recipe.recipeDate === day.toDateString());
                return recipesForDate;
            }
            return [];
        } catch (error) {
            console.error('Error fetching recipes for day:', error);
            throw error;
        }
    };

    const fetchRecipesForWeek = async (startDate) => {
        try {
            const recipesForDays = {};
            const startDay = new Date(startDate);

            const diff = startDay.getDate() - startDay.getDay() + (startDay.getDay() === 0 ? -6 : 1);
            startDay.setDate(diff);

            for (let i = 0; i < 7; i++) {
                const currentDate = new Date(startDay);
                currentDate.setDate(startDay.getDate() + i);
                const recipesForDay = await fetchRecipesForDay(currentDate);
                recipesForDays[currentDate.toDateString()] = recipesForDay;
            }
            setRecipesForDays(recipesForDays);
        } catch (error) {
            console.error('Error fetching recipes for week:', error);
        }
    };


    const renderDayItem = ({ item, index }) => {
        const { day, recipesForDay } = item;

        const isLastItem = index === 6;
    
        return (
            <TouchableOpacity
                style={[
                    styles.dayButton,
                    isLastItem && styles.lastDayButton
                ]}
                onPress={() => handleDatePress(day)}
            >
                <Text style={styles.dayOfWeek}>{day.toLocaleDateString('en-US', { weekday: 'short' })}</Text>
                <Text style={styles.dayOfMonth}>{day.getDate()}</Text>
                <Text style={styles.month}>{day.toLocaleDateString('en-US', { month: 'long' })}</Text>
                {recipesForDay.map((recipe, index) => (
                    <Text key={index} style={{ fontSize: 16 }}>{recipe.recipeTitle}</Text>
                ))}
            </TouchableOpacity>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
                <TouchableOpacity onPress={goToPreviousWeek}>
                    <Icon name="keyboard-arrow-left" size={30} />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 25, marginRight: 5 }}>{currentDate.getFullYear()}</Text>
                </View>
                <TouchableOpacity onPress={goToNextWeek}>
                    <Icon name="keyboard-arrow-right" size={30} />
                </TouchableOpacity>
            </View>
            <FlatList
    data={Array.from({ length: 7 }, (_, i) => {
        const day = new Date(currentDate);
        day.setDate(currentDate.getDate() - currentDate.getDay() + 1 + i);
        return { day, recipesForDay: recipesForDays[day.toDateString()] || [] };
    })}
    renderItem={renderDayItem}
    keyExtractor={(item, index) => index.toString()}
    contentContainerStyle={{ flexGrow: 1 }}
/>
        </View>
    );
};

const styles = StyleSheet.create({
    dayButton: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderRightWidth: 3,
        borderLeftWidth: 3,
        borderTopWidth: 3,
        borderColor: 'grey',
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: "#e2f6be",
        
    },
    dayOfMonth: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    month: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    dayOfWeek: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    lastDayButton: {
        borderBottomWidth: 3,
    },
});