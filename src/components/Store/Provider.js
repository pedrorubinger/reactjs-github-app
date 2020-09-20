import React, { useState, createContext, useEffect } from 'react';

import { api } from '../../services/api';
const Context = createContext();

const StoreProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [mounted, setMount] = useState(false);
    const [userId, setUserId] = useState(-1);
    const [list, setList] = useState([]);
    const [componentLabel, setComponentLabel] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [replaceUser, setReplaceUser] = useState(false);
    const [invalidUser, setInvalidUser] = useState(false);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        checkAuth();
    }, []);

    async function getReposList(data = userData, spage = page) {
        if(data == null)
            data = userData;

        try {
            const response = await api.get(data.repos_url + '?page=' + spage);

            return response.data;
        } catch (error) {
            console.log(error);
            localStorage.clear();

            setAuthenticated(false);
            setMount(true);
        }
    }

    async function getFollowersList(data = userData, spage = page) {
        if(data == null)
            data = userData;

        try {
            const response = await api.get(data.followers_url + '?page=' + spage);

            return response.data;
        } catch (error) {
            console.log(error);
            localStorage.clear();

            setAuthenticated(false);
            setMount(true);
        }
    }

    async function getFollowingList(data = userData, spage = page) {
        if(data == null)
            data = userData;

        try {
            // Recorta a substring '{/other_user}'
            let followingUrl = data.following_url;
            const response = await api.get(followingUrl.substring(0, followingUrl.indexOf('{')) + '?page=' + spage);

            return response.data;
        } catch (error) {
            console.log(error);
            localStorage.clear();

            setAuthenticated(false);
            setMount(true);
        }
    }

    async function checkAuth(toggleUser) {
        const user = (toggleUser !== undefined ? toggleUser : localStorage.getItem('user'));

        if(!user) {
            setAuthenticated(false);
            setMount(true);
            return false;
        }

        try {
            const responseUser = await api.get('https://api.github.com/users/' + user);
            const responseReposList = await getReposList(responseUser.data);
            const responseFollowersList = await getFollowersList(responseUser.data);
            const responseFollowingList = await getFollowingList(responseUser.data);

            setUserData({
                login: responseUser.data.login,
                name: responseUser.data.name,
                email: responseUser.data.email,
                location: responseUser.data.location,
                company: responseUser.data.company,
                bio: responseUser.data.bio,
                avatar: responseUser.data.avatar_url,
                followers_url: responseUser.data.followers_url,
                following_url: responseUser.data.following_url,
                followersList: responseFollowersList,
                followingList: responseFollowingList,
                organizations: responseUser.data.organizations,
                starred: responseUser.data.starred,
                repos: responseUser.data.public_repos,
                repos_url: responseUser.data.repos_url,
                reposList: responseReposList,
                gists: responseUser.data.public_gists,
                followers: responseUser.data.followers,
                following: responseUser.data.following
            });

            setAuthenticated(true);
            setMount(true);

            return true;
        } catch (error) {
            console.log(error);
            localStorage.clear();

            setAuthenticated(false);
            setMount(true);

            return false;
        }
    }

    async function handleLogout() {
        localStorage.clear();
        setAuthenticated(false);
    }

    if(!mounted)
        return <h2>Loading...</h2>

    return(
        <Context.Provider
            value={{
                mounted,
                authenticated,
                userData,
                invalidUser,
                componentLabel,
                replaceUser,
                userId,
                page,
                totalPages,
                list,
                setPage,
                setList,
                setTotalPages,
                setUserId,
                checkAuth,
                handleLogout,
                setInvalidUser,
                setMount,
                setReplaceUser,
                setComponentLabel,
                getFollowersList,
                getFollowingList,
                getReposList,
                setUserData,
            }}
        >
            {children}
        </Context.Provider>
    );
}

export {StoreProvider, Context};