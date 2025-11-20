import React from 'react';
import { View, Button } from 'react-native';

export default function OwnerHome({ navigation }) {
  return (
    <View>
      <Button title="Attendance Summary" onPress={() => navigation.navigate('Attendance')} />
      <Button title="New Worker" onPress={() => navigation.navigate('AddWorker')} />
      <Button title="Workers List" onPress={() => {}} />
      <Button title="Past Workers" onPress={() => {}} />
      {/* Implement navigation to the respective screens */}
    </View>
  );
}
