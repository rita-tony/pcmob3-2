import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import AddScreen from './screens/AddScreen';
import NotesStack from './screens/NotesStack';
import EditScreen from './screens/EditSceen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator mode="modal">
        <Stack.Screen 
          name="Notes Stack"
          component={NotesStack}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="Add Note"
          component={AddScreen}
        />
        <Stack.Screen 
          name="Edit Note"
          component={EditScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
