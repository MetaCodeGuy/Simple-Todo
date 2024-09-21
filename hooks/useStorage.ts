// build the app be with asyncstorage 
import AsyncStorage from "@react-native-async-storage/async-storage"

export const getData = async (query:string)=>{
    AsyncStorage.getItem(query).then((val)=>{
        let value = JSON.parse(val);
        console.log('from use sotrage : ',value)
        return value;
    })
}

export const putData = async (query:string,data)=>{
    const jsonData = JSON.stringify(data);
    AsyncStorage.setItem(query,jsonData).then(()=>{console.log('data added')})
}

export const clearData = async ()=>AsyncStorage.clear();
