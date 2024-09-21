import { StyleSheet, Text, TouchableOpacity, View, ViewProps } from 'react-native'
import React from 'react'
import { ThemedView } from '../ThemedView'
import { Ionicons } from '@expo/vector-icons'
import { useThemeColor } from '@/hooks/useThemeColor'


export type FloatingButtonProps = ViewProps & {
    lightColor?: string;
    darkColor?: string;
    onPress:any
};


const FloatingButton = ({ style, lightColor, darkColor,...props }: FloatingButtonProps) => {
    const bgcolor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
   
    return (
        <TouchableOpacity style={styles.floatingBtn} onPress={props.onPress}>
            <ThemedView style={[styles.floatingBtnView,
            {backgroundColor:bgcolor=="#151718"?"white":'#151718'}
            ]}>
                <Ionicons name="add" color={bgcolor=="#151718"?'#151718':'white'} size={28}/>
            </ThemedView>
        </TouchableOpacity>
    )
}

export default FloatingButton

const styles = StyleSheet.create({
    floatingBtn: {
        padding: 16,
        position:'absolute',
        bottom:20,
        right:20, 

        borderRadius: 50, 
        
    },floatingBtnView:{
        padding:16,
                elevation:5, 
        borderRadius:50
    }
})
