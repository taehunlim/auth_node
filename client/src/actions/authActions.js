import axios from 'axios';
import {GET_ERRORS, SET_CURRENT_USER} from './types';
import {toast} from 'react-toastify';
import jwt_decoded from 'jwt-decode';

import {authenticate} from '../helpers/auth'
import setAuthToken from "../utills/setAuthToken";


export const registerUser = (userData, history) => dispatch => {

    dispatch({
        type: SET_CURRENT_USER
    });

    axios
        .post("http://localhost:5000/account/register", userData)
        .then(res => {
            toast.success(res.data.message)
            window.setTimeout(() => {
                history.push('/write')
            }, 5500)
        })
        .catch(err => (
            dispatch({
                type: GET_ERRORS,
                payload: err.response
            })
        ))
}

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const loginUser = (userData, history) => dispatch => {

    dispatch({
        type: SET_CURRENT_USER
    });

    axios
        .post("http://localhost:5000/account/authenticate", userData)
        .then(res => {

            authenticate(res, () => {
                const {jwtToken} = res.data

                localStorage.setItem("jwtToken", jwtToken)

                setAuthToken(jwtToken)

                const decoded = jwt_decoded(jwtToken)

                dispatch(setCurrentUser(decoded))
            })

            setTimeout(() => {
                history.push('/.')
            })
        })
        .catch(err => {
            toast.error("Email or Password is incorrect")
            dispatch({
                type: GET_ERRORS,
                payload: err.response
            })
        })
}
