// Импортируем React и зависимости //маршрутизации
import React, { Component } from "react";
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import { useQuery, gql } from "@apollo/client";
// Импортируем общий компонент Layout
import Layout from "../components/Layout";
// Импортируем маршруты
import Home from "./home";
import MyNotes from "./mynotes";
import Favorites from "./favorites";
import NotePage from "./note";
import SignUp from "./signup";
import SignIn from "./singin";
import NewNote from "./new";
import EditNote from "./edit";

import { IS_LOGGED_IN } from "../gql/query";

// Определяем маршруты
const Pages = () => {
    return (
        <Router>
            <Layout>
                <Route exact path="/" component={Home} />
                <PrivateRoute path="/mynotes" component={MyNotes} />
                <PrivateRoute path="/favorites" component={Favorites} />
                <Route path="/note/:id" component={NotePage} />
                <Route path="/signup" component={SignUp} />
                <Route path="/signin" component={SignIn} />
                <PrivateRoute path="/new" component={NewNote} />
                <PrivateRoute path="/edit/:id" component={EditNote} />
            </Layout>
        </Router>
    );
};

const PrivateRoute = ({ component: Component, ...rest }) => {
    const {loading, error, data} = useQuery(IS_LOGGED_IN);
    // Если данные загружаются, выводим сообщение о загрузке
    if (loading) return <p>Загрузка...</p>;
    // Если при получении данных произошел сбой, выводим сообщение об ошибке
    if (error) return <p>Ошибка!</p>;
    // Если пользователь авторизован, направляем его к запрашиваемому компоненту
    // В противном случае перенаправляем на страницу авторизации
    return(
        <Route 
            {...rest}
            render={props => data.isLoggedIn === true ? (<Component {...props} />) : (<Redirect to={{pathname: '/signin', state: {from: props.location}}}/>)}
        />
    );
};
export default Pages;