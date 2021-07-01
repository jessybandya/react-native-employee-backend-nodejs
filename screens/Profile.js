import React from 'react';
import { StyleSheet, Text, View,Image,Linking,Platform, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Title,Card,Button } from 'react-native-paper';
import {MaterialIcons,Entypo} from '@expo/vector-icons'

const Profile = (props) =>{
     const {_id,picture,phone,salary,email,name,position} = props.route.params.item

     const deleteEmployee= ()=>{
      fetch("https://native-employees-nodejs.herokuapp.com/delete",{
        method:"post",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          id:_id
        })
      })
      .then(res=>res.json())
      .then(deletedEmp=>{
        // Alert.alert(`${deletedEmp.name} deleted`)

      })
             Alert.alert(`Employee has been successful fired`)
            props.navigation.navigate("Home")
    }
   const openDial=()=>{
     if(Platform.OS === "android"){
       Linking.openURL(`tel:${phone}`)
     }else{
     Linking.openURL(`telprompt:${phone}`)
     }
   }
    return(
     <View style={styles.root}>
         <LinearGradient
         colors={["#0033ff","#6bc1ff"]}
         style={{height:"20%"}}
          />
          <View style={{alignItems:"center"}}>
          <Image
          style={{width:140,height:140,borderRadius:70,marginTop:-50}}
          source={{uri:picture}}

          />
          </View>
          <View style={{alignItems:"center",margin:15,color:"#006aff"}}>
             <Title style={{color:"#006aff"}}>{name}</Title>
             <Text style={{fontSize:18,color:"#006aff"}}>{position}</Text>
          </View>
      <Card style={styles.myCard} onPress={()=>{
          Linking.openURL(`mailto:${email}`)
      }}>
        <View style={styles.cardContent}>
         <MaterialIcons name="email" size={32} color="#006aff"/>
         <Text style={styles.myText}>{email}</Text>

        </View>
      </Card>
      <Card style={styles.myCard} onPress={()=> openDial()}>
        <View style={styles.cardContent}>
         <Entypo name="phone" size={32} color="#006aff"/>
         <Text style={styles.myText}>{phone}</Text>

        </View>
      </Card>
      <Card style={styles.myCard}>
        <View style={styles.cardContent}>
         <MaterialIcons name="attach-money" size={32} color="#006aff"/>
         <Text style={styles.myText}>{salary}</Text>

        </View>
      </Card>
      <View style={{flexDirection:"row",justifyContent:"space-between",padding:10}}>
      <Button 
        icon="account-edit"
         mode="contained"
         theme={theme}
         onPress={() => 
          {props.navigation.navigate("Add",{_id,picture,phone,salary,email,name,position})}
        } 
        >
            Edit
        </Button>
        <Button 
        icon="delete"
         mode="contained"
         theme={theme}
         onPress={() => deleteEmployee()} 
        >
            Fire
        </Button>
      </View>
     </View>
    )
}

const theme = {
    colors:{
        primary:"#006aff"
    }
}
const styles = StyleSheet.create({
    root:{
        flex:1
    },
    myCard:{
        margin:3
    },
    cardContent:{
        flexDirection:"row",
        padding:8
    },
    myText:{
        fontSize:18,
        marginTop:3,
        marginLeft: 5,
        color:"#006aff"
    }
})
export default Profile