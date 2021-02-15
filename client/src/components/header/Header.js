import React, {useState} from 'react';

import HeaderContents from "./elements/HeaderContents";
import ListControl from "./elements/ListControl";


import img from '../../assets/images/sample.png'

const Header = () => {

    const [menuActiveState, setMenuActiveState] = useState(false)
    const [searchActiveState, setSearchActiveState] = useState(false)

    return (
        <div className="vertical-menu bg-info">


            <ul className="d-flex justify-content-between p-4">
                <li>
                    <button onClick={() => setMenuActiveState(!menuActiveState)}>
                        <i className="fas fa-bars"></i>
                    </button>
                </li>

                <li>
                    <button onClick={() => setSearchActiveState(!searchActiveState)}>
                        <i className="fas fa-search"></i>
                    </button>
                </li>
            </ul>



            <div>
                <div className="profile text-center">
                    <div className="profile-caption">
                        <h2 className="name">name</h2>
                    </div>
                    <div className="profile-image">
                        <img
                            src={img}
                            className="img-fluid"
                            alt=""
                        />
                    </div>
                </div>
            </div>


            <HeaderContents
                activeState={menuActiveState}
            />

            <ListControl/>


        </div>
    );
};

export default Header;
