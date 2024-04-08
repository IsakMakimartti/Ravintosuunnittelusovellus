import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Calendar() {

    const [currentDate, setCurrentDate] = useState(new Date());

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

    const renderCalendar = () => {
        const days = [];
        let startDate = new Date(currentDate);
        startDate.setDate(startDate.getDate() - startDate.getDay() + 1);

        for (let i = 0; i < 7; i++) {
            const day = new Date(startDate);
            day.setDate(startDate.getDate() + i);
            days.push(
                <TouchableOpacity key={i} style={styles.dayButton}>
                    <Text style={styles.dayOfWeek}>{day.toLocaleDateString('en-US', { weekday: 'short' })}</Text>
                    <Text style={styles.dayOfMonth}>{day.getDate()}</Text>
                    <Text style={styles.month}>{day.toLocaleDateString('en-US', { month: 'long' })}</Text>
                </TouchableOpacity>
            );
        }

        return (
            <View style={{ flexDirection: 'column', flex: 1 }}>
                {days}
            </View>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
                <TouchableOpacity onPress={goToPreviousWeek}>
                    <Icon name="keyboard-arrow-left" size={30} />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, marginRight: 5 }}>{currentDate.getFullYear()}</Text>
                </View>
                <TouchableOpacity onPress={goToNextWeek}>
                    <Icon name="keyboard-arrow-right" size={30} />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
                {renderCalendar()}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    dayButton: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'gray',
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
    },
});