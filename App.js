import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{
        color: "#fff",
        fontSize: 30,
        fontWeight: "bold",
      }}>Hello World!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15141F',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
