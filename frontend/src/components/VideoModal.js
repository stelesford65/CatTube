import "../css/VideoModal.css";
import React, { Component } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Comment from "./Comment";
import apiService from "../apiService";

class VideoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      newComment: "",
      isLoading: false,
    };
  }

  handleChange = (event) => {
    this.setState({ newComment: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });

    // Post new comment
    apiService
      .postComment(this.props.video, this.props.user.id, this.state.newComment)
      .then((data) => {
        console.log("Comment posted.");
        this.getComments();
      });
  };

  getComments = () => {
    // Get comments for selected video
    apiService.getComments(this.props.video).then((data) => {
      console.log("Comments loaded.");
      this.setState({ comments: data, newComment: "", isLoading: false });
    });
  };

  componentDidMount() {
    this.getComments();
  }

  render() {
    // Loop through comments and create a list of elements to display
    const commentElements = this.state.comments.map((comment, i) => (
      <Comment
        key={i}
        editable={comment.author === this.props.user.id}
        getComments={this.getComments}
        {...comment}
      />
    ));

    // Only show new comment form if signed in
    const commentForm = this.props.user.id ? (
      <Form className="mb-3" onSubmit={this.handleSubmit}>
        <fieldset disabled={this.state.isLoading}>
          <Form.Control
            className="mb-2"
            value={this.state.newComment}
            onChange={this.handleChange}
            required
          />
          <Button type="submit" variant="light" size="sm" className="border">
            Add Comment
          </Button>
        </fieldset>
      </Form>
    ) : (
      <p>You must be logged in to comment</p>
    );

    return (
      <Modal show={this.props.show} size="lg" onHide={this.props.handleHide}>
        <Modal.Header className="border-0" closeButton />

        <Modal.Body className="pt-0">
          <div className="embed-responsive embed-responsive-16by9 border-0 mb-3">
            <iframe
              src={`https://www.youtube.com/embed/${this.props.video.id}`}
              title="YouTube Video"
              className="embed-responsive-item"
              allowFullScreen
            />
          </div>

          <h4>{this.props.video.title}</h4>
          <hr />
          <h5 className="mb-3">Comments</h5>

          {commentForm}

          <div className="d-flex flex-column-reverse">{commentElements}</div>
        </Modal.Body>
      </Modal>
    );
  }
}

export default VideoModal;
