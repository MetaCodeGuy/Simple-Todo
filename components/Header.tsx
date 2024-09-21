import { Image,TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {clearData} from '@/hooks/useStorage'

const Header = () => {
    return (
        
        <TouchableOpacity
         style={styles.header}>
            <Image
                source={require("@/assets/images/todo-logo.png")}
                style={styles.image} 
            />
        </TouchableOpacity>
    )
}

export default Header

const styles = StyleSheet.create({
    header: {
        paddingHorizontal:16,
        paddingVertical:24
    },
    image: {
        width: 60,
        marginLeft:'auto', 
        height: 60, 
    }
})
