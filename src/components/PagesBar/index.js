import React, { useContext, useEffect } from 'react';

import './styles.css';
import { Context } from '../Store/Provider';

export default function PagesBar() {
    const {
            totalPages,
            page,
            setPage,
            getReposList,
            getFollowersList,
            getFollowingList,
            componentLabel,
            userData,
            setUserData,
        } = useContext(Context);

    const pages = Array.from(new Array(totalPages), (x, i) => i + 1);

    useEffect(() => {
        return () => setPage(1);
    }, [setPage]);

    const getMaxPage = (previousPage = false) => {
        if(previousPage)
            return Math.ceil((page - 5) / 5) * 5;

        return Math.ceil(page / 5) * 5;
    }
    
    const handleClickPage = async (clickedPage) => {
        if(clickedPage === page)
            return;

        setPage(clickedPage);

        if(componentLabel === "seguindo") {
            const list = await getFollowingList(undefined, clickedPage);
            setUserData({...userData, followingList: list });
        } else if(componentLabel === "seguidores") {
            const list = await getFollowersList(undefined, clickedPage);
            setUserData({...userData, followersList: list });
        } else {
            const list = await getReposList(undefined, clickedPage);
            setUserData({...userData, reposList: list });
        }
    }

    const handleClickContinuedPages = async (event, direction) => {
        event.preventDefault();

        if(direction === 'next') {
            const max = getMaxPage();
            await setPage(max + 1);
            await handleClickPage(max + 1);
        } else {
            const max = getMaxPage(true);
            await setPage(max);
            await handleClickPage(max);
        }
    }

    if(totalPages === 1)
        return <div id="pages-bar-container"></div>;

    return(
        <div id="pages-bar-container">
            {
                getMaxPage() > 5 ?
                    <span
                        id="back-pages"
                        className="page-item link"
                        title="Ver páginas anteriores"
                        onClick={async event => await handleClickContinuedPages(event, 'back')}
                    >
                        -
                    </span> : ''
            }

            {
                pages.slice(page == 1 ? 0 : getMaxPage() - 5, page + 4).map((item, index) => {
                    if(index < 5)
                        return(
                            <span
                                key={index}
                                className={page === item ? "page-item link active-page" : "page-item link" }
                                onClick={async event => {
                                    event.preventDefault();
                                    await handleClickPage(item)
                                }}
                            >
                                {item}
                            </span>
                        );
                })
            }

            {
                pages.length > 5 && (getMaxPage() <= totalPages) ?
                    <span
                        id="next-pages"
                        color="green"
                        className="page-item link"
                        title="Ver próximas páginas"
                        onClick={async event => await handleClickContinuedPages(event, 'next')}
                    >
                        +
                    </span> : ''
            }
        </div>
    );
}