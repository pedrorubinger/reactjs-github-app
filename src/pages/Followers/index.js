import React, { useContext, useEffect } from 'react';

import './styles.css';
import Menu from '../../components/Menu';
import Header from '../../components/Header';
import Follow from '../../components/Follow';
import PagesBar from '../../components/PagesBar';
import { Context } from '../../components/Store/Provider';

export default function Followers() {
    const { mounted, setMount, setComponentLabel } = useContext(Context);

    useEffect(() => {
        setComponentLabel("seguidores");
        setMount(true);
    }, [setComponentLabel, setMount]);

    if(!mounted)
        return <h2>Loading...</h2>

    return(
        <div id="followers-container">
            <Menu />

            <Header />

            <Follow />

            <PagesBar />
        </div>
    );
}