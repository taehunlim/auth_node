import React from 'react';
import {Link} from 'react-router-dom'


const HeaderContents = () => {
    return (

        <div
            id="sidebar-menu"
            style={{
                backgroundColor: "rgba(0, 0, 0, 0.4)"
            }}
        >
            <ul
                className="activeState metismenu"
                id="side-menu"
            >

                <li className="menu-title">
                    <Link to='/'>
                        ALL
                    </Link>
                </li>

                <li className="menu-title">
                    <Link to='/'>

                        Study
                    </Link>
                </li>

                <li>
                    <Link to="/" className="waves-effect">
                        <span> - REACT</span>
                    </Link>
                </li>

                <li>
                    <Link to="/" className="waves-effect">
                        <span> - REACT NATIVE</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default HeaderContents;
