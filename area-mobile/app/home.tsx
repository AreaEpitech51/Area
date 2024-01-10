import React, { useState } from "react";
import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

import { Card } from 'react-native-elements';

function navigate() {
  
}

const Home = () => {
  // const squares = [] as { key: string }[];
  // const setSquares = useState(squares);
  const [squares, setSquares] = useState([]);

  // const images = {
  //   question: require('../assets/question.png'),
  //   nasalogo: require('../assets/nasalogo.png'),
  //   google: require('../assets/google.png'),
  //   youtube: require('../assets/youtube.png')
  // };

  const addSquare = () => {
    const newSquare = { key: squares.length.toString() };
    setSquares([...squares, newSquare]);
  };

  return (
    <View style={styles.container}>
    <TouchableOpacity style={styles.buttonAction} onPress={addSquare}>
      <Text style={{alignSelf: "center"}}>Nouvelle Action</Text>
    </TouchableOpacity>
    <ScrollView>
      <Text style={styles.title}>Area</Text>
      {squares.map(square => (
      <View key={square.key}>
        <View style={styles.actionSquare}/>
      </View>
      ))}
    </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "flex-start",
    backgroundColor: "#111",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    marginVertical: 7.5,
  },
  col: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
    backgroundColor: "#222",
    borderRadius: 20,
  },
  title: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "center",
    marginTop: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  buttonAction: {
    height: 50,
    width: "60%",
    backgroundColor: "#1abc54",
    borderRadius: 30,
    alignContent: "center",
    justifyContent: "center",
    fontWeight: "bold",
    position: "absolute",
    marginTop: 740,
    zIndex: 1,
  },
  actionSquare: {
    width: 360,
    height: 120,
    backgroundColor: "#3f4847",
    marginBottom: 20,
  },
});
