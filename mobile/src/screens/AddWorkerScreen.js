import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
// import * as LocalAuthentication from "expo-local-authentication"; // Simulated

export default function AddWorkerScreen() {
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [fingerprints, setFingerprints] = useState([]);

  // Simulate registering fingerprints (normally use device biometric APIs)
  const registerFingerprints = () => {
    setFingerprints(['FP1', 'FP2', 'FP3', 'FP4', 'FP5']); // Simulated
    alert('Fingerprints registered');
  };

  const handleSubmit = () => {
    // Call API to submit worker info...
    alert('Worker Registered');
  };

  return (
    <View>
      <TextInput placeholder="Worker Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Login" value={login} onChangeText={setLogin} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Register Fingerprints" onPress={registerFingerprints} />
      <Button title="Submit Worker" onPress={handleSubmit} />
      <Text>Fingerprints: {fingerprints.join(', ')}</Text>
    </View>
  );
}
