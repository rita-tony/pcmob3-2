import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function AddScreen ({ navigation, route}) {
    const idNote = 0;
    const [titleNote, setTitleNote] = useState("");
    const [detailsNote, setDetailsNote] = useState("");

    return (
      <View style={styles.container}>
          <Text style={styles.labelStyle}>Add your todo</Text>
          <TextInput
            style={styles.textInputStyle}
            placeholder='Please enter your todo title note here.'
            maxLength={40}
            value={titleNote}
            onChangeText={(newTitleNote) => setTitleNote(newTitleNote)}
            >            
          </TextInput>

          <TextInput
            style={styles.textInputStyle}
            placeholder='Please enter your todo details note here.'
            maxLength={50}
            value={detailsNote}
            onChangeText={(newDetailsNote) => setDetailsNote(newDetailsNote)}
            >            
          </TextInput>

          <View style={styles.buttonsStyle}>
              <TouchableOpacity
                onPress = { () => navigation.navigate("Notes", {titleNote, detailsNote, idNote}) }
                style={[styles.buttonStyle, styles.submitButtonStyle]}
              >
                  <Text style={styles.buttonTextStyle}>Submit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={ () => navigation.goBack()}
                style={[styles.buttonStyle, styles.cancelButtonStyle]}
              >
                  <Text style={styles.buttonTextStyle}>Cancel</Text>
              </TouchableOpacity>
          </View>
      </View>
    );
  }

  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    
    dismissStyle: {
      color: "orange",
    },

    labelStyle:{
        fontSize: 24,
        fontWeight: "bold",
    },

    textInputStyle: {
        margin: 20,
        borderWidth: 1,
        width:'80%',
        padding: 10,
        borderColor: '#ccc'
    },

    buttonsStyle: {
        flexDirection: 'row',
    },

    buttonStyle: {
        padding: 10,
        margin: 10,
        backgroundColor:'green',
    },

    submitButtonStyle: {
        backgroundColor: 'orange',
    },

    cancelButtonStyle: {
        backgroundColor: 'red',
    },

    buttonTextStyle: {
        fontWeight: 'bold',
        color: 'white',
    },
  
  });