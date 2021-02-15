import React from 'react';
import { Container} from "react-bootstrap";

import Header from "../components/header/Header";
import Post from "../components/Post";


const Home = () => {
    return (
        <div>
            <Header/>

            <div className="main-content space-mb--r130 space-mt--r130">
                <Container>
                    <Post/>
                </Container>
            </div>
        </div>
    );
};

export default Home;
