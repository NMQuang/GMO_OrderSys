import React, { Component } from "react";
import { Carousel, Image } from "react-bootstrap";
import logo from "../../../public/images/logo-01.jpg";
import bg from "../../../public/images/bg-01.jpg";

/**
 * Carousel Component
 */
class CarouselComponent extends Component {
  /**
   * render
   */
  render() {
    return (
      <Carousel>
        <Carousel.Item>
          <Image
            className="d-block w-100"
            style={{ height: 400 }}
            src={logo}
            alt="First slide"
            rounded
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image
            className="d-block w-100"
            style={{ height: 400 }}
            src={bg}
            alt="Second slide"
            rounded
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image
            className="d-block w-100"
            style={{ height: 400 }}
            src={logo}
            alt="Third slide"
            rounded
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
}

export default CarouselComponent;
