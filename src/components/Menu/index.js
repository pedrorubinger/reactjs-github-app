import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { BiHomeAlt } from 'react-icons/bi';
import { FiGithub, FiUsers } from 'react-icons/fi';

import './styles.css';
import { Context } from '../Store/Provider';

export default function Menu() {
    const { mounted, setMount } = useContext(Context);

    useEffect(() => {
        // Adiciona efeito de aba ativa
        const url = window.location.href.toString();
        let route = url.substring(url.lastIndexOf('/') + 1);

        if(route === '')
            route = 'menu-item-to-home';
        else
            route = 'menu-item-to-' + route;

        const elements = document.getElementsByClassName(route);

        for(let i = 0; i < elements.length; i++)
            elements[i].style.color = 'black';

        setMount(true);
    }, [setMount]);

    if(!mounted)
        return <h2>Loading...</h2>

    return(
        <div id="menu-container">
            <ul>
                <li>
                    <Link to="/" className="menu-item-to-home">
                        <BiHomeAlt className="menu-item-icon menu-item-to-home" size="25" />
                        Home
                    </Link>
                </li>

                <li>
                    <Link to="/repos" className="menu-item-to-repos">
                        <FiGithub className="menu-item-icon menu-item-to-repos" size="25" />
                        Repos
                    </Link>
                </li>

                <li>
                    <Link to="/followers" className="menu-item-to-followers">
                        <FiUsers className="menu-item-icon menu-item-to-followers" size="25" />
                        Seguidores
                    </Link>
                </li>

                <li>
                    <Link to="/following" className="menu-item-to-following">
                        <FiUsers className="menu-item-icon menu-item-to-following" size="25" />
                        Seguindo
                    </Link>
                </li>
            </ul>
        </div>
    );
}