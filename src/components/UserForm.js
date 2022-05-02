import React, { useState } from "react";
import styled from "styled-components";
import Button from './Button';

const Wrapper = styled.div`
border: 1px solid #f5f4f0;
max-width: 500px;
padding: 1em;
margin: 0 auto;
`;

const Form = styled.form`
label,
input {
    display: block;
    line-height: 2em;
}

input {
    width: 100%;
    margin-bottom: 1em;
}
`;

const UserForm = props => {
    // Устанавливаем состояние формы по умолчанию
    const [values, setValues] = useState();
    // Обновляем состояние, когда пользователь вводит данные в форму
    const onChange = event => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    return (
        <Wrapper>
            {/* Отображаем соответствующий заголовок формы */}
            {props.formType === 'signup' ? <h2>Регистрация</h2> : <h2>Вход</h2>}
            {/* Выполняем мутацию, когда пользователь отправляет форму */}
            <Form onSubmit={e => {
                e.preventDefault();
                props.action({
                    variables: {
                        ...values
                    }
                });
            }}>
                {props.formType === 'signup' && (
                    <React.Fragment>
                        <label htmlFor="username">Логин:</label>
                        <input required type="text" id="username" name="username" placeholder="Логин" onChange={onChange} />
                    </React.Fragment>
                )}
                <label htmlFor="email">Email:</label>
                <input required type="email" id="email" name="email" placeholder="Email" onChange={onChange} />
                <label htmlFor="password">Пароль:</label>
                <input required type="password" id="password" name="password" placeholder="Пароль" onChange={onChange} />
                <Button type="submit">Отправить</Button>
            </Form>
        </Wrapper>
    )
}
export default UserForm;