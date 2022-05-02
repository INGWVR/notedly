import React from "react";
// Импортируем зависимости GraphQL
import { useQuery, gql, useMutation } from "@apollo/client";
import NoteForm from "../components/NoteForm";

import { GET_NOTE, GET_ME } from "../gql/query";
import { EDIT_NOTE } from "../gql/mutation";

const EditNote = props => {
    // Сохраняем id из url в виде переменной
    const id = props.match.params.id;
    // Запрашиваем хук, передавая значение id в качестве переменной
    const {loading, error, data} = useQuery(GET_NOTE, {variables: {id}});
    // Получаем информацию о текущем пользователе
    const {data: userdata} = useQuery(GET_ME);
    // Определяем мутацию заметки
    const [editNote] = useMutation(EDIT_NOTE, {
        variables: {
            id
        },
        onCompleted: () => {
            props.history.push(`/note/${id}`)
        }
    });
    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка! Заметка не найдена</p>;
    // Если текущий пользователь не соответствует автору заметки,
    // возвращаем соответствующее сообщение
    if (userdata.me.id !== data.note.author.id) {
        return <p>У вас отсутствует доступ на редактирование заметки</p>
    }
    // Передаем данные в компонент формы
    return <NoteForm content={data.note.content} action={editNote} />
};
export default EditNote;