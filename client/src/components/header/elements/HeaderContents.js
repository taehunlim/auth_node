import React from 'react';
import {Link} from 'react-router-dom'


const HeaderContents = ({activeState}) => {

    console.log(activeState)
    return (

        <div
            id="sidebar-menu"
        >
            <ul
                className={`${activeState ? "metismenu" : "d-none"}`}
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
