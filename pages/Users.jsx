import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useItem } from '../src/contexts/CoffeeContext'

export default function Users() {

    const { setUserData } = useItem();
    const navigation = useNavigation();
    const [user, setUser] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    useEffect(() => {
        fetch("https://coffee-shop-api-sigma.vercel.app/usuarios")
            .then((respFetch) => respFetch.json())
            .then((respJson) => setUser(respJson))
            .catch((erro) => console.warn(erro))
    }, [])

    const handleLogin = () => {
        let loginSucessful = false;

        user.forEach(usuario => {
            if (email === usuario.email && password === usuario.senha) {
                loginSucessful = true;

                if (usuario.id === 1) {
                    navigation.navigate("RodapeAdm");
                } else {
                    navigation.navigate("RodapeCliente");
                    setUserData({email: usuario.email, senha: usuario.senha, nome: usuario.usuario})
                }
                return;
            }
        });

        if (!loginSucessful) {
            console.warn("Email ou senha incorretos!");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="email"
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                secureTextEntry
                value={password}
                onChangeText={text => setPassword(text)}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingLeft: 8,
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
});
