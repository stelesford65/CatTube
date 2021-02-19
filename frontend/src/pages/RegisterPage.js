import React from 'react';
import RegisterForm from '../components/RegisterForm';
import RegisterModal from '../components/RegisterModal';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const SERVICE_URL = "https://cattube-env.eba-wbpixdq6.us-east-1.elasticbeanstalk.com/"

class RegisterPage extends React.Component {

  state = {
    loading: false,
    showEditModal: false,
    userData: [
      {
        name: "Fake",
      }],
    newUserData: {
      name: ''
    },
    editUserData: {
      name: "Zaphod"
    },
    addFormErrors : {
      name : '',
    },
    editFormErrors : {
      name : '',
    }
  }

handleEditFormSubmit = (event) => {
  if (event) event.preventDefault();
  let userId = event.target.value;
  console.log(`Submitting edit for user id ${userId}`)
  console.log(this.state.editUserData)

  let validationErrors = this.validateUser(this.state.editUserData)
  if(!validationErrors.isValid){
    console.log("Edited user is invalid. Reporting errors.")
    this.setState({editFormErrors : validationErrors})
    return
  }

  fetch(SERVICE_URL + 'addUser/' + userId, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(this.state.editUserData),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      this.setState({ showEditModal: false, editFormErrors : validationErrors})
      this.loadUserData();
    })
    .catch((error) => {
      console.error('Error:', error);
    });

}


  handleAddFormChange = (event) => {
    // The event triggering this function should be an input's onChange event
    // We need to grab the input's name & value so we can associate it with the
    // newUserData within the App's state.
    let inputName = event.target.name;
    let inputValue = event.target.value;
    let userInfo = this.state.newUserData;

    console.log(`Updating new user data: ${inputName} : ${inputValue}`)

    if (userInfo.hasOwnProperty(inputName)) {
      userInfo[inputName] = inputValue;
      this.setState({ newUserData: userInfo })
    }
  }

  validateUser = (user) => {
    let errors = {
      name : "",
      isValid: true
    }

    let isInvalid = false;

    if(!user.name){
      errors.name = "Please enter a username."
      errors.isValid = false;
    }


    return errors;
  }

  handleAddFormSubmit = (event) => {
  console.log("Adding user!")
  if (event) event.preventDefault();

  let validationErrors = this.validateUser(this.state.newUserData)
  if(!validationErrors.isValid){
    console.log("New user is invalid. Reporting errors.", validationErrors)
    this.setState({addFormErrors : validationErrors})
    return
  }

  fetch(SERVICE_URL + 'addUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(this.state.newUserData),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Add user - Success:', data);
      this.setState({
        addFormErrors : validationErrors })
      this.loadUserData();
      alert("Success! Your user id is: " + data.userId + ". Use this to login.");
      // Redirect user to login
      this.props.history.push(`/login`);
    })
    .catch((error) => {
      console.log('Add user - Error:', error);
    });
}
  loadUserData() {
    this.setState({ loading: true })
    console.log("Loading user data")
    fetch(SERVICE_URL + "users")
      .then(data => data.json())
      .then(data => this.setState(
        { userData: data, loading: false }
      ))
  }

  componentDidMount() {
    console.log("App is now mounted.")
    this.loadUserData();
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col>
            <h1 className="text-center">User Application</h1>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm={4}>
            <h2>Add New User</h2>
            <RegisterForm
              handleSubmit={this.handleAddFormSubmit}
              handleChange={this.handleAddFormChange}
              userData={this.state.newUserData}
              userErrors={this.state.addFormErrors}
            />
          </Col>
        </Row>
        <Row><Col><RegisterModal
          show={this.state.showEditModal}
          handleSubmit={this.handleEditFormSubmit}
          handleChange={this.handleEditFormChange}
          handleClose={this.handleCloseEditModal}
          userData={this.state.editUserData}
          userErrors={this.state.editFormErrors} />
        </Col></Row>
      </Container>
    );
  }
}

export default RegisterPage;
