import React from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Carousel } from "react-bootstrap";
import meowtube from "../images/Cat_TextRight.jpg";
import react_pic from "../images/react.jpg";
import cat_with_mask from "../images/catmask.jpg";

function HomePage() {
  return (
    <Container>
    <Carousel>
      <Carousel.Item interval={10000}>
        <img
          className="d-block w-100"
          src={meowtube}
          style={{width:500, height: 650}}
        />
        <Carousel.Caption>
          <h3>Welcome to MeowTube!</h3>
          <p>A place where you can watch plenty of cat videos</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={10000}>
        <img
          className="w-100"
          src={react_pic}
          style={{width:500, height: 650}}
        />
        <Carousel.Caption>
          <h3></h3>
          <p>Done with React</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={10000}>
        <img
          className="d-block w-100"
          src={cat_with_mask}
          style={{width:500, height: 650}}
        />
        <Carousel.Caption>
          <h3>Get started today!</h3>
          <p></p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </Container>
  )
}
 
export default HomePage
