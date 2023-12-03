import React, { useState } from 'react';
import {
    SafeAreaView,
    TextInput,
    StyleSheet,
    Button,
    View,
    Text,
} from 'react-native';

let Calculadora = () => {
    const [valor1, setValor1] = useState('');
    const [valor2, setValor2] = useState('');
    const [resp, setResp] = useState(0);

    function calc(op: string) {
        if ((valor1) && (valor2)) {
            switch (op) {
                case '+': setResp(parseFloat(valor1) + parseFloat(valor2));
                    break;
                case '-': setResp(parseFloat(valor1) - parseFloat(valor2));
                    break;
                case '*': setResp(parseFloat(valor1) * parseFloat(valor2));
                    break;
                case '/': setResp(parseFloat(valor1) / parseFloat(valor2));
                    break;
            }
        }
    }

    return (
        <SafeAreaView>
            <TextInput
                style={styles.caixa}
                keyboardType="numeric"
                placeholder="valor 1"
                value={valor1}
                onChangeText={data => setValor1(data)}
            />
            <TextInput
                style={styles.caixa}
                keyboardType="numeric"
                placeholder="valor 2"
                value={valor2}
                onChangeText={data => setValor2(data)}
            />
            <View style={styles.container}>
                <Button title="+" onPress={() => calc('+')} />
                <Button title="-" onPress={() => calc('-')} />
                <Button title="*" onPress={() => calc('*')} />
                <Button title="/" onPress={() => calc('/')} />
                <Text>A resposta do cálculo é: {resp}</Text>
            </View>
        </SafeAreaView>
    );
};

let styles = StyleSheet.create({
    container: {
        flex: 0,
        flexDirection: 'row',
    },
    caixa: {
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 1,
        padding: 10,
        margin: 5,
    },
});

export default Calculadora;
