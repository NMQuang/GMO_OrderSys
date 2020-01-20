import React, { Component } from "react";
import { Pagination } from "react-bootstrap";

/**
 * Pagination Component
 */
class PaginationComponent extends Component {
  /**
   * handle change page
   */
  handleChangePage = e => {
    const { currentPage, maxPage } = this.props;
    const { text } = e.target;
    if (text) {
      if (text.includes("«")) {
        this.props.handleChange(1);
      } else if (text.includes("‹")) {
        this.props.handleChange(currentPage - 1);
      } else if (text.includes("›")) {
        this.props.handleChange(currentPage + 1);
      } else if (text.includes("»")) {
        this.props.handleChange(maxPage);
      } else {
        this.props.handleChange(+e.target.text);
      }
    }
  };

  /**
   * render
   */
  render() {
    const { currentPage, maxDisplayPage, maxPage } = this.props;
    let listPaginationItem = [];
    let startPage = 1;
    let endPage = maxDisplayPage;
    // Setting start page and end page display in pagination
    if (currentPage < maxDisplayPage) {
      endPage = maxPage > maxDisplayPage ? maxDisplayPage : maxPage;
    } else if (
      currentPage <= maxPage &&
      currentPage > maxPage - maxDisplayPage + 1
    ) {
      endPage = maxPage;
      startPage = endPage - maxDisplayPage + 1;
    } else {
      if (currentPage < maxPage) {
        startPage = currentPage - Math.floor(maxDisplayPage / 2);
        endPage = currentPage + Math.floor(maxDisplayPage / 2);
        endPage = endPage > maxPage ? maxPage : endPage;
      } else {
        endPage = maxPage;
        startPage = endPage - maxDisplayPage + 1;
      }
    }
    for (let i = startPage; i <= endPage; i++) {
      listPaginationItem.push(
        <Pagination.Item key={i} active={i === currentPage}>
          {i}
        </Pagination.Item>
      );
    }
    return (
      <Pagination onClick={this.handleChangePage} size="sm">
        <Pagination.Item disabled={currentPage === 1}>«</Pagination.Item>
        <Pagination.Item disabled={currentPage === 1}>‹</Pagination.Item>
        {listPaginationItem}
        <Pagination.Item disabled={currentPage === maxPage}>›</Pagination.Item>
        <Pagination.Item disabled={currentPage === maxPage}>»</Pagination.Item>
      </Pagination>
    );
  }
}

export default PaginationComponent;
