import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
padding: 1em;
background: #f5f4f0;

@media (max-width: 700px){
    padding-top: 64px;
}

@media (min-width: 700px){
    position: fixed;
    width: 220px;
    height: calc(100% - 64px);
    overflow-y: scroll;
}
`;

const NavList = styled.ul`
margin: 0;
padding: 0;
list-style: none;
line-height: 2;

a {
    text-decoration: none;
    font-weight: bold;
    font-size: 1.1em;
    color: #333;
}

a:visited {
    color: #333;
}

a:hover,
a:focus {
    color: #0077cc;
}
`;

const Navigation = () => {
    return (
        <Nav>
            <NavList>
                <li>
                    <Link to="/">Домашняя</Link>
                </li>
                <li>
                    <Link to="/mynotes">Мои заметки</Link>
                </li>
                <li>
                    <Link to="/favorites">Избранное</Link>
                </li>
                <li>
                    <Link to="/new">Новая</Link>
                </li>
            </NavList>
        </Nav>
    );
};
export default Navigation;