import React        from 'react';
import InputField   from './InputField';
import SubmitButton from './SubmitButton';
import UserStore    from '../stores/Users';
import { Form, Button } from 'react-bootstrap'

class LoginForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      buttonDisabled: false
    }
  }

  setInputValue(property, val){
    val = val.trim();
    if(val.length > 12) {
      return;
    }
    this.setState({
      [property]: val
    })

  }

  resetForm() {
    this.setState({
      username:'',
      buttonDisabled: false
    })

  }

  render(){
    let { userId, handleChange, handleSubmit } = this.props;
    return (
      <Form onSubmit={handleSubmit}>
        Log In
        <Form.Group controlId="userId">
          <Form.Control
            type="text"
            placeholder="User Id"
            name="userId"
            value={userId}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

export default LoginForm;
