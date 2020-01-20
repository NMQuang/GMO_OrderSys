import { Carousel, Card } from "react-bootstrap";
import React, { Component } from "react";
import logo1 from "../../../public/images/slide1.jpg";
import logo2 from "../../../public/images/slide2.jpg";
import logo3 from "../../../public/images/slide3.jpg";
class MenuSlideComponent extends Component {
  /**
   * Constructor
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = { index: 0, setIndex: 0 };
  }

  handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    setDirection(e.direction);
  };
  render() {
    const { index, setIndex } = this.state;
    const { direction, setDirection } = this.state;
    return (
      <Card className="slide-user">
        <Carousel>
          <Carousel.Item>
            <img className="d-block w-100" src={logo1} alt="First slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={logo2} alt="Third slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={logo3} alt="Third slide" />
          </Carousel.Item>
        </Carousel>
      </Card>
    );
  }
}

export default MenuSlideComponent;
