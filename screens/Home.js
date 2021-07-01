import React,{useState,useEffect,useContext} from 'react';
import { StyleSheet, Text, View,Image,FlatList,ActivityIndicator } from 'react-native';
import {Card,FAB} from 'react-native-paper'
import {useSelector,useDispatch} from "react-redux"
import {MyContext} from '../App'

function Home({navigation}) {

    // const data = [
    //     {_id:"1",name:"Jessy Bandya",position:"Junior Software Dev",email:"jessy.bandya5@gmail.com",phone:"0746749307",salary:"3000",picture:"https://dvcrie.uonbi.ac.ke/sites/dvcrie.uonbi.ac.ke/files/2020-07/University-Of-NairobiTowers-.jpg"},
    //     {_id:"2",name:"Jessy1 Bandya1",position:"Web Dev",email:"jessy.bandya1@gmail.com",phone:"0717008977",salary:"2000",picture:"https://www.nairobibusinessmonthly.com/wp-content/uploads/2018/01/UON-tower.jpg"},
    //     {_id:"3",name:"Jessy2 Bandya2",position:"Android Dev",email:"jessy.bandya2@gmail.com",phone:"0704916410",salary:"1000",picture:"https://www.nairobibusinessmonthly.com/wp-content/uploads/2018/01/UON-tower.jpg"},

    //     ]

    // const [data,setData]= useState([])
    // const [loading,setLoading] = useState(true)
    // const dispatch = useDispatch()
    // const {data,loading} = useSelector((state)=>{
    //    return state
    // })
   const {state,dispatch} = useContext(MyContext)
   const {data,loading} = state
    const fetchData = ()=>{
        fetch("https://native-employees-nodejs.herokuapp.com/")
        .then(res=>res.json())
        .then(results=>{
        // setData(result)
        // setLoading(false)
        dispatch({type:"ADD_DATA",payload:results})
        dispatch({type:"SET_LOADING",payload:false})

        })
    }

    useEffect(()=>{
    fetchData()

    },[])
    const renderList = ((item)=>{
     return(
        <Card style={styles.myCard}
        onPress={()=>navigation.navigate("Profile",{item})}
        >
        <View style={styles.cardView}>
        <Image
     style={{width:60,height:60,borderRadius:30}} 
     source={{uri:item.picture}}
     />
     <View style={{marginLeft:10}}>
     <Text style={styles.text}>{item.name}</Text>
     <Text style={{color:"#006aff"}}>{item.position}</Text>
     </View>
 
        </View>
 
 </Card>
     )
    })
    return(
        <View style={{flex:1}}>
            {loading?
            <ActivityIndicator size="large" color="#0000ff" />
            :
            <FlatList 
            data={data}
            renderItem={({item})=>{
               return renderList(item)
            }}
            keyExtractor={item=>item._id}
            onRefresh={()=> fetchData()}
            refreshing={loading}
            />
            }   
         <FAB 
         onPress={()=>navigation.navigate("Add")}
         style={styles.fab}
         small={false}
         icon="plus"
         theme={{colors:{accent:"#006aff"}}}
         />
        </View>
    
    )
    

}

const styles = StyleSheet.create({

    myCard:{
        margin:5,
    },
    cardView:{
        flexDirection:"row",
        padding:6,
    },
    text:{
        fontSize:22,
        color:"#006aff"
    },
    fab:{
        position: "absolute",
        margin:16,
        right:0,
        bottom:0,
    }
})
export default Home;