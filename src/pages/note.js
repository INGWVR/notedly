import React from "react";
// Импортируем зависимости GraphQL
import { useQuery, gql } from "@apollo/client";
// Импортируем компонент Note
import Note from "../components/Note";

import { GET_NOTE } from "../gql/query";

const NotePage = props => {
    // Сохраняем id из url в виде переменной
    const id = props.match.params.id;
    // Запрашиваем хук, передавая значение id в качестве переменной
    const {loading, error, data} = useQuery(GET_NOTE, {variables: {id}});
    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка! Заметка не найдена</p>;
    return <Note note={data.note}></Note>;
};
export default NotePage;