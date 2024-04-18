import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import Searchbar from './Searchbar'
import { getDocs,firestore,collection,addDoc,userrecipes, query, onSnapshot,where } from '../firebase/Config';
import { QuerySnapshot } from 'firebase/firestore';
export default function App() {
  return (
     <>
      <Searchbar/>
      </>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
