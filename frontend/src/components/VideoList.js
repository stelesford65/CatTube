import "../css/VideoList.css";
import React from "react";
import { Card, Col, Row } from "react-bootstrap";

function VideoList(props) {
  // Loop through videos and create a list of elements to display
  const videoElements = props.videos.map((video, i) => (
    <Col key={i} className="my-3" xs={12} sm={6} md={4} lg={3}>
      <div className="video-list-item" onClick={() => props.handleSelect(i)}>
        <Card>
          <Card.Img variant="top" src={video.imgUrl} />

          <Card.Body>
            <Card.Text>{video.title}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    </Col>
  ));

  return <Row>{videoElements}</Row>;
}

export default VideoList;
