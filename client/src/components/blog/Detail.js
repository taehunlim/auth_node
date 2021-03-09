import React, {useState} from 'react';
import { Container, Row, Col } from "react-bootstrap";
import {Link} from 'react-router-dom';
import {
    IoIosCalendar,
    IoIosPerson,
    IoMdChatbubbles,
    IoLogoFacebook,
    IoLogoTwitter,
    IoLogoInstagram,
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
        comment: "",
    })
    const [replyData, setReplyData] = useState({
        reply: "",
    })
    const [authButton, setAuthButton] = useState(false);
    const [editButton, setEditButton] = useState(false);
    const [replyButton, setReplyButton] = useState(false);
    const [selectedData, setSelectedData] = useState();

    const getCommentData = post.comments
        ? post.comments.filter(c => c.replies.find(r => r._id === selectedData))
        : ""
    const getCommentId = getCommentData[0] ? getCommentData[0]._id : ""


    const {comment} = formData;
    const {reply} = replyData;
    const token = localStorage.jwtToken;
    const allComments = post.comments ?
        post.comments.map(replies => replies).length > 0 ?
            post.comments.length + post.comments.map(reply => reply.replies.length).reduce((a, b) => a+b)
            : ""
        : ""


    const handleChange = text => e => {
        setFormData({...formData, [text]: e.target.value});
        setReplyData({...replyData, [text]: e.target.value});
    };

    const handleSubmit = e => {
        e.preventDefault();

        setFormData({...formData})

        if(token) {
            if(comment) {
                axios
                    .post(`/blog/comments/${post._id}`, formData, {
                        headers: {
                            Authorization: `bearer ${token}`
                        }
                    })
                    .then(res => {
                        setFormData({
                            ...formData,
                            comment: ""
                        });
                        window.location.replace(`/post/${post._id}`)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
            else {
                toast.error("comment field is required")
            }
        }
        else {
            toast.error('please log in')
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

        if(comment) {
            axios
                .patch(`/blog/commentEdit/${post._id}/${selectedData}`, formData, {
                    headers: {
                        Authorization: `bearer ${token}`
                    }
                })
                .then(res => {
                    setFormData({
                        ...formData,
                        comment: ""
                    });
                    window.location.replace(`/post/${post._id}`)
                })
                .catch(err => {
                    console.log(err)
                })
        }
        else {
            toast.error("comment field is required")
        }
    }

    const replySubmit = e => {
        e.preventDefault();

        setReplyData({...replyData})

        if(token) {
            if(reply) {
                axios
                    .post(`/blog/reply/${post._id}/${selectedData}`, replyData, {
                        headers: {
                            Authorization: `bearer ${token}`
                        }
                    })
                    .then(res => {
                        setReplyData({
                            ...replyData,
                            reply: ""
                        });
                        window.location.replace(`/post/${post._id}`)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
            else {
                toast.error("comment field is required")
            }
        }
        else {
            toast.error('please log in')
        }
    };

    const replyEditSubmit = e => {
        e.preventDefault();

        const token = localStorage.getItem("jwtToken");
        setReplyData({...replyData})

        if(token) {
            if(reply) {
                axios
                    .patch(`/blog/replyEdit/${post._id}/${getCommentId}/${selectedData}`, replyData, {
                        headers: {
                            Authorization: `bearer ${token}`
                        }
                    })
                    .then(res => {
                        setFormData({
                            ...replyData,
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
        else {
            toast.error('please log in')
        }
    }

    return (
        <div className="blog-page-wrapper space-mb--r130 space-mt--r130">
            <ToastContainer/>
            {isAuth() && isAuth().role === "Admin" ?
                <Link
                    to={`/edit/${post._id}`}
                    className="blog-grid-editBtn"
                >
                    <IoIosConstruct/>
                </Link> : ""
            }

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
                                            {allComments}
                                            Comments
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
                                                    <a href="https://www.facebook.com/" target="_blank">
                                                        <IoLogoFacebook />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="https://twitter.com/" target="_blank">
                                                        <IoLogoTwitter />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="https://www.instagram.com/" target="_blank">
                                                        <IoLogoInstagram />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="https://www.pinterest.co.kr/" target="_blank">
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
                                Comments <span>({allComments})</span>
                            </h2>

                            {post.comments && post.comments.map((comment, i) => (
                                <div key={i}>
                                    {/*comment*/}
                                    <div className="blog-comment" key={comment._id}>
                                        <div className="blog-comment__image">
                                            <img
                                                src={img}
                                                className="img-fluid"
                                                alt=""
                                            />
                                        </div>

                                        <div className="blog-comment__content">
                                            <div className="username">
                                                {comment.handle}

                                                {(comment.user && comment.user === isAuth().id ||
                                                    isAuth() && isAuth().role === 'Admin') && token !== "" ? (
                                                    <div className="menu">
                                                        <button
                                                            onClick={() => {
                                                                setAuthButton(!authButton)
                                                                setSelectedData(comment._id)
                                                            }}
                                                        >
                                                            ⋮
                                                        </button>

                                                        {authButton === true &&
                                                        selectedData === comment._id ?
                                                            <ul>
                                                                {comment.user && comment.user === isAuth().id ?
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
                                                        date={comment.date}
                                                        format="D MMM YYYY HH:mm"
                                                    />
                                                </span>
                                            </div>

                                            <div className="message">

                                                {authButton === true &&
                                                editButton === true &&
                                                selectedData === comment._id ?
                                                    (
                                                        <div className="comment-form w-75">
                                                            <form
                                                                className="reply"
                                                                onSubmit={editSubmit}
                                                            >
                                                                <div>
                                                                    <textarea
                                                                        defaultValue={comment.comment}
                                                                        className=""
                                                                        onChange={handleChange('comment')}
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
                                                           {comment.comment}
                                                        </span>
                                                    )
                                                }

                                            </div>

                                            <button
                                                className="reply-button"
                                                onClick={() => {
                                                    setReplyButton(!replyButton)
                                                    setSelectedData(comment._id)
                                                }}
                                            >
                                                <IoIosRedo /> reply
                                            </button>

                                            {replyButton &&  selectedData === comment._id? (
                                                <div className="comment-form w-75">
                                                    <form
                                                        className="reply"
                                                        onSubmit={replySubmit}
                                                    >
                                                        <div>
                                                            <textarea
                                                                className=""
                                                                onChange={handleChange("reply")}
                                                                defaultValue={reply}
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
                                                ""
                                            )}


                                        </div>
                                    </div>

                                    {/*--- reply of comment ---*/}
                                    {comment && comment.replies.map((reply, k) => (
                                        <div key={k} className="blog-comment blog-comment--reply">
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

                                                    {(reply.user && reply.user === isAuth() && isAuth().id ||
                                                        isAuth() && isAuth().role === 'Admin') && token !== "" ? (
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
                                                                    {reply.user && reply.user === isAuth().id ?
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

                                                <div className="message">

                                                    {authButton === true &&
                                                    editButton === true &&
                                                    selectedData === reply._id ?
                                                        (
                                                            <div className="comment-form w-75">
                                                                <form
                                                                    className="reply"
                                                                    onSubmit={replyEditSubmit}
                                                                >
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

                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                </div>

                            ))}
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
                                            <Col lg={12} className="space-mb--20">
                                                <textarea
                                                  cols={30}
                                                  rows={10}
                                                  placeholder="Message"
                                                  className="border-top"
                                                  onChange={handleChange('comment')}
                                                  value={comment}
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
