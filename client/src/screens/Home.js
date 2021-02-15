import React, {useState} from 'react';

import Header from "../components/header/Header";
import Post from "../components/Post";


const Home = () => {

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

            <Post
                activeState={menuActiveState || searchActiveState}
            />
        </div>
    );
};

export default Home;
