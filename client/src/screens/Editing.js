import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';

import Posting from "../components/blog/Posting";

const Editing = () => {

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
        <Posting
            post={posts}
        />
    );
};

export default Editing;
