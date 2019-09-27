import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import MapView, {Marker} from'react-native-maps';

export default function App() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState({latitude:60.200692,longitude:24.934302,latitudeDelta:0.0322,longitudeDelta:0.0221});
  console.log(search);
  console.log(location);

  getLocation = () => {
    const url = "http://www.mapquestapi.com/geocoding/v1/address?key=kphM2zyYV1TgyPe0sENGG0UuzT0MSz0G&location="+search;
    fetch(url)
    .then(response => response.json())
    .then(responseJson => {
      const lat = responseJson.results[0].locations[0].latLng.lat;
      const lon = responseJson.results[0].locations[0].latLng.lng;
      setLocation({latitude: lat, longitude: lon, latitudeDelta: 0.0322, longitudeDelta: 0.0221});
    })
    .catch(error => {
      Alert.alert("Error", error);
    });
  };
  return (
    <View style ={styles.container}>
      <TextInput
        style={{ fontSize: 18, width: 300, paddingTop: 40}}
        value={search}
        placeholder="Type address and city"
        onChangeText={search => setSearch(search)}
      />
      <Button title ="Search" onPress = {() => getLocation()}/>
      <MapView
        style={{ flex: 1 }}
        region={location}>
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude}}
            title="Haaga-Helia"/>
        </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
