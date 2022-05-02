import React, { useEffect } from "react";
import { useMutation, gql } from '@apollo/client'
// Импортируем компонент NoteForm
import NoteForm from "../components/NoteForm";
// Импортируем запрос
import { GET_NOTES, GET_MY_NOTES } from "../gql/query";


const NEW_NOTE = gql`
mutation newNote($content: String!) {
    newNote(content: $content) {
        id
        content
        createdAt
        favoriteCount
        favoritedBy {
            id
            username
        }
        author {
            username
            id
        }
    }
}
`;

const NewNote = props => {
    useEffect(() => {
        document.title = 'Новая заметка - Заметки';
    });
    const [data, { loading, error }] = useMutation(NEW_NOTE, {
        // Повторно получаем запрос GET_NOTES и GET_MY_NOTES, что бы обновить кэш
        refetchQueries: [{ query: GET_NOTES }, {query: GET_MY_NOTES}],
        onCompleted: data => {
            props.history.push(`note/${data.newNote.id}`);
        }
    });
    return (
        <React.Fragment>
            {/* Во время загрузки мутации выдаем сообщение о загрузке */}
            {loading && <p>Загрузка...</p>}
            {/* В случае сбоя выдаем сообщение об ошибке */}
            {error && <p>Ошибка сохранения заметки</p>}
            {/* Компонент формы передающий мутацию данных в качестве prop */}
            <NoteForm action={data} />
        </React.Fragment>
    )

}

export default NewNote;