import React, {useState, useContext} from 'react';
import {StyleSheet, View, Button, Dimensions} from 'react-native';
import {FontAwesome, AntDesign} from '@expo/vector-icons';
import {EditModal} from '../components/EditModal';
import {AppCard} from '../components/ui/AppCard';
import {THEME} from '../theme';
import {AppTextBold} from '../components/ui/AppTextBold';
import {AppButton} from '../components/ui/AppButton';
import {TodoContext} from '../context/todo/todoContext';
import {ScreenContext} from '../context/screen/screenContext';

export const TodoScreen = () => {
    const {todos, updateTodo, removeTodo} = useContext(TodoContext);
    const {todoId, changeScreen} = useContext(ScreenContext);
    const [modal, setModal] = useState(false);

    const todo = todos.find(t => t.id === todoId);

    const saveHandler = async title => {
        await updateTodo(todo.id, title);
        setModal(false);
    };

    return (
        <View>
            <EditModal value={todo.title} visible={modal} onCancel={() => setModal(false)} onSave={saveHandler} />

            <AppCard style={styles.card}>
                <AppTextBold style={styles.title}>{todo.title}</AppTextBold>
                {/* <Button title="Ред." onPress={() => setModal(true)} /> */}
                <AppButton onPress={() => setModal(true)}>
                    <FontAwesome name="edit" size={20} />
                </AppButton>
            </AppCard>
            <View style={styles.buttons}>
                <View style={styles.button}>
                    {/* <Button title="Назад" onPress={goBack} color={THEME.GREY_COLOR} /> */}
                    <AppButton onPress={() => changeScreen(null)} color={THEME.GREY_COLOR}>
                        <AntDesign name="back" size={20} color="#fff" />
                    </AppButton>
                </View>
                <View style={styles.button}>
                    {/* <Button title="Удалить" color={THEME.DANGER_COLOR} onPress={() => onRemove(todo.id)} /> */}
                    <AppButton color={THEME.DANGER_COLOR} onPress={() => removeTodo(todo.id)}>
                        <FontAwesome name="remove" size={20} color="#fff" />
                    </AppButton>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    card: {
        marginBottom: 20,
        padding: 15,
    },
    button: {
        // width: '40%',
        // width: Dimensions.get('window').width / 3,
        width: Dimensions.get('window').width > 400 ? 150 : 100,
    },
    title: {
        fontSize: 20,
    },
});
