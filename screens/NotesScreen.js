import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import * as SQLite from "expo-sqlite";
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const db = SQLite.openDatabase("notes.db");

export default function NotesScreen ({navigation, route})
{
  const [notes, setNotes] = useState([
//    {title: "Walk the cat", done: false, id: "0"},
//    {title: "go to ntuc", done: false, id: "1"},
  ]);

  // this function is to retrieve data from table and store it into array
  function refreshNotes() {
      db.transaction((tx) => {
          tx.executeSql (
              "SELECT * FROM notes ORDER BY done, id ASC",
              null,
              (txObj, {rows: { _array }}) => setNotes(_array),
              (txObj, error) => console.log("Error ", error)
          );
      });
  }

  //This use effect for create table if it is not exists
  useEffect ( () => {
      db.transaction((tx) => {
          tx.executeSql (
              `CREATE TABLE IF NOT EXISTS
              notes
              (id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT,
                details TEXT,
                done INT);`
          );
      },
      null,
      refreshNotes );
  }, []);
  

  //This use effect when Add Note button is clicked
  useEffect( () => {
    navigation.setOptions(
      {
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate("Add Note") }>
              <Entypo name="new-message" size={24} color="black" style={{ marginRight: 20 }} />
          </TouchableOpacity>
        ),
      }
      );
    });


    //This use effect for inserting / updating record into table
    useEffect( () => {
      if ((route.params?.idNote > 0) ) {
        db.transaction((tx) => {
            tx.executeSql("UPDATE notes SET title = ?, details = ? WHERE id = ?",[route.params.titleNote,route.params.detailsNote,route.params.idNote]);
        },
        null,
        refreshNotes
        );
      }
      else if ((route.params?.idNote == 0) && (route.params?.titleNote)) {
          db.transaction((tx) => {
              tx.executeSql("INSERT INTO notes (done, title, details) VALUES (0, ?, ?)",[route.params.titleNote,route.params.detailsNote]);
          },
          null,
          refreshNotes
          );
      }
    }, [route.params?.titleNote, route.params?.detailsNote, route.params?.idNote]);


    //This function will be called when Delete button is clicked
    function deleteNote({item}) {
        db.transaction((tx) => {
            tx.executeSql("DELETE FROM notes WHERE id = ?", [item.id,]);
        },
        null,
        refreshNotes
        );
    }

    //This function will be called when checkbox button is clicked
    function updateIsDone({item}) {
      db.transaction((tx) => {
        tx.executeSql("UPDATE notes SET done = (CASE WHEN done = 1 THEN 0 ELSE 1 END) WHERE id = ?", [item.id,]);
      },
      null,
      refreshNotes
      );
    }
   
    function renderItem({ item }) {
      return (
        <View
        style={(item.done) == 0 ? styles.listItemsStyle : [styles.listItemsStyle, {backgroundColor: 'lightgray'}]}
      >
        <Text style={(item.done) == 0 ? styles.listItemTextStyle : styles.listItemTextDoneStyle}>{item.title}</Text>

        <View style={styles.buttonsStyle}>
          {/* Edit button to edit note */}
          <TouchableOpacity style={styles.buttonStyle}
              onPress={ () => navigation.navigate("Edit Note", {...item}) }
          >
              <MaterialCommunityIcons name="file-document-edit-outline" size={24} color="black" />
          </TouchableOpacity>

          {/* Checkbox button to update IsDone. Use this method is easier instead of use other CheckBox component from @react-native-community */}
          <TouchableOpacity style={styles.buttonStyle}
              onPress={ () => updateIsDone({item})}
          >
              <MaterialCommunityIcons name = {(item.done) == 0 ? "checkbox-blank-outline" : "checkbox-marked-outline"} size={24} color="black" />
          </TouchableOpacity>

          {/* Delete button to delete note */}
          <TouchableOpacity style={styles.buttonStyle}
              onPress={ () => deleteNote({item})}
          >
              <MaterialCommunityIcons name="delete-forever-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
 

  return (
    <View style={styles.container}>
     <FlatList
       style={{ width: "100%" }}
       data={notes}
       renderItem={renderItem}
       keyExtractor={notes.id}
     />
    </View>
  
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'lightgoldenrodyellow',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    headerTitleStyle: {
      fontWeight: "bold",
      fontSize: 30,
    },
  
    headerStyle: {
      height: 120,
      backgroundColor: "yellow",
      borderBottomColor: "#ccc",
      borderBottomWidth: 1,
    },
  
    dismissStyle: {
      color: "orange",
    },

    listItemsStyle: {
      padding: 10,
      paddingTop: 20,
      paddingBottom: 20,
      borderBottomColor: "#ccc",
      borderBottomWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    listItemTextStyle: {
        textAlign: 'left',
        fontSize: 16,
    },

    listItemTextDoneStyle: {
      textAlign: 'left',
      fontSize: 16,
      color: "grey",
      textDecorationLine: "line-through",
  },

    buttonsStyle: {
      flexDirection: 'row',
      alignItems: 'flex-end',
    },

    buttonStyle: {
      marginLeft: 15,
    }
  
  });
  