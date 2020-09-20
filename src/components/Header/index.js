import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';

import { Context } from '../../components/Store/Provider';
import './styles.css';

export default function Header() {
    const { userData, componentLabel } = useContext(Context);
    const history = useHistory();

    return(
        <header id="header-container">
            <span
                className="link"
                onClick={() => history.goBack()}
                id="repos-arrow-back"
            >
                <BiArrowBack size="25" color="#fff" />
            </span>

            <p>
                <b>
                {
                    componentLabel === 'seguidores' ?
                        userData.followers
                        :
                        componentLabel === 'seguindo' ?
                        userData.following
                        :
                        userData.repos
                } {componentLabel}
                </b>
            </p>
        </header>
    );
}