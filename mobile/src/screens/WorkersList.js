import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import api from '../services/api';

export default function WorkersList({ route, navigation }) {
  const { shopId } = route.params;
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    api.getWorkersList(shopId).then(res => setWorkers(res.data));
  }, [shopId]);

  const removeWorker = (workerId) => {
    api.removeWorker(workerId).then(() => {
      setWorkers(workers.filter(w => w._id !== workerId));
    });
  };

  return (
    <View>
      <Text>Active Workers</Text>
      <FlatList
        data={workers}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>Joined: {new Date(item.dateOfJoining).toDateString()}</Text>
            <Button title="Remove" onPress={() => removeWorker(item._id)} />
          </View>
        )}
      />
    </View>
  );
}
