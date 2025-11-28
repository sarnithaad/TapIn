import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { ownerLogin, workerLogin } from '../services/api';  // Add this import

export default function LoginScreen({ navigation }) {
  const [shopName, setShopName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Try owner login first (email format)
      if (login.includes('@')) {
        const response = await ownerLogin(login, password);
        Alert.alert('Success', 'Owner logged in');
        navigation.navigate('RoleSelect');
      } else {
        // Try worker login
        const response = await workerLogin(login, password);
        Alert.alert('Success', 'Worker logged in');
        navigation.navigate('RoleSelect');
      }
    } catch (error) {
      Alert.alert('Login Failed', error.response?.data?.message || 'Invalid credentials');
    }
  };

  // Rest of your JSX stays the same
  return (
    <View>
      <Text style={{ fontSize: 32, marginBottom: 16 }}>Welcome to TapIn</Text>
      <TextInput placeholder="Shop Name" value={shopName} onChangeText={setShopName} />
      <TextInput placeholder="Login/Email" value={login} onChangeText={setLogin} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Login" onPress={handleLogin} />
      <Button title="New Shop? Register with TapIn" onPress={() => navigation.navigate('RegisterShop')} />
    </View>
  );
}
