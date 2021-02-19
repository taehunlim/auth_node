import axios from 'axios';
import {GET_ERRORS, SET_CURRENT_USER} from './types';
import {toast} from 'react-toastify';


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
