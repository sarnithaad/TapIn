import React from 'react';
import { View, Button } from 'react-native';

export default function RoleSelectScreen({ navigation }) {
  return (
    <View>
      <Button title="Proprietor (Owner)" onPress={() => navigation.navigate('OwnerHome')} />
      <Button title="Crew Member (Worker)" onPress={() => navigation.navigate('WorkerHome')} />
    </View>
  );
}
