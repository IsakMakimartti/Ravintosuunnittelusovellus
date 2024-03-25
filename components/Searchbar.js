
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image, Pressable, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { cuisineType } from "../data/random.json"
export default function App() {
    const [inputText, setInput] = useState("")
    const [responsearray, setArray] = useState([undefined])
    const [randomarray, setRanArray] = useState([undefined])
    return (
<>
        <View style={styles.row}>
            <TextInput value={inputText} onChangeText={text => setInput(text)} style={styles.input} placeholder='Search...'></TextInput>
            <Pressable onPress={APIsearch} style={styles.press}>
                <Image style={styles.image} source={require('../assets/magnifying-glass-16.png')} />
            </Pressable>
        </View>
        <View style={styles.buttoncontainer}>
            <Button onPress={() => Random()} labelStyle={{ fontSize: 18, textAlign: "center" }} style={styles.randombutton}>Give me ideas</Button>
        </View> 
        <ScrollView>
            <View style={styles.RandomResultContainer}>
                <RandomResultElement data={randomarray}/>  
            </View>    
            <ScrollView style={styles.scroll}>
        <View style={styles.searchresults}>
                <Searchresults data={responsearray}/>
        </View>
        </ScrollView>
        </ScrollView>
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
    async function Random() {
       var random = Math.floor(1 + Math.random()*(18-1))
       var cusine = cuisineType[random]
       var response = ""; 
       var url = "https://api.edamam.com/api/recipes/v2?type=public&" + "&app_id=" + process.env.app_id + "&app_key=+ " + process.env.app_KEY +"&cuisineType="+ cusine +"&random=true"
       console.log(url)
       await fetch(url)
       .then(async res => response = await res.json()) 
       .catch(error => console.log(error))
       var randomrecipe = Math.floor(1 + Math.random()*(20-1))
       setRanArray(response.hits[randomrecipe].recipe)
    }
    function RandomResultElement(props) {
        
        if(props.data.images !== undefined){
            temparray = []; 
            var image = props.data.images.REGULAR.url
            var text = props.data.label
            console.log(image)
            return (
                <Pressable style={styles.randompress} onPress={()=> console.log(props.data.label)}>
                    <View style={styles.randomcontainer}>
                        <Text style={styles.randomHeader}>{text}</Text>
                        <Image source={{ uri: image }} style={styles.Randomimageoffood}/>
                    </View>
                </Pressable>
            )
        }
    }
    function Searchresults(props) {
        if(props.data.hits !== undefined){
        temparray = []; 
        console.log(props.data.hits[1].recipe.images.REGULAR.url)
        props.data.hits.forEach((element, index) => {
        imageUrl = element.recipe.images.REGULAR.url
        imgText = element.recipe.label 

        temparray.push(
        <Pressable onPress={()=>console.log(element._links.self.href)}>
        <View style={styles.SearchRow}>
        <Image id={index} source={{ uri: imageUrl }} style={styles.imageoffood} />
        <Text style={{paddingLeft: 20,height:"80%",width:"80%", alignContent:"center",justifyContent:"center", alignItems:"center", textAlignVertical: "center"}}>{imgText}</Text>
        </View>
        </Pressable>
        )
        });
        return temparray
        } else {
            return <></>
        }
    }
}

const styles = StyleSheet.create({
    RandomResultContainer: {
    },
    randompress: {
     backgroundColor: "#ccc",
    },
    randomHeader: {
    fontSize: 20,
    },
    randomcontainer: {
        alignItems: "center",
        flex: 1,
        flexBasis: "10%",
        flexGrow: 0,
        flexDirection: "column",
        
    },
    buttoncontainer:{
    height: "15%"
    },
    randombutton: {
        backgroundColor: "#74ff00",
        height: 40,
        top: 30,
    },
    SearchRow: {
        borderColor: "#ccc",
        borderWidth: 1,
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
    imageoffood: {
        width: 100,
        height: 80,
    },
    Randomimageoffood: {
        width: 200,
        height: 160,
    }
});
