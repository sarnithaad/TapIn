import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';

export default function LoginScreen({ navigation }) {
  const [shopName, setShopName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Check for owner/worker credentials
    // Navigate to role selection if successful
    navigation.navigate('RoleSelect');
  };

  return (
    <View>
      <Text style={{ fontSize: 32, marginBottom: 16 }}>Welcome to TapIn</Text>
      <TextInput placeholder="Shop Name" value={shopName} onChangeText={setShopName} />
      <TextInput placeholder="Login" value={login} onChangeText={setLogin} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Login" onPress={handleLogin} />
      <Button title="New Shop? Register with TapIn" onPress={() => navigation.navigate('RegisterShop')} />
    </View>
  );
}
