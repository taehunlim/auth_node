import React from 'react';
import {Link} from 'react-router-dom'

const HeaderContents = ({content}) => {
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
                            it
                        </Link>
                    </li>

                    {content.map(ctg =>
                        <li>
                            {ctg.category.mainCategory === "it" ?
                                <Link to="/" className="waves-effect text-uppercase">
                                    <span> - {ctg.category.subcategory}</span>
                                </Link>
                                : ""}
                        </li>
                    )}

                    <li className="menu-title">
                        <Link to='/'>
                            일상
                        </Link>
                    </li>

                    {content.map(ctg =>
                        <li>
                            {ctg.category.mainCategory === "lifestyle" ?
                                <Link to="/" className="waves-effect text-uppercase">
                                    <span> - {ctg.category.subcategory}</span>
                                </Link>
                                : ""}
                        </li>
                    )}
                </ul>

        </div>
    );
};

export default HeaderContents;
