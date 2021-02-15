import React from 'react';
import {Modal, Tab, Tabs} from "react-bootstrap";
import Authenticate from "./Authenticate";
import Register from "./Register";

const AccountModal = ({show, onHide}) => {
    return (
            <Modal
                show={show}
                onHide={onHide}
                className="account-modal"
            >
                <Modal.Header
                    closeButton
                    className="modal-header"
                >
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
    );
};

export default AccountModal;
