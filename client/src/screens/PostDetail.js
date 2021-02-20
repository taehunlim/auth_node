import React, {useState} from 'react';

import Header from "../components/header/Header";
import Detail from "../components/blog/Detail";

const PostDetail = () => {

    const [menuActiveState, setMenuActiveState] = useState(false)
    const [searchActiveState, setSearchActiveState] = useState(false)

    return (
        <div>
            <Header
                menuActiveState={menuActiveState}
                setMenuActiveState={setMenuActiveState}
                searchActiveState={searchActiveState}
                setSearchActiveState={setSearchActiveState}
            />
            <div className="main-content">
                <Detail/>
            </div>
        </div>
    );
};

export default PostDetail;
