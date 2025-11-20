import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import api from '../services/api';

export default function PastWorkers({ route }) {
  const { shopId } = route.params;
  const [pastWorkers, setPastWorkers] = useState([]);

  useEffect(() => {
    api.getPastWorkersList(shopId).then(res => setPastWorkers(res.data));
  }, [shopId]);

  return (
    <View>
      <Text>Past Workers</Text>
      <FlatList
        data={pastWorkers}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>Removed: {new Date(item.dateOfRemoval).toDateString()}</Text>
          </View>
        )}
      />
    </View>
  );
}
