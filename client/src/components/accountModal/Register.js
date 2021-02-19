import React, {useState} from 'react';
import {Card} from 'react-bootstrap';
import {ToastContainer, toast} from 'react-toastify'
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import {registerUser} from '../../actions/authActions';

const Register = ({registerUser, history}) => {

    const [formData, setFormData] = useState({
        title: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        acceptTerms: true,
        textChange: "JOIN"
    });
    const [agree, setAgree] = useState(false)

    const {title, firstName, lastName, email, password, confirmPassword, textChange} = formData;

    const handleChange = text => e => {
        setFormData({...formData, [text]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault();

        if( title && firstName && lastName && email && password ) {
            if( password === confirmPassword ) {
                if( password.length >= 6) {
                    setFormData({...formData, textChange: "SUBMITTING", acceptTerms: true})

                    registerUser(formData, history)
                }


                else {
                    toast.error("Password length must be at least 6 characters")
                }
            }
            else {
                toast.error("Please Check the Confirm Password")
            }
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
                            SIGN UP
                        </h1>
                        <form
                            className="account__form"
                            onSubmit={handleSubmit}
                        >
                            <div className="text-field">
                                <input

                                    placeholder="Title"
                                    type="text"
                                    onChange={handleChange('title')}
                                    value={title}
                                />
                                <input
                                    className="w-100 p-2 mt-3"
                                    placeholder="First Name"
                                    type="text"
                                    onChange={handleChange('firstName')}
                                    value={firstName}
                                />
                                <input
                                    className="w-100 p-2 mt-3"
                                    placeholder="Last Name"
                                    type="text"
                                    onChange={handleChange('lastName')}
                                    value={lastName}
                                />
                                <input
                                    className="w-100 p-2 mt-3"
                                    placeholder="Email"
                                    type='email'
                                    onChange={handleChange('email')}
                                    value={email}
                                />
                                <input
                                    className="w-100 p-2 mt-3"
                                    placeholder="Password"
                                    type="password"
                                    onChange={handleChange('password')}
                                    value={password}
                                />
                                <input
                                    className="w-100 p-2 mt-3"
                                    placeholder="Confirm Password"
                                    type="password"
                                    onChange={handleChange('confirmPassword')}
                                    value={confirmPassword}
                                />
                            </div>

                            <div className="accept">

                                <input
                                    type="checkbox"
                                    onClick={() => setAgree(!agree)}
                                />
                                <label className="mb-0 ml-2">Accept privacy policy and terms</label>
                            </div>


                            <button
                                className="blog-button w-100 p-2 mb-5"
                                type="submit"
                                disabled={!agree}
                            >
                                <i className='fas fa-user-plus p-2'/>
                                <span>{textChange}</span>
                            </button>

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

export default connect(mapStateToProps, {registerUser})(withRouter(Register));
