import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from "axios";

import Header from "../components/header/Header";
import Detail from "../components/blog/Detail";


const PostDetail = () => {

    const [menuActiveState, setMenuActiveState] = useState(false)
    const [searchActiveState, setSearchActiveState] = useState(false)
    const [posts, setPosts] = useState({})

    const {id} = useParams();

    const getData = async () => {
        const {data} = await axios.get(`/blog/${id}`)

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
            <div className="main-content">
                <Detail post={posts}/>
            </div>
        </div>
    );
};

export default PostDetail;
