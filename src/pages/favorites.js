import React, { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";

import NoteFeed from '../components/NoteFeed';
import { GET_MY_FAVORITES } from "../gql/query";

const Favorites = () => {
    useEffect(() => {
        document.title = 'Избранное';
    });
    const {loading, error, data} = useQuery(GET_MY_FAVORITES);
    if (loading) return 'Загрузка...';
    if (error) return `Ошибка! ${error.message}`;
    if (data.me.favorites.length !== 0){
        return <NoteFeed notes={data.me.favorites}/>;
    }
    else {
        return <p>Нет избранного</p>
    }
};
export default Favorites;