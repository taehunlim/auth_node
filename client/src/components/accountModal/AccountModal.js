import React, {useState} from 'react';
import {Modal, Tab, Tabs} from "react-bootstrap";
import Authenticate from "./Authenticate";
import Register from "./Register";

const AccountModal = () => {

    const [modal, setModal] = useState(false)

    return (
        <div>
            <button
                onClick={() => setModal(true)}
            >
                register
            </button>
            <Modal
                show={modal}
                onHide={() => setModal(false)}
                className="account-modal"
            >
                <Modal.Header
                    closeButton
                    className="modal-header"
                >
                    {/*<h2>*/}
                    {/*    welcome*/}
                    {/*</h2>*/}
                </Modal.Header>
                <Modal.Body className="modal-body">
                    <Tabs
                        defaultActiveKey="signin"
                        className="justify-content-center"
                    >
                        <Tab eventKey="signin" title="SIGN IN">
                            <Authenticate/>
                        </Tab>
                        <Tab eventKey="signup" title="SIGN UP">
                            <Register/>
                        </Tab>
                    </Tabs>

                </Modal.Body>
            </Modal>
        </div>
    );
};

export default AccountModal;
