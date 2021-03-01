import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { IoIosCalendar, IoIosAdd } from "react-icons/io";
import Moment from "react-moment";


import img from '../../assets/images/sample.png'

const Post = ({activeState, posts}) => {
    return (
        <div className={`main-content space-mb--r130 space-mt--r130 ${activeState ? "active": ""}`}>
            <Container>
                <Row>
                    {posts && posts.map((post, i) => (
                        <Col lg={12} className="space-mb--60" key={i}>
                            <div className="blog-grid-post blog-grid-post--list">
                                <Col lg={9} className="p-0">
                                    <div className="blog-grid-post__content">
                                        <div className="post-date">
                                            <IoIosCalendar />
                                            <Link
                                                to="/"
                                            >
                                                <Moment
                                                    date={post.createdAt}
                                                    format="D MMM YYYY HH:mm"
                                                />
                                            </Link>
                                        </div>
                                        <h2 className="post-title">
                                            <Link
                                                to={`/post/${post._id}`}
                                            >
                                                {post.title}
                                            </Link>
                                        </h2>
                                        <p className="post-excerpt">
                                            {post.content}
                                        </p>
                                        <Link
                                            to={`/post/${post._id}`}
                                            className="blog-readmore-btn">
                                            <IoIosAdd /> read more
                                        </Link>
                                    </div>
                                </Col>

                                <Col lg={3} className="p-0">
                                    <div className="blog-grid-post__image">
                                        <Link
                                            to={`/post/${post._id}`}
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
