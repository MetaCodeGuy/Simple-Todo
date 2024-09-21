import Checkbox from 'expo-checkbox';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ThemedCheckBox({value,HandleUpdate}) {

  return (
    <View style={styles.container}>

      <Checkbox
       style={styles.checkbox} 
      value={value}
      color={"black"}
       onValueChange={HandleUpdate}
        />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
     
  }, 
  checkbox: {
    margin: 8,
  },
});
