import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import apiService from "../apiService";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: {},
      updatedComment: "",
      isEditing: false,
      isLoading: false,
    };
  }

  handleChange = (event) => {
    this.setState({ updatedComment: event.target.value });
  };

  handleSubmit = (event) => {
    // Update comment
    event.preventDefault();
    this.setState({ isLoading: true });

    apiService
      .updateComment(
        this.props.commentId,
        this.props.author,
        this.props.videoId,
        this.state.updatedComment,
        this.props.time
      )
      .then((data) => {
        console.log("Comment updated");
        this.props.getComments();
        this.hideEditForm();
      });
  };

  handleDelete = () => {
    // Delete comment
    this.setState({ isLoading: true });

    apiService.deleteComment(this.props.commentId).then((data) => {
      console.log(data);
      this.setState({ isLoading: false });
      this.props.getComments();
    });
  };

  showEditForm = () => {
    // Show edit form and set input to comment text
    this.setState({
      updatedComment: this.props.content,
      isEditing: true,
    });
  };

  hideEditForm = () => {
    // Hide edit form and unset loading state
    this.setState({
      updatedComment: this.props.content,
      isEditing: false,
      isLoading: false,
    });
  };

  getAuthor = () => {
    // Get author info to display
    apiService.getUser(this.props.author).then((data) => {
      this.setState({ author: data });
    });
  };

  componentDidMount() {
    this.getAuthor();
  }

  componentDidUpdate(prevProps) {
    if (this.props.author !== prevProps.author) {
      this.getAuthor();
    }
  }

  render() {
    // Conditionally render edit/delete buttons
    let buttons = null;
    if (this.props.editable && !this.state.isEditing) {
      // Render edit/delete buttons
      buttons = (
        <div>
          <fieldset disabled={this.state.isLoading}>
            <Button variant="link" size="sm" onClick={this.showEditForm}>
              Edit
            </Button>
            <Button
              variant="link"
              size="sm"
              className="text-danger"
              onClick={this.handleDelete}
            >
              Delete
            </Button>
          </fieldset>
        </div>
      );
    }

    // Conditionally render edit form or comment text
    let content = this.props.content;
    if (this.state.isEditing) {
      // Render edit form
      content = (
        <Form className="mb-3" onSubmit={this.handleSubmit}>
          <fieldset disabled={this.state.isLoading}>
            <Form.Control
              className="mb-2"
              value={this.state.updatedComment}
              onChange={this.handleChange}
              required
            />
            <Button
              variant="light"
              size="sm"
              className="mr-2"
              onClick={this.hideEditForm}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Update
            </Button>
          </fieldset>
        </Form>
      );
    }

    return (
      <div className="mb-3">
        <div>
          <span className="font-weight-bold">{this.state.author.name}</span>
          <br />
          {content}
        </div>
        {buttons}
      </div>
    );
  }
}

export default Comment;
