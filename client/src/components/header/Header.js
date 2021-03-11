import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import HeaderContents from "./elements/HeaderContents";
import HeaderSearch from "./elements/HeaderSearch";
import ListControl from "./elements/ListControl";

import img from '../../assets/images/profile.jpg'

const Header = ({menuActiveState, setMenuActiveState, searchActiveState, setSearchActiveState}) => {

    const [headerContent, setHeaderContent] = useState([])

    const getData = async () => {
        const {data} = await axios.get('/blog')
        setHeaderContent(data)
    }

    useEffect(() => {
        getData();
    }, [setHeaderContent])

    return (
        <div className={`vertical-menu ${menuActiveState || searchActiveState ? "active" : ""}`}>


            <ul className="d-flex justify-content-between p-4 mb-0 text-black">
                <li>
                    <button onClick={() => setMenuActiveState(!menuActiveState)}>
                        <i className="fas fa-bars"></i>
                    </button>
                </li>

                <li className="d-flex flex-row-reverse">
                    <button
                        onClick={() =>{
                            setSearchActiveState(!searchActiveState)
                            setMenuActiveState(false)
                        }}>
                        {!searchActiveState ?
                            <i className="fas fa-search"></i>
                            : ""
                        }
                    </button>
                </li>
            </ul>

            {menuActiveState ?
                <HeaderContents content={headerContent}/> :
                <div className="profile text-center">
                    <div className="profile-caption">
                        <Link to="/">
                            <h2 className="name">우리집 존만이의 <br/> 개발 노트</h2>
                        </Link>
                    </div>
                    <div className="profile-image">
                        <img
                            src={img}
                            className="img-fluid"
                            alt=""
                        />
                    </div>
                </div>
            }


            <HeaderSearch
                activeStatus={searchActiveState}
                getActiveStatus={setSearchActiveState}
            />

            <ListControl/>


        </div>
    );
};

export default Header;
