import React from 'react';
import { Form, Button, Modal } from 'react-bootstrap'
import RegisterForm from './RegisterForm'

class RegisterModal extends React.Component {
    render() {
        let {userData, userErrors, handleSubmit, handleChange, show, handleClose} = this.props;
        return (
            <Modal show={show} onHide={handleClose} animation={false} size="sm">
                <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title># {userData.userId}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group controlId="userUsername">
                            <Form.Label>username:</Form.Label>
                            <Form.Control type="text" placeholder="Username" name="userName"
                                value={userData.userName} onChange={handleChange}
                                isInvalid={!!userErrors.userName}/>
                                <Form.Control.Feedback type="invalid">
                                  {userErrors.userName}
                                </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="userPassword">
                            <Form.Label>password:</Form.Label>
                            <Form.Control type="text" placeholder="Password" name="passWord"/>
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={handleSubmit} value={userData.userId}>Save changes</Button>
                </Modal.Footer>
                </Modal.Dialog>
            </Modal>
        )
    }
}
export default RegisterModal