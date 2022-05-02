import React from "react";
import ReactMarkdown from "react-markdown";
import { useQuery } from "@apollo/client";
// Импортируем утилиту форматирования из 'date-fns'
import {format} from 'date-fns';
import styled from "styled-components";
// Импортируем компоненты UI авторизованного пользователя
import NoteUser from "./NoteUser";
// Импортируем локальный запрос IS_LOGGED_IN
import { IS_LOGGED_IN } from "../gql/query";

// Ограничиваем расширение заметки до 800 пикселей
const StyleNote = styled.article`
max-width: 800px;
margin: 0 auto;
`;
// Стилизуем метаданные заметки
const MetaData = styled.div`
@media (min-width: 500px) {
    display: flex;
    align-items: top;
}
`;
// Добавляем пространство между автором и матаданными
const MetaInfo = styled.div`
padding-right: 1em;
`;
// Выравниваем по правой стороне на больших экранах
const UserActions = styled.div`
margin-left: auto;
`;

const Note = ({note}) => {
    const {loading, error, data} = useQuery(IS_LOGGED_IN);
    return(
        <StyleNote>
            <MetaData>
                <MetaInfo>
                    <img src={note.author.avatar} alt={`${note.author.username} аватар`} height="50px" />
                </MetaInfo>
                <MetaInfo>
                    <em>автор</em> {note.author.username} <br />
                    {format(note.createdAt, "MMM Do YYYY")}
                </MetaInfo>
                {data.isLoggedIn ? (
                    <UserActions>
                        <NoteUser note={note}/>
                    </UserActions>
                ) : (
                    <UserActions>
                    <em>Избранное:</em> {note.favoriteCount}
                </UserActions>
                )}
            </MetaData>
            <ReactMarkdown source={note.content}/>
        </StyleNote>
    );
};
export default Note;