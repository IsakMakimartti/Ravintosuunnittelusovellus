import { Text, View, TextInput, StyleSheet, Pressable, Image, ScrollView,Modal } from 'react-native';
import { useState } from 'react';
import IngredientAdder from "./IngredientAdder"
import { firestore,collection,addDoc,userrecipes, query, onSnapshot } from '../firebase/Config';
import AlertModal from './Alert'
export default function Recipebuilder() {
    const [IngredientJsonArray, setJsonArray] = useState([])
    const [recipeName, setName] = useState("")
    const [username, setUsername] = useState("")
    const [recipeInstructions, setInstructions] = useState("")
    const [key, setKey] = useState(Math.random());
    const [modal, setModal] = useState(false)
    const [accepeted, setAccepted] = useState(true)
    const [alert, setalert] = useState(false)
    handlePress = (array) => {
        console.log(array)
        setJsonArray(array)
        IngredientJsonArray.forEach((value, index)  => {
            console.log(index+1)
            console.log(value.ingredient)
        })
    }
    handleFinnish = async() => {
        capitalizeLetter = (string) => {
            if(string !== string.toLowerCase){
            return string.toLowerCase()   
            } else {
            var capitalletter = string.charAt(0).toUppercase()
            var capital = capitalletter + string.slice(1)
            return capital
            }
         }
     if(recipeInstructions.length>1 && recipeName.length>1 && IngredientJsonArray.length>0){
        setModal(false)
     var keywordarray = []
     keywordarray = keywordarray.concat(recipeName.split(" "))
     IngredientJsonArray.forEach(data => {
        keywordarray.push(data.ingredient.name)
        keywordarray.push(capitalizeLetter(data.ingredient.name))
     }) 
     keywordarray.push(capitalizeLetter(recipeName))
     keywordarray.push(username)
     keywordarray.push(capitalizeLetter(username))
     setName("")
     setUsername("")
     setInstructions("")
     setJsonArray([])
     setKey(Math.random())
     const save = async() => {
        const docRef = await addDoc(collection(firestore, userrecipes),{
          username: username,
          name: recipeName,
          ingredients: IngredientJsonArray,
          instructions: recipeInstructions,
          keywords: keywordarray,
        }).catch(error => console.log(error))
        console.log('Message saved')
      }
      await save()
      setalert(!alert)
      setTimeout(() => {
          setalert(false)
      }, 4000)
    } else {
      setAccepted(false)
      setTimeout(() => setModal(false) + setAccepted(true), 4000)
    }
    
    }
    
    return (
        <ScrollView>
        <View style={styles.container}>
            <View style={styles.padding}>
                <View style={styles.inputcontainer}>
                    <TextInput onChangeText={text => setUsername(text)} style={styles.inputstyle} value={username} placeholder='Username here!'></TextInput>
                    <TextInput onChangeText={text => setName(text)} style={styles.inputstyle} value={recipeName} placeholder='Recipe name here!'></TextInput>
                </View>
            </View>
            <View style={styles.padding}>
                <IngredientAdder functioncall={handlePress} key={key}/>
            </View>
            { alert ? <AlertModal alertstate={alert} alert={"Thank you, the recipe was recieved!"}/> : <></>
            }
            <View style={styles.padding}>
                <View style={styles.instructions}>
                    <TextInput onChangeText={text => setInstructions(text)} style={styles.instructionsinput} value={recipeInstructions} numberOfLines={4} multiline={true} allowFontScaling={true} placeholder='Write instructions here!'></TextInput>
                </View>
            </View>
            <View style={styles.addedcontainers}>
                <Pressable style={styles.pressable} onPress={() => setModal(!modal)}>
                    <Text>Finnish Recipe</Text>
                </Pressable>
                <Modal visible={modal} onRequestClose={() => setModal(!modal)} transparent={true} animationType={"slide"}>
                    <View style={styles.modal}>
                        { accepeted ? 
                        <View style={styles.query}>
                            <Text style={{fontSize: 30, padding: 20}}>Complete Recipe?</Text> 
                            <View style={styles.querybuttons}>
                                <Pressable onPress={() => handleFinnish()} style={{padding: 5, backgroundColor: "#7CFC00", alignItems:"center"}}>
                                    <Text style={{fontSize: 20}}>Accept</Text>
                                </Pressable>
                                <Pressable style={{padding: 5, backgroundColor: "#FF5733", alignItems:"center"}}>
                                    <Text onPress={() => setModal(!modal)} style={{fontSize: 20}}>Cancel</Text>
                                </Pressable>
                            </View>
                        </View>
                        : <View style={styles.query}><Text style={{fontSize: 20, padding: 40, color: "#FF0000"}}>Please check that all the fields contain something!</Text></View>
}
                    </View>
                </Modal>
            </View>
        </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    querybuttons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "60%",
    },
    query: {
        alignItems: "center",
        backgroundColor: "#c5ee7d",
        width: "100%"
    },
    modal: {
    flex: 1, 
    justifyContent: "center",
    width: "100%",
    alignItems: "center"
    },
    container: {
    flex: 1,
    },
    padding: {
        paddingBottom: 20,
    },
    inputcontainer: {
        width: "100%",
        borderColor: "#000000",
        borderWidth: 0.5,
    },
    instructionsinput: {
        flex: 1,
        flexWrap: "wrap",
        paddingBottom: 20,
        paddingTop: 20,
        textAlign: "center",
        width: "100%",
        borderColor: "#000000",
        borderWidth: 0.5,
    },
    instructions: {
        width: "100%",
    },
    pressable: {
        width: "40%",
        alignItems: "center",
    },
    addedcontainers: {
        backgroundColor: "#c5ee7d",
        borderRadius: 200,
        width: "100%",
        alignItems: "center",
        paddingBottom: 10,
        paddingTop: 10,
        borderColor: "#000000",
        borderWidth: 0.5,
    },
    inputstyle: {
        paddingBottom: 20,
        paddingTop: 20,
        fontSize: 30,
        textAlign: "center", 
        borderWidth: 0.3,
    },
    image: {
        width: 50,
        height: 50,
    },
});
