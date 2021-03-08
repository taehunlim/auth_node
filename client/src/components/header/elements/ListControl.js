import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Modal, Card} from 'react-bootstrap';

import AccountModal from "../../accountModal/AccountModal";
import {isAuth} from '../../../helpers/auth';

import img from '../../../assets/images/error-img.png'

const ListControl = () => {

    const [modal, setModal] = useState(false)
    const [modalMessage, setModalMessage] = useState(false)


    return (
        <div className="list-control">
            <ul className="d-block text-center text-black">
                <li>
                    {isAuth() && isAuth().role === "Admin" ?
                        <Link
                            to="/write"
                            alt="write"
                        >
                            <i className="fas fa-edit"></i>
                        </Link> :
                        <button
                            onClick={() => setModalMessage(true)}
                        >
                            <i className="fas fa-edit"></i>
                        </button>
                    }
                </li>
                <li>
                    <button
                        onClick={() => setModal(true)}
                    >
                        <i className="fas fa-address-book"></i>
                    </button>

                </li>
                <li>
                    <button>
                        <i className="fas fa-cog"></i>
                    </button>

                </li>
            </ul>


            <AccountModal
                show={modal}
                onHide={() => setModal(false)}
            />


            {/*Role ==== user */}
            <Modal
                show={modalMessage}
                onHide={() => setModalMessage(false)}
            >
                <Modal.Header
                    closeButton
                    className="modal-header"
                >
                    Posting is available only to the administrator.
                </Modal.Header>
                <Modal.Body>
                    <Card>
                        <Card.Body>
                            <img src={img} className="img-fluid"/>
                        </Card.Body>
                    </Card>
                </Modal.Body>
            </Modal>

        </div>
    );
};

export default ListControl;
