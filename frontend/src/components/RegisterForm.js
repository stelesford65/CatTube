import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap'

class RegisterForm extends Component {

  render() {
    let { userData, userErrors, handleSubmit, handleChange } = this.props;
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="userUsername">
          <Form.Label>username:</Form.Label>
          <Form.Control
            type="text"
            placeholder="name"
            name="name"
            value={userData.name}
            onChange={handleChange}
            isInvalid={!!userErrors.name}
          />
          <Form.Control.Feedback type="invalid">
            {userErrors.userName}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="userLastname">
          <Form.Label>password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="password"
            name="passWord"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    )
  }
}

export default RegisterForm