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
    IoIosRedo,
    IoIosConstruct
} from "react-icons/io";
import {ToastContainer, toast} from 'react-toastify'
import axios from "axios";
import Moment from "react-moment";

import {isAuth} from "../../helpers/auth";

import img from '../../assets/images/sample.png'

const Detail = ({post}) => {

    const [formData, setFormData] = useState({
        reply: ""
    })
    const [authButton, setAuthButton] = useState(false);
    const [editButton, setEditButton] = useState(false);
    const [selectedData, setSelectedData] = useState(
        post.comments ? post.comments.filter(c => c._id) : ""
    );

    const {reply} = formData;

    const userVerification = JSON.parse(localStorage.getItem("user")).id;

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

    const deleteSubmit = e => {
        e.preventDefault();

        const token = localStorage.getItem("jwtToken");

        axios
            .put(`/blog/${post._id}/${selectedData}`, {}, {
                headers: {
                    Authorization: `bearer ${token}`
                }
            })
            .then(() => {
                window.location.replace(`/post/${post._id}`)
            })
            .catch(() => {
                console.log("fail")
            })
    }

    const editSubmit = e => {
        e.preventDefault();

        const token = localStorage.getItem("jwtToken");
        setFormData({...formData})

        if(reply) {
            axios
                .patch(`/blog/commentEdit/${post._id}/${selectedData}`, formData, {
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
    }

    return (
        <div className="blog-page-wrapper space-mb--r130 space-mt--r130">
            <ToastContainer/>
            <Link
                to={`/edit/${post._id}`}
                className="blog-grid-editBtn"
            >
                <IoIosConstruct/>
            </Link>
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
                                        REACT
                                    </Link>
                                </div>
                                <h2 className="post-title">{post.title}</h2>

                                <div className="post-info d-flex flex-wrap align-items-center space-mb--50">
                                    <div className="post-user">
                                        <IoIosPerson /> By
                                        <Link to="/">
                                            {post.handle}
                                        </Link>
                                    </div>
                                    <div className="post-date mb-0 space-pl--30">
                                        <IoIosCalendar />
                                        <p>

                                            <Moment
                                                date={post.createdAt}
                                                format="D MMM YYYY HH:mm"
                                            />

                                        </p>
                                    </div>
                                    <div className="post-category space-pl--30">
                                        <Link to="/">
                                            REACT
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
                                    <p
                                        className="space-mb--30"
                                        dangerouslySetInnerHTML={{__html: post.content}}
                                    />
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
                                <div className="blog-comment" key={reply._id}>
                                    <div className="blog-comment__image">
                                        <img
                                            src={img}
                                            className="img-fluid"
                                            alt=""
                                        />
                                    </div>

                                    <div className="blog-comment__content">
                                        <div className="username">
                                            {reply.handle}

                                            {reply.user && reply.user === userVerification ||
                                            isAuth() && isAuth().role === 'Admin' ? (
                                                <div className="menu">

                                                    <button
                                                        onClick={() => {
                                                            setAuthButton(!authButton)
                                                            setSelectedData(reply._id)
                                                        }}
                                                    >
                                                        ⋮
                                                    </button>

                                                    {authButton === true &&
                                                    selectedData === reply._id ?
                                                        <ul>
                                                            {reply.user && reply.user === userVerification ?
                                                                <li>
                                                                    <button
                                                                        onClick={() => setEditButton(!editButton)}
                                                                    >
                                                                        수정
                                                                    </button>/
                                                                </li>
                                                            : ""}


                                                            <li>
                                                                <form onSubmit={deleteSubmit}>
                                                                    <button
                                                                        type="submit"
                                                                    >
                                                                        삭제
                                                                    </button>
                                                                </form>
                                                            </li>
                                                        </ul>
                                                        : ""
                                                    }
                                                </div>
                                                ) : ""
                                            }

                                            <span className="date">
                                                <Moment
                                                    date={reply.date}
                                                    format="D MMM YYYY HH:mm"
                                                />
                                            </span>
                                        </div>

                                        <p className="message">

                                            {authButton === true &&
                                            editButton === true &&
                                            selectedData === reply._id ?
                                            (
                                                <div className="comment-form w-75">
                                                    <form
                                                        className="reply"
                                                        onSubmit={editSubmit}>
                                                        <div>
                                                            <textarea
                                                                defaultValue={reply.reply}
                                                                className=""
                                                                onChange={handleChange('reply')}
                                                            />
                                                        </div>

                                                        <div className="text-right p-2">
                                                            <button
                                                                type="submit"
                                                                className="blog-button blog-button--small"
                                                            >
                                                                submit
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            ) : (
                                                <span>
                                                   {reply.reply}
                                                </span>
                                                )
                                            }

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
