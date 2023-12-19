import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

const LoginPage = () => {
    return (
        <View style={styles.container}>
            <View style={styles.mainBox}>
                <Text style={styles.title}>Login</Text>
            </View>
        </View>
    );
}

export default LoginPage;

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
        height: "100%",
        width: "100%",
        alignItems: "center",
    },
    title: {
        fontSize: 30,
        color: "#fff",
        fontWeight: "bold",
        marginTop: 200,
    },
  });
  