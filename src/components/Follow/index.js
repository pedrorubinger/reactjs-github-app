import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AiOutlineArrowRight } from 'react-icons/ai';

import './styles.css';
import { Context } from '../Store/Provider';
import { Link } from 'react-router-dom';

export default function Follow() {
    const {
            userData,
            componentLabel,
            list,
            setList,
            userId,
            setUserId,
            checkAuth,
            setReplaceUser,
            setTotalPages,
        } = useContext(Context);
    const history = useHistory();

    useEffect(() => {
        if(componentLabel === "seguidores") {
            const pages = Math.ceil(userData.followers / 30);

            setList(userData.followersList);
            setTotalPages(pages);
        } else {
            const pages = Math.ceil(userData.following / 30);

            setList(userData.followingList);
            setTotalPages(pages);
        }

        return () => setUserId(-1);
    }, [
        setUserId,
        userData.followersList,
        userData.followers,
        userData.followingList,
        userData.following,
        setList,
        setTotalPages,
        componentLabel
    ]);

    const openProfile = async (event, user, id) => {
        event.preventDefault();
        
        setUserId(id);
        setReplaceUser(true);
        await checkAuth(user);

        history.push('/');
    }
    
    return(
        <div id="follow-content">
            <div className="cards-box">
                {
                    list.length === 0 ?
                        <p className="empty-message">
                            {
                                componentLabel === "seguidores" ?
                                    'Este usuário não possui nenhum seguidor.'
                                :
                                    'Este usuário não está seguindo ninguém.'
                            }
                        </p>
                    :
                        list.map(follow => {
                            return(
                                <div className="card-item" key={follow.id}>
                                    <div className="card-title-group">
                                        <span className="yellow-marker"></span>

                                        <div className="avatar-login-group">
                                            <img
                                                src={follow.avatar_url}
                                                className="profile-photo"
                                                width="64"
                                                height="64"    
                                                alt="profile"
                                            />

                                            <p className="login-tag">
                                                <b>#{follow.login}</b>

                                                {
                                                    userId === follow.id ?
                                                        <span className="loading-profile">Carregando...</span>
                                                    :
                                                        ''
                                                }
                                            </p>
                                        </div>

                                        <Link to="/">
                                            <AiOutlineArrowRight
                                                size="18"
                                                color="orange"
                                                onClick={async evt => await openProfile(evt, follow.login, follow.id)}
                                            />
                                        </Link>
                                    </div>
                                </div>
                            );
                        })
                }
            </div>
        </div>
    );
}