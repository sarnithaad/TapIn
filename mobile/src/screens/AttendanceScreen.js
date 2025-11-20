import React from 'react';
import { View, Text, Button } from 'react-native';
// import * as LocalAuthentication from "expo-local-authentication"; // Simulated

export default function AttendanceScreen() {
  const markAttendance = () => {
    // Simulate fingerprint and attendance record
    alert("Attendance marked via fingerprint (simulated)");
  };

  const markManual = () => {
    // Owner marks attendance manually
    alert("Attendance marked manually by Owner");
  };

  return (
    <View>
      <Button title="Mark Attendance (Fingerprint)" onPress={markAttendance} />
      <Button title="Mark Present (Manual)" onPress={markManual} />
    </View>
  );
}
