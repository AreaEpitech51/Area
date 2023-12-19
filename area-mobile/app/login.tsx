import { Link } from "expo-router";
import { View, Text, StyleSheet, TextInput } from "react-native";

const LoginPage = () => {
    return (
        <View style={styles.container}>
            <View style={styles.mainBox}>
                <Text style={styles.title}>J'ai un compte Area</Text>
                <View style={styles.easy_log_box}>
                    <Text style={{ color: "#FFF" }}>🪙 Se connecter avec GitHub</Text>
                </View>
                <View style={styles.easy_log_box}>
                    <Text style={{ color: "#FFF" }}>🪟 Se connecter avec Microsoft</Text>
                </View>
                <View style={styles.line}/>
                <View style={styles.input_zone}>
                    <Text style={{color: "#FFF"}}>Nom d'utilisateur</Text>
                    <TextInput style={styles.textInput} placeholder="Enter your username" placeholderTextColor={"#777"}></TextInput>
                </View>
                <View style={styles.input_zone}>
                    <Text style={{color: "#FFF"}}>Mot de passe</Text>
                    <TextInput style={styles.textInput} placeholder="Enter your password" placeholderTextColor={"#777"}></TextInput>
                </View>
                <Link href="/home" style={styles.button}>Se connecter</Link>
                <View style={styles.line}/>
                <Text style={{color: "#FFF"}}>Vous n'avez pas encore de compte ? </Text>
                <Text style={{color: "#1abc54"}}>Créer un compte</Text>
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
        height: 50,
        width: "60%",
        backgroundColor: "#1abc54",
        borderRadius: 30,
        alignContent: "center",
        justifyContent: "center",
        fontWeight: "bold",
    },
  });
  