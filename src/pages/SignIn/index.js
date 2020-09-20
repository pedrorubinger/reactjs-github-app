import React, { useContext, useEffect } from 'react';
import { AiFillGithub, AiOutlineLogin } from 'react-icons/ai';

import './styles.css';
import { Context } from '../../components/Store/Provider';

export default function SignIn(props) {
    const {
        authenticated,
        mounted,
        setMount,
        setInvalidUser,
        invalidUser
    } = useContext(Context);

    useEffect(() => {
        if(authenticated) 
            props.history.push('/');
        else
            setMount(true);
    }, [authenticated, setMount, props.history]);

    const handleLogin = async event => {
        event.preventDefault();

        const input = document.getElementById('input-user');
        const user = input.value;

        if(user !== '' && user !== null) {
            await localStorage.setItem('user', user);
            window.location.reload();
        } else {
            setInvalidUser(true);
            input.style = 'border: 2px solid #CC042A; margin-top: 0';
        }
    }

    if(!mounted)
        return <h2>Please wait. The page is loading...</h2>

    return(
        <div id="sign-in-container">
            <div id="sign-in-content">
                <AiFillGithub
                    size="98"
                    color="#FFCE00"
                />

                <form onSubmit={handleLogin}>
                    {
                        invalidUser ?
                            <p id="sign-in-error-message">
                                Usuário inválido!
                            </p>
                            : ''
                    }

                    <input
                        type="text"
                        id="input-user"
                        placeholder="Usuário"
                        maxLength="39"
                        autoFocus
                    >
                    </input>

                    <button id="btn-sign-in">
                        Entrar <AiOutlineLogin id="sign-in-icon" size="20" />
                    </button>
                </form>
            </div>
        </div>
    );
}