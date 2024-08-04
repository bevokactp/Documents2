import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import * as Localization from 'react-native-localize';

export default function App() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [timezone, setTimezone] = useState(Localization.getTimeZone());
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();

    return () => clearInterval(intervalId);
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.datetime}>{currentDateTime.toLocaleString()}</Text>
      <Text style={styles.timezone}>Timezone: {timezone}</Text>
      <Text style={styles.location}>Location: {text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  datetime: {
    fontSize: 24,
    marginBottom: 16,
  },
  timezone: {
    fontSize: 18,
    marginBottom: 16,
  },
  location: {
    fontSize: 16,
  },
});
