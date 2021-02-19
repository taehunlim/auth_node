import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { IoIosCalendar, IoIosAdd } from "react-icons/io";


import img from '../../assets/images/sample.png'

const Post = ({activeState, posts}) => {
    return (
        <div className={`main-content space-mb--r130 space-mt--r130 ${activeState ? "active": ""}`}>
            <Container>
                <Row>
                    {posts && posts.map(post => (
                        <Col lg={12} className="space-mb--60">
                            <div className="blog-grid-post blog-grid-post--list">
                                <Col lg={9} className="p-0">
                                    <div className="blog-grid-post__content">
                                        <div className="post-date">
                                            <IoIosCalendar />
                                            <Link
                                                to="/"
                                            >
                                                <a> june 5, 2020</a>
                                            </Link>
                                        </div>
                                        <h2 className="post-title">
                                            <Link
                                                to="/"
                                            >
                                                <a>{post.title}</a>
                                            </Link>
                                        </h2>
                                        <p className="post-excerpt">
                                            {post.content}
                                        </p>
                                        <Link
                                            to="/"
                                            className="blog-readmore-btn">
                                            <IoIosAdd /> read more
                                        </Link>
                                    </div>
                                </Col>

                                <Col lg={3} className="p-0">
                                    <div className="blog-grid-post__image">
                                        <Link
                                            to="/"
                                            className="img-fluid"
                                        >
                                            <img
                                                src={post.image}
                                            />
                                        </Link>
                                    </div>
                                </Col>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>

        </div>
    );
};

export default Post;
