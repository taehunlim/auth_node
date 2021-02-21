import React, {useState} from 'react';
import { Container, Row, Col } from "react-bootstrap";
import {Link} from 'react-router-dom';
import {
    IoIosCalendar,
    IoIosPerson,
    IoMdChatbubbles,
    IoLogoFacebook,
    IoLogoTwitter,
    IoLogoGoogleplus,
    IoLogoPinterest,
    IoMdPricetags,
    IoIosRedo
} from "react-icons/io";
import {ToastContainer, toast} from 'react-toastify'
import axios from "axios";

import Moment from "react-moment";

import img from '../../assets/images/sample.png'

const Detail = ({post}) => {

    const [formData, setFormData] = useState({
        reply: ""
    })

    const {reply} = formData;

    const handleChange = text => e => {
        setFormData({...formData, [text]: e.target.value});
    };

    const handleSubmit = e => {
        e.preventDefault();

        const token = localStorage.getItem("jwtToken");
        setFormData({...formData})

        if(reply) {
            axios
                .post(`/blog/comments/${post._id}`, formData, {
                    headers: {
                        Authorization: `bearer ${token}`
                    }
                })
                .then(res => {
                    setFormData({
                        ...formData,
                        reply: ""
                    });
                    window.location.replace(`/post/${post._id}`)
                })
                .catch(err => {
                    console.log(err)
                })
        }
        else {
            toast.error("reply field is required")
        }
    };

    return (
        <div className="blog-page-wrapper space-mb--r130 space-mt--r130">
            <ToastContainer/>
            <Container>
                <Row>
                    <Col lg={12}>
                        <div className="blog-grid-post blog-grid-post--sticky space-pb--50 space-mb--40">
                            <div className="blog-grid-post__image blog-grid-post--sticky__image space-mb--30">
                                <img
                                    src={post.image}
                                    className="img-fluid"
                                    alt=""
                                />
                            </div>
                            <div className="blog-grid-post__content blog-grid-post--sticky__content">
                                <div className="post-category space-mb--10">
                                    <Link to="/">
                                        <a>REACT</a>
                                    </Link>
                                </div>
                                <h2 className="post-title">{post.title}</h2>

                                <div className="post-info d-flex flex-wrap align-items-center space-mb--50">
                                    <div className="post-user">
                                        <IoIosPerson /> By
                                        <Link to="/">
                                            <a> {post.handle} </a>
                                        </Link>
                                    </div>
                                    <div className="post-date mb-0 space-pl--30">
                                        <IoIosCalendar />
                                        <Link to="/">
                                            <a>
                                                <Moment
                                                    date={post.createdAt}
                                                    format="D MMM YYYY HH:mm"
                                                />
                                            </a>
                                        </Link>
                                    </div>
                                    <div className="post-category space-pl--30">
                                        <Link to="/">
                                            <a>REACT</a>
                                        </Link>
                                    </div>
                                    <div className="post-comment space-pl--30">
                                        <IoMdChatbubbles />
                                        <a href="#">
                                            {post.comments && post.comments.length} Comments
                                        </a>
                                    </div>
                                </div>

                                <div className="blog-post-section">
                                    {/*<h3 className="space-mb--30">Section Title</h3>*/}
                                    <p className="space-mb--30">
                                        {post.content}
                                    </p>
                                </div>

                                <Row className="space-mt--30 align-items-center">
                                    <Col md={6} className="text-center text-md-left">
                                        <div className="post-tags">
                                            <IoMdPricetags />
                                            <ul className="tag-list">
                                                <li>
                                                    <a href="#">React</a>,
                                                </li>
                                                <li>
                                                    <a href="#">React Native</a>,
                                                </li>
                                            </ul>
                                        </div>
                                    </Col>
                                    <Col md={6} className="text-center text-md-right">
                                        <div className="post-share">
                                            <span>Share this post:</span>
                                            <ul>
                                                <li>
                                                    <a href="#">
                                                        <IoLogoFacebook />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <IoLogoTwitter />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <IoLogoGoogleplus />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <IoLogoPinterest />
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>

                        <div className="comments-wrapper space-mb--40">
                            <h2 className="comment-title space-mb--30">
                                Comments <span>({post.comments && post.comments.length})</span>
                            </h2>

                            {post.comments && post.comments.map(reply => (
                                <div className="blog-comment">
                                    <div className="blog-comment__image">
                                        <img
                                            src={img}
                                            className="img-fluid"
                                            alt=""
                                        />
                                    </div>
                                    <div className="blog-comment__content">
                                        <p className="username">
                                            {reply.handle}
                                            <span className="date">
                                                <Moment
                                                    date={reply.date}
                                                    format="D MMM YYYY HH:mm"
                                                />
                                            </span>
                                        </p>

                                        <p className="message">
                                            {reply.reply}
                                        </p>

                                        <a href="#" className="reply-link">
                                            <IoIosRedo /> reply
                                        </a>
                                    </div>
                                </div>
                            ))}

                            {/*--- reply of reply ---*/}

                            {/*<div className="blog-comment blog-comment--reply">*/}
                            {/*    <div className="blog-comment__image">*/}
                            {/*        <img*/}
                            {/*            src={img}*/}
                            {/*            className="img-fluid"*/}
                            {/*            alt=""*/}
                            {/*        />*/}
                            {/*    </div>*/}
                            {/*    <div className="blog-comment__content">*/}
                            {/*        <p className="username">*/}
                            {/*            Name <span className="date">/ Feb 2, 2021</span>*/}
                            {/*        </p>*/}

                            {/*        <p className="message">*/}
                            {/*            Thanks for*/}
                            {/*        </p>*/}

                            {/*        <a href="#" className="reply-link">*/}
                            {/*            <IoIosRedo /> reply*/}
                            {/*        </a>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </div>

                        <div className="comment-form">
                            <div>
                                <h2 className="comment-title space-mb--30">
                                    Write comments
                                </h2>
                                {/*=======  comment form  =======*/}
                                <div className="comment-form comment-form">
                                    <form onSubmit={handleSubmit}>
                                        <Row>
                                            {/*<Col lg={6} className="space-mb--20">*/}
                                            {/*    <input type="text" placeholder="Name (*)" required />*/}
                                            {/*</Col>*/}

                                            {/*<Col lg={6} className="space-mb--20">*/}
                                            {/*    <input*/}
                                            {/*        type="password"*/}
                                            {/*        placeholder="Password (*)"*/}
                                            {/*        required*/}
                                            {/*    />*/}
                                            {/*</Col>*/}

                                            <Col lg={12} className="space-mb--20">
                                                <textarea
                                                  cols={30}
                                                  rows={10}
                                                  placeholder="Message"
                                                  defaultValue={""}
                                                  className="border-top"
                                                  onChange={handleChange('reply')}
                                                  value={reply}
                                                />
                                            </Col>

                                            <Col lg={12} className="text-center">
                                                <button
                                                    type="submit"
                                                    className="blog-button blog-button--medium"
                                                >
                                                    submit
                                                </button>
                                            </Col>
                                        </Row>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Detail;
