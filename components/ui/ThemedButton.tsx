import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';
 import { useThemeColor } from '@/hooks/useThemeColor';
 

const ThemedButton = ({ light,dark,...props }) => {
      const themecolor = useThemeColor({ light, dark }, 'background');
      const bg = themecolor=="#151718"?"white":"#151718"
    return (
        <TouchableOpacity onPress={props.onPress}>
        <ThemedView style={[props.style,{backgroundColor:bg},styles.button ]}>
        <ThemedText  style={[styles.title,{color:themecolor}]} type="default">
        {props.title}   
        </ThemedText>
        </ThemedView>
        </TouchableOpacity>
    )
}

export default ThemedButton;

const styles = StyleSheet.create({
    button: {
        padding: 16,
        borderRadius: 8,
        margin:'auto',
        marginHorizontal: 8,
    },
    title: {
                 textAlign:'center'
         
    }
})

