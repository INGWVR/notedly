import React from "react";
import ReactMarkdown from 'react-markdown';
// Импортируем необходимые библиотеки
import { useQuery, gql } from "@apollo/client";

import Button from "../components/Button";
import NoteFeed from "../components/NoteFeed";

import { GET_NOTES } from "../gql/query";

const Home = () => {
    // Хук запроса
    const {data, loading, error, fetchMore} = useQuery(GET_NOTES);
    // Если данные загружаются, отображаем сообщение о загрузке
    if (loading) return <p>Загрузка...</p>
    // Если при получении данных произошел сбой, отображаем сообщение об ошибке
    if (error) return <p>Ошибка</p>
    // Если загрузка данных произошла успешно, отображаем их в UI
    return (
        <React.Fragment>
            <NoteFeed notes={data.noteFeed.notes}/>
            {/*Отображать кнопку Отобразить больше только если hasNextPage равно true*/}
            {data.noteFeed.hasNextPage && (
            <Button 
            onClick={() => fetchMore({
                variables: {cursor: data.noteFeed.cursor},
                updateQuery: (previousResult, {fetchMoreResult}) => {
                    return {
                        noteFeed: {
                            cursor: fetchMoreResult.noteFeed.cursor,
                            hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
                            // Совмещаем новые результаты со старыми
                            notes: [
                                ...previousResult.noteFeed.notes,
                                ...fetchMoreResult.noteFeed.notes
                            ],
                            __typename: 'noteFeed'
                        }
                    };
                }
            })
            }>
            Отобразить больше
            </Button>
            )}
        </React.Fragment>

    );
};
export default Home;