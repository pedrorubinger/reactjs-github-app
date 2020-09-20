import React, { useContext, useEffect } from 'react';
import { BiStar } from 'react-icons/bi';
import { FiLock, FiUnlock } from 'react-icons/fi';

import './styles.css';
import Menu from '../../components/Menu';
import Header from '../../components/Header';
import PagesBar from '../../components/PagesBar';
import { Context } from '../../components/Store/Provider';

export default function Repos() {
    const {
            userData,
            mounted,
            setMount,
            setComponentLabel,
            setList,
            setTotalPages
        } = useContext(Context);
    const list = userData.reposList;

    useEffect(() => {
        const pages = Math.ceil(userData.repos / 30);

        setList(userData.reposList);
        setTotalPages(pages);

        setComponentLabel("repositórios");
        setMount(true);
    }, [setComponentLabel, userData, setList, setTotalPages, setMount]);

    if(!mounted)
        return <h2>Loading...</h2>

    return(
        <div id="repos-container">
            <Menu />

            <Header />

            <div id="repos-content">
                <div className="cards-box">
                    {
                        list.length === 0 ?
                            <p className="empty-message">Este usuário ainda não possui repositórios.</p>
                            :
                            list.map(repo => {
                                return(
                                    <div className="card-item" key={repo.id}>
                                        <div className="card-title-group">
                                            <span className="yellow-marker"></span>
                                            <p style={{ fontSize: '20px' }}>
                                                <b>{repo.name}</b>
                                            </p>
                                        </div>
                                        
                                        <p className="repo-card-description">
                                            {repo.description || 'Este usuário não forneceu nenhuma descrição'}
                                        </p>
                                        
                                        <div className="repo-card-icons-box">
                                            <div className="repo-card-stars">
                                                <BiStar size="18" color="#FFCE00" title="Estrelas recebidas" />
                                                <p style={{ fontSize: '15px' }}>{repo.stargazers_count}</p>
                                            </div>

                                            {
                                                !repo.private ?
                                                <FiUnlock size="18px" color="#63BF1F" title="Repositório público" />
                                                    :
                                                <FiLock size="18px" color="#CC042A" title="Repositório privado" />
                                            }
                                        </div>
                                    </div>
                                );
                            })
                    }
                </div>
            </div>

            <PagesBar />
        </div>
    );
}