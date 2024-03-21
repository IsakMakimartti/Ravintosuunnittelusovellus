
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image, Pressable, FlatList, ScrollView } from 'react-native';

export default function App() {
    const [inputText, setInput] = useState("")
    const [responsearray, setArray] = useState([undefined])
    return (
        <>
        <View style={styles.row}>
            <TextInput value={inputText} onChangeText={text => setInput(text)} style={styles.input} placeholder='Search...'></TextInput>
            <Pressable onPress={APIsearch} style={styles.press}>
                <Image style={styles.image} source={require('../assets/magnifying-glass-16.png')} />
            </Pressable>
        </View>
        <View style={styles.searchresults}>
        <ScrollView style={styles.scroll}>
        <Searchresults data={responsearray}/>
        </ScrollView>
        </View>
        </>

    );
    async function APIsearch(){
        console.log(responsearray)
        var response = ""; 
        url = "https://api.edamam.com/api/recipes/v2?type=public&q=" + inputText + "&app_id="+ process.env.app_id + "&app_key=" +process.env.app_KEY
        await fetch(url)
        .then(async res => response = await res.json())
        .catch(error => console.log(error))
        setArray(response)
        console.log(responsearray)
    }
    function Searchresults(props) {
        if(props.data.hits !== undefined){
        temparray = []; 
        props.data.hits.forEach((element, index) => {
        imageUrl = element.recipe.image  
        imgText = element.recipe.label  
        temparray.push(
        <View style={styles.SearchRow}>
            <Image id={index} source={{ uri: imageUrl }} style={styles.image} />
                <Text style={{paddingLeft: 20,height:"100%",width:"100%", alignContent:"center",justifyContent:"center", alignItems:"center", textAlignVertical: "center"}}>{imgText}</Text>
        </View>
        )
        });
        return temparray
        } else {
            return <></>
        }
    }
}

const styles = StyleSheet.create({
    SearchRow: {
        flex: 1,
        flexDirection: 'row',
        paddingBottom: 20,
        paddingTop: 20,
        width: "100%",
        textAlign: "center",
    },
    searchresults: {
        height: "50%",
        width: "100%"
    },
    scroll: {
        height: "50%",
        width: "100%"
    },
    press: {
        flexBasis: '20%',
        alignItems: 'flex-end'
    },
    row: {
        flexDirection: 'row',
        width: '100%',
        borderColor: '#000',
        borderWidth: 2,
    },
    input: {
        flexBasis: '80%',
        width: '80%',
        height: 50,
        fontSize: 20, 
    },
    image: {
        width: 50,
        height: 50,
    },
});
