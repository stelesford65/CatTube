import React from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Carousel } from "react-bootstrap";
import meowtube from "../images/Cat_TextRight.jpg";

function HomePage() {
  return (
    <Container>
    <Carousel>
      <Carousel.Item interval={10000}>
        <img
          className="d-block w-100"
          src={meowtube}
          style={{width:800, height: 650}}
        />
        <Carousel.Caption>
          <h3>Welcome to MeowTube!</h3>
          <p>A place where you can watch plenty of cat videos</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={10000}>
        <img
          className="w-100"
          src="https://via.placeholder.com/1280x650/000000.png"
        />
        <Carousel.Caption>
          <h3>Join MeowTube today!</h3>
          <p>It's free, and users can leave comments</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={10000}>
        <img
          className="d-block w-100"
          src="https://via.placeholder.com/1280x650/000000.png"
        />
        <Carousel.Caption>
          <h3>Slide label</h3>
          <p>Details</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </Container>
  )
}
 
export default HomePage
