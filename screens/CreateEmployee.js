import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View,KeyboardAvoidingView,Modal,Alert } from 'react-native';
import {TextInput,Button} from "react-native-paper";
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'

const CreateEmployee = ({navigation,route})=>{

    const getDetails= (type)=>{
    if(route.params){
      switch(type){
          case "name":
              return route.params.name
          case "phone":
              return route.params.phone
           case "email":
                return route.params.email
            case "salary":
                return route.params.salary 
            case "picture":
                return route.params.picture
            case "position":
                return route.params.position                                      
      }
    }
    return ""
    }

    if(route.params){
        // console.log(route.params)
    }

    const updateData = () =>{
        fetch("https://native-employees-nodejs.herokuapp.com/update",{
            method:"post",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id:route.params._id,
                name,
                email,
                phone,
                salary,
                picture,
                position
            })
        }).then(res =>res.json())
        .then(data=>{
   
        })
        Alert.alert(`Employee is successful Updated`)
        navigation.navigate("Home")
    }
  const [name,setName]= useState(getDetails("name"));
  const [phone,setPhone]= useState(getDetails("phone"));
  const [email,setEmail]= useState(getDetails("email"));
  const [salary,setSalary]= useState(getDetails("salary"));
  const [position,setPosition]= useState(getDetails("position"));
  const [picture,setPicture]= useState(getDetails("picture"));
  const [modal,setModal]= useState(false);
  const [enableShift,setEnableShift] = useState(false)

const submitData =()=>{
     fetch("https://native-employees-nodejs.herokuapp.com/send-data",{
         method:"post",
         headers:{
             'Content-Type':'application/json'
         },
         body:JSON.stringify({
             name,
             email,
             phone,
             salary,
             picture,
             position
         })
     }).then(res =>res.json())
     .then(data=>{

     })
    //  setName("")
    //  setEmail("")
    //  setPhone("")
    //  setSalary("")
    //  setPicture("")
    //  setPosition("")
    Alert.alert(`Employee is successful added`)
    navigation.navigate("Home")


}


  const pickFromGallery = async ()=>{
  const {granted} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
   if(granted){
  let data = await ImagePicker.launchImageLibraryAsync({
       mediaTypes:ImagePicker.MediaTypeOptions.Images,
       allowsEditing:true,
       aspect:[1,1],
       quality:0.5
   })
   if(!data.cancelled){
    let newFile = {uri:data.uri,
    type:`test/${data.uri.split(".")[1]}`,
    name:`test.${data.uri.split(".")[1]}`}
   handleUpload(newFile) 
}
   }else{
   Alert.alert("You need to give us permission to your phone")
   }
  }

  const pickFromCamera = async ()=>{
    const {granted} = await Permissions.askAsync(Permissions.CAMERA)
     if(granted){
    let data = await ImagePicker.launchCameraAsync({
         mediaTypes:ImagePicker.MediaTypeOptions.Images,
         allowsEditing:true,
         aspect:[1,1],
         quality:0.5
     })
     if(!data.cancelled){
         let newFile = {uri:data.uri,
         type:`test/${data.uri.split(".")[1]}`,
         name:`test.${data.uri.split(".")[1]}`}
        handleUpload(newFile) 
     }
     }else{
     Alert.alert("You need to give us permission to your phone")
     }
    }

    const handleUpload = (image)=>{
        const data = new FormData()
        data.append('file',image)
        data.append('upload_preset','employeeApp')
        data.append("cloud_name","dtmddq4dw")

        fetch("https://api.cloudinary.com/v1_1/dtmddq4dw/image/upload",{
            method:"post",
            body:data,

        }).then(res=>res.json())
        .then(data=>{
            setPicture(data.url)
            setModal(false)
        }).catch(err=>{
            Alert.alert("Something went wrong")
        })
    }

    return(
        <KeyboardAvoidingView behavior="position" style={styles.root} enabled={enableShift}>
     <View >
        <TextInput 
        style={styles.inputStyle}
        label="Name"
        value={name}
        onFocus={()=>setEnableShift(false)}
        theme={theme}
        mode="outlined"
        onChangeText={text=>setName(text)}
        />
        <TextInput 
        style={styles.inputStyle}
        label="Email"
        onFocus={()=>setEnableShift(false)}
        value={email}
        theme={theme}
        mode="outlined"
        onChangeText={text=>setEmail(text)}
        
        />
        <TextInput 
        style={styles.inputStyle}
        label="Phone"
        value={phone}
        onFocus={()=>setEnableShift(false)}
        theme={theme}
        mode="outlined"
        keyboardType="number-pad"
        onChangeText={text=>setPhone(text)}
        />
     <TextInput 
        style={styles.inputStyle}
        label="Salary"
        value={salary}
        theme={theme}
        keyboardType="number-pad"
        onFocus={()=>setEnableShift(true)}
        mode="outlined"
        onChangeText={text=>setSalary(text)}
        />
        <TextInput 
        style={styles.inputStyle}
        label="Position"
        onFocus={()=>setEnableShift(true)}
        value={position}
        theme={theme}
        mode="outlined"
        onChangeText={text=>setPosition(text)}
        />
        <Button 
        icon={picture==""?"upload":"check"}
        style={styles.inputStyle}
         mode="contained"
         theme={theme}
         onPress={() => setModal(true)} 
        >
            Upload
        </Button>
        {route.params?
        <Button 
        icon="content-save"
        style={styles.inputStyle}
         mode="contained"
         theme={theme}
         onPress={() => updateData()} 
        >
            Update
        </Button>
        :
        <Button 
        icon="content-save"
        style={styles.inputStyle}
         mode="contained"
         theme={theme}
         onPress={() => submitData()} 
        >
            Save
        </Button>
        }
        <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        theme={theme}
        onRequestClose={()=>{
            setModal(false)
        }}
        >
       <View style={styles.modalView}>
           <View style={styles.modalButtonView}>
           <Button 
        icon="camera"
         mode="contained" 
         theme={theme}
         onPress={() => pickFromCamera()} 
        >
            Camera
        </Button>
        <Button 
        icon="image-area"
        mode="contained" 
        theme={theme}
        onPress={() => pickFromGallery()} 
        >
            Gallery
        </Button>
           </View>
       <Button 
        theme={theme}
        onPress={() => setModal(false)} 
        >
            Cancel
        </Button>
       </View>
        </Modal>
     </View>
     </KeyboardAvoidingView>

    )
}
const theme = {
    colors:{
        primary:"#006aff"
    }
}
const styles=StyleSheet.create({
    root:{
        flex:1,
   
    },
    inputStyle:{
        margin:5,
        color:"#006aff"

    },
    modalButtonView:{
        flexDirection:"row",
        justifyContent:"space-around",
        padding:10
    },
    modalView:{
        position: "absolute",
        bottom:2,
        width:"100%",
        backgroundColor:"#fff"
    }
})
export default CreateEmployee;