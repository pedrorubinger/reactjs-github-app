import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { BiArrowBack } from 'react-icons/bi';

import './styles.css';
import { Context } from '../../components/Store/Provider';
import Menu from '../../components/Menu';

export default function Home() {
    const {
        handleLogout,
        userData,
        replaceUser,
        setReplaceUser,
        setMount,
        checkAuth
    } = useContext(Context);
    const history = useHistory();

    const unlisten = history.listen(async () => {
        setMount(false);

        setReplaceUser(false);
        await checkAuth();
        unlisten();
        setMount(true);
    });

    useEffect(() => {
        // Ao mudar de rota...
        if(replaceUser)
            unlisten();
    }, [replaceUser, unlisten]);

    const handleClick = event => {
        event.preventDefault();

        if(!replaceUser)
            handleLogout();
        else {
            unlisten();
            localStorage.setItem('user', userData.login);
            setReplaceUser(false);
        }
    }

    return(
        <div id="home-container">
            <Menu />

            <div id="home-content">
                <header id="home-header">
                    <div id="home-header-info">
                        {
                            replaceUser ?
                            <span
                                className="link"
                                onClick={() => { setMount(false); history.goBack() }}
                            >
                                <BiArrowBack size="25" color="#fff" />
                            </span> : ''
                        }

                        <p>#{userData.login}</p>
                        <span onClick={handleClick}>
                            {replaceUser ? 'Salvar' : 'Sair'}
                            <FiLogOut
                                size="20"
                                color={replaceUser ? '#5CBC29' : '#D03434'}
                                id="logout-icon"
                            />
                        </span>
                    </div>

                    <img
                        className="profile-photo"
                        src={userData.avatar}
                        width="113"
                        height="113"
                        alt="profile"
                    />
                </header>

                <div id="home-user-info">
                    <p id="user-info-name">
                        <span className="yellow-marker"></span>
                        <b>{userData.name || userData.login}</b>
                    </p>
                    
                    <p id="user-info-email">
                        {userData.email || 'Email não informado'}
                    </p>
                    
                    <p id="user-info-location">
                        {userData.location || 'Local não informado'}
                    </p>
                </div>

                <div id="home-user-stats">
                    <div className="home-user-stats-item">
                        <p>{userData.followers}</p>
                        <p>Seguidores</p>
                    </div>

                    <div className="home-user-stats-item">
                        <p>{userData.following}</p>
                        <p>Seguindo</p>
                    </div>

                    <div className="home-user-stats-item">
                        <p>{userData.repos}</p>
                        <p>Repos</p>
                    </div>
                </div>

                <div id="home-user-bio">
                    <p>
                        <span className="yellow-marker"></span>
                        <b>Bio</b>
                    </p>
                    <p>{userData.bio || 'Bio não informada'}</p>
                </div>
            </div>
        </div>
    );
}