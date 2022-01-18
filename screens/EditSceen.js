import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function EditScreen ({ navigation, route}) {
    const idNote = route.params.id;
    const [titleNote, setTitleNote] = useState(route.params.title);
    const [detailsNote, setDetailsNote] = useState(route.params.details);

    return (
      <View style={styles.container}>
          <Text style={styles.labelStyle}>Edit your todo ID # {idNote}</Text>
          <TextInput
            style={styles.textInputStyle}
            maxLength={40}
            value={titleNote}
            onChangeText={(newTitleNote) => setTitleNote(newTitleNote)}
            >            
          </TextInput>

          <TextInput
            style={styles.textInputStyle}
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
                  <Text style={styles.buttonTextStyle}>Update</Text>
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