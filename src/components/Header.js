import React from "react";
import styled from "styled-components";
import logo from '../img/logo.svg';
import { useQuery, gql } from "@apollo/client";
import { Link, withRouter } from "react-router-dom";
import ButtonAsLink from "./ButtonAsLink";

const IS_LOGGED_IN = gql`
{
    isLoggedIn @client
}
`;
const UserState = styled.div`
margin-left: auto;
`;
const HeaderBar = styled.header`
width: 100%;
padding: 0.5em 1em;
display: flex;
height: 64px;
position: fixed;
align-items: center;
background-color: #fff;
box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25);
z-index: 1;
`;
const LogoText = styled.h1`
margin: 0;
padding: 0;
display: inline;
`;
const Header = props => {
    const {data, client} = useQuery(IS_LOGGED_IN);
    return (
        <HeaderBar>
            <img src={logo} alt="Лого заметок" height="40" />
            <LogoText>Заметки</LogoText>
            {/* Если авторизован, отображаем ссылку Выход, в противном случае варианты Вход и Регистрация*/}
            <UserState>
                {data.isLoggedIn ? (<ButtonAsLink 
                onClick={()=>{
                    // Удаляем токен
                    localStorage.removeItem('token');
                    // Очищаем кэш приложения
                    client.resetStore();
                    // Обновляем локальное состояние
                    client.writeData({data: { isLoggedIn: false }});
                    // Перенаправляем на главную страницу
                    props.history.push('/');
                }}>Выход</ButtonAsLink>) : (<p>
                    <Link to={'/signin'}>Вход</Link> или {' '}
                    <Link to={'/signup'}>Регистрация</Link>
                    </p>)}
            </UserState>
        </HeaderBar>
    );
};
export default withRouter(Header);