import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { useMutation, useApolloClient, gql } from "@apollo/client";

import UserForm from '../components/UserForm';
import Button from "../components/Button";

const SIGNUP_USER = gql`
mutation signUp($email: String!, $username: String!, $password: String!){
    signUp(email: $email, username: $username, password: $password)
}
`;

// Добавляем props, передаваемый в компонент для дальнейшего истользования
const SignUp = props => {
    // Устанавливаем состояние формы по умолчаниюж
    const [values, setValues] = useState();
    useEffect(() => {
        // Обновляем заголовок документа
        document.title = 'Регистрация - Заметки';
    });
     // Apollo клиент
    const client = useApolloClient();
     // Добавляем хук мутации
    const [signUp, {loading, error}] = useMutation(SIGNUP_USER, {onCompleted: data => {
         // Сохраняем JWT в localStorage
         localStorage.setItem('token', data.signUp);
         // Обновляем локальный кэш
         client.writeData({data: {isLoggedIn: true}});
         // Перенаправляем пользователя на домашнюю страницу
         props.history.push('/');
    }});
    return (
        <React.Fragment>
            <UserForm action={signUp} formType="signup" />
            {/* Если данные загружаются, отображаем сообщение о загрузке */}
            {loading && <p>Загрузка...</p>}
            {/* Если при загрузке произошел сбой, отображаем сообщение об ошибке */}
            {error && <p>Ошибка создания аккаунта!</p>}
        </React.Fragment>
    );
};
export default SignUp;