import React from 'react';
import {
    SafeAreaView, View, FlatList, StyleSheet, Text, TouchableHighlight, Alert,
} from 'react-native';

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
];

type ItemProps = { title: string };

const Item = ({ title }: ItemProps) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </View>
);

const Exemplo7 = () => {
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={DATA}
                renderItem={({ item, separators }) => (
                    <TouchableHighlight
                        key={item.id}
                        onPress={() => {
                            Alert.alert('Clique' + item.title);}}
                        style = { styles.container }
                        onShowUnderlay = { separators.highlight}
                        onHideUnderlay = { separators.unhighlight } >
                        <Item title={item.title} />
                    </TouchableHighlight>
                )}
            keyExtractor = { item => item.id }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        backgroundColor: '#B3D9C3',
        padding: 10,
        marginVertical: 1,
        marginHorizontal: 1,
        borderStyle: 'solid',
        borderWidth: 1,
    },
    title: {
        fontSize: 32,
    },
});

export default Exemplo7;
