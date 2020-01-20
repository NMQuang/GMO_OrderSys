import React, { Component } from "react";
import { Card, Container } from "react-bootstrap";
import PaginationComponent from "../Common/PaginationComponent";
import constant from "../../constants/constant";
import HeaderListModelComponent from "../Layout/HeaderListModelComponent";

const withListModel = ({ listName, linkCreate, recordPerPage }) => (WrappedComponent) => {
  return class ListModelHOC extends Component {
    /**
     * Constructor
     * @param {*} props 
     */
    constructor(props) {
      super(props);
      this.state = { currentPage: 1, numberOfItem: null, maxPage: null };
    }

    /**
     * handle change page
     */
    handleChangePage = (page) => {
      this.setState({ currentPage: page });
    }

    /**
     * get number of item
     */
    getNumberOfItem = (number) => {
      let total = Math.floor(number / recordPerPage + (number % recordPerPage > 0 ? 1 : 0));
      this.setState({ numberOfItem: number, maxPage: total });
    }

    /**
     * Update current page when the last page have no item.
     */
    updateCurrentPage = () => {
      const { currentPage } = this.state;
      this.setState({ currentPage: currentPage - 1 });
    }

    /**
     * render
     */
    render() {
      const { currentPage, numberOfItem, maxPage } = this.state;
      const startLoop = currentPage * recordPerPage - recordPerPage;
      let endLoop = currentPage * recordPerPage < numberOfItem ? currentPage * recordPerPage : numberOfItem;
      if (startLoop < 0) endLoop++;
      return (
        <Container>
          <Card>
            <HeaderListModelComponent listName={listName} linkCreate={linkCreate} />
            {currentPage > 0 &&
              <Card.Body className="padding-bottom">
                <PaginationComponent
                  handleChange={this.handleChangePage}
                  currentPage={currentPage}
                  numberOfItem={numberOfItem}
                  recordPerPage={constant.RECORD_PER_PAGE_5}
                  maxDisplayPage={constant.MAX_DISPLAY_PAGE}
                  maxPage={maxPage}
                />
              </Card.Body>
            }
            <Card.Body>
              <WrappedComponent {...this.props}
                currentPage={currentPage}
                done={this.getNumberOfItem}
                startLoop={startLoop} endLoop={endLoop}
                updateCurrentPage={this.updateCurrentPage}
              />
            </Card.Body>
            {currentPage > 0 &&
              <Card.Body className="padding-bottom">
                <PaginationComponent
                  handleChange={this.handleChangePage}
                  currentPage={currentPage}
                  numberOfItem={numberOfItem}
                  recordPerPage={constant.RECORD_PER_PAGE_5}
                  maxDisplayPage={constant.MAX_DISPLAY_PAGE}
                  maxPage={maxPage}
                />
              </Card.Body>
            }
          </Card>
        </Container>
      )
    }
  }
}

export default withListModel;