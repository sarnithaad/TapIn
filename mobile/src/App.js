import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import RoleSelectScreen from './screens/RoleSelectScreen';
import OwnerHome from './screens/OwnerHome';
import WorkerHome from './screens/WorkerHome';
import AttendanceScreen from './screens/AttendanceScreen';
import AddWorkerScreen from './screens/AddWorkerScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="RegisterShop" component={RegisterScreen} />
        <Stack.Screen name="RoleSelect" component={RoleSelectScreen} />
        <Stack.Screen name="OwnerHome" component={OwnerHome} />
        <Stack.Screen name="WorkerHome" component={WorkerHome} />
        <Stack.Screen name="Attendance" component={AttendanceScreen} />
        <Stack.Screen name="AddWorker" component={AddWorkerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
