import React from "react";
import { ScrollView, View, Text, StyleSheet, Image } from "react-native";

const Home = () => {
  const renderGrid = () => {
    const rows = 6;
    const cols = 2;
    const grid = [];
    const icons_list = ["nasalogo", "google", "youtube"];
    const defaultIcon = "question";
    let case_number = 0;

    const images = {
      question: require('../assets/question.png'),
      nasalogo: require('../assets/nasalogo.png'),
      google: require('../assets/google.png'),
      youtube: require('../assets/youtube.png')
    };

    for (let i = 0; i < rows; i++) {
      const rowItems = [];
      for (let j = 0; j < cols; j++) {
        const iconName = case_number < icons_list.length
          ? icons_list[case_number]
          : defaultIcon;

        rowItems.push(
          <View key={j} style={styles.col}>
            <Image
              source={images[iconName]}
              style={styles.image}
            />
          </View>
        );
        case_number += 1;
      }
      grid.push(
        <View key={i} style={styles.row}>
          {rowItems}
        </View>
      );
    }

    return grid;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Area</Text>
      {renderGrid()}
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: "#111",
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
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
