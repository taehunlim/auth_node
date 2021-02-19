import React, {useState} from 'react';
import {Card} from 'react-bootstrap';
import {ToastContainer, toast} from 'react-toastify'
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

import {loginUser} from '../../actions/authActions'


const Authenticate = ({loginUser, history}) => {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        textChange: "Sing In"
    })

    const {email, password, textChange} = formData;

    const handleChange = text => e => {
        setFormData({...formData, [text]: e.target.value})
    }


    const handleSubmit = e => {
        e.preventDefault();

        if(email && password) {
            setFormData({...formData})

            loginUser(formData, history)
        }
        else {
            toast.error("Please fill all fields ")
        }
    }

    return (
        <div className="account">
            <ToastContainer/>
            <div className="d-flex">
                <Card className="text-center border-top-0">
                    <Card.Body className="mt-5">
                        <h1>
                            SIGN IN
                        </h1>
                        <form
                            className="account__form"
                            onSubmit={handleSubmit}
                        >

                            <div className="social">
                                <button
                                    type="submit"
                                    className="blog-button"
                                >
                                    <i className='fab fa-google p-2'/>
                                    <span>Sign In with Google</span>
                                </button>



                                <button
                                    type="submit"
                                    className="blog-button"
                                >
                                    <i className='fab fa-facebook p-2'/>
                                    <span>Sign In with Facebook</span>
                                </button>
                            </div>



                            <div className='d-block border-bottom mt-5 mb-5'>
                                <div className="account__grid">
                                    Social login
                                </div>
                            </div>

                            <div className="text-field">
                                <input
                                    placeholder="Email"
                                    type='email'
                                    onChange={handleChange('email')}
                                    value={email}
                                />
                                <input
                                    placeholder="Password"
                                    type="password"
                                    onChange={handleChange('password')}
                                    value={password}
                                />

                                <button
                                    className="blog-button w-100 p-2 mt-5 mb-5"
                                    type="submit"
                                >
                                    <i className='fas fa-sign-in-alt p-2'/>
                                    <span>{textChange}</span>
                                </button>
                            </div>
                        </form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};


const mapStateToProps = state => ({
    auth: state.authData,
    errors: state.errors
})

export default connect(mapStateToProps, {loginUser})(withRouter(Authenticate));
