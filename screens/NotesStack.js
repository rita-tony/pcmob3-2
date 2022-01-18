import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import NotesScreen from './NotesScreen';

const InnerStack = createStackNavigator();

export default function NotesStack()
{
  return (
    <InnerStack.Navigator>
      <InnerStack.Screen
        name="Notes"
        component={NotesScreen}
        options={{
          headerTitle: "Notes App",
          headerTitleStyle: styles.headerTitleStyle,
          headerStyle: styles.headerStyle,
        }}
      />
    </InnerStack.Navigator>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
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
  
  });
  