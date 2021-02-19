import React, {useEffect, useState} from 'react';
import {toast, ToastContainer} from "react-toastify";
import {Card} from "react-bootstrap";
import axios from "axios";

import Header from "../components/header/Header";

const Verification = ({match, history}) => {

    const [menuActiveState, setMenuActiveState] = useState(false)
    const [searchActiveState, setSearchActiveState] = useState(false)

    const [formData, setFormData] = useState({
        token: ""
    });

    const {token} = formData;

    useEffect(() => {
        let token = match.params.token;

        if(token) {
            setFormData(token)
        }
    }, [match.params])



    const handleSubmit = e => {
        e.preventDefault();
        axios
            .post("http://localhost:5000/account/verify-email", {
                token
            })
            .then(res => {
                setFormData({
                    ...formData
                })

                toast.success(res.data.message)
                window.setTimeout(() => {
                    history.push('/')
                }, 5500)
            })
            .catch(() => {
                toast.error("Verification failed")
            })
    }

    return (
        <div>
            <Header
                menuActiveState={menuActiveState}
                setMenuActiveState={setMenuActiveState}
                searchActiveState={searchActiveState}
                setSearchActiveState={setSearchActiveState}
            />

            <div className="verification">
                <ToastContainer/>
                <div className="main-content d-flex justify-content-center">
                    <div className="text-center mt-5 w-75">
                        <Card>

                            <Card.Body>
                                <h1>
                                    Welcome
                                </h1>
                                <form
                                    className="ml-auto mr-auto w-75 mt-4"
                                    onSubmit={handleSubmit}
                                >
                                    <div>
                                        <button
                                            className="w-100 p-2 border-0"
                                            type="submit"
                                        >
                                            Activate your account
                                        </button>
                                    </div>
                                </form>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Verification;
