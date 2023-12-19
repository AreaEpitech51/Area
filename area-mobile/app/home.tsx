import { Link } from "expo-router";
import { View, Text, StyleSheet, TextInput } from "react-native";

const Home = () => {
    return (
        <View>
            <Text>HOME</Text>
        </View>
    );
}

export default Home;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#111",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
    },
    mainBox: {
        backgroundColor: "#222",
        borderRadius: 10,
        width: "100%",
        paddingTop: 60,
        paddingBottom: 60,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 30,
        color: "#fff",
        fontWeight: "bold",
        marginBottom: "10%",
    },
    easy_log_box: {
        backgroundColor: "#111",
        width: "70%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        margin: "1%",
    },
    input_zone: {
        width: "80%",
        margin: "1%",
    },
    textInput: {
        borderColor: "#999",
        borderWidth: 2,
        borderRadius: 8,
        height: 40,
        paddingLeft: "5%",
        color: "#FFF",
        marginBottom: 20,
    },
    line: {
        height: 0.8,
        width: "90%",
        margin: 30,
        backgroundColor: "#999"
    },
    button: {
        height: 60,
        width: "60%",
        backgroundColor: "#1abc54",
    },
  });
  