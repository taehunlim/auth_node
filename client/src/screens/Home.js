import React, {useState, useEffect} from 'react';
import axios from 'axios';

import Header from "../components/header/Header";
import Post from "../components/blog/Post";


const Home = () => {

    const [menuActiveState, setMenuActiveState] = useState(false)
    const [searchActiveState, setSearchActiveState] = useState(false)
    const [posts, setPosts] = useState([])

    const getData = async () => {
        const {data} = await axios.get('/blog')
        setPosts(data)
    };

    useEffect(() => {
        getData()
    }, [setPosts])

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
                posts={posts}
            />
        </div>
    );
};

export default Home;
