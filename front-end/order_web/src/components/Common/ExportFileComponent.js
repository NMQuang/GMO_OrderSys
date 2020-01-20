import React, { Component } from "react";
import FileSaver from "file-saver";
import XLSX from "xlsx";
import { Button } from "react-bootstrap";
import ModalComponent from "./ModalComponent";
import message from "../../constants/message";

/**
 * export data to excel
 * @param {List} csvData
 * @param {String} fileName
 * @return {File} file
 */

class ExportFileComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false
    };
  }
  static defaultProps = {
    fileType:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    fileExtension: ".xlsx"
  };

  /**
   * export file
   * @param {List} data
   * @param {String} fileName
   * @return {}
   */
  exportFile = e => {
    e.preventDefault();
    const ws = XLSX.utils.json_to_sheet(this.props.csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: this.props.fileType });
    FileSaver.saveAs(data, this.props.fileName + this.props.fileExtension);
    this.setState({ modalShow: false });
  };

  /**
   * On close modal
   */
  onCloseModal = () => {
    this.setState({ modalShow: false });
  };

  /**
   * On show modal
   */
  onShowModal = () => {
    this.setState({ modalShow: true });
  };

  /**
   * render
   */
  render() {
    const { modalShow } = this.state;
    const { csvData } = this.props;
    // show modal
    if (modalShow) {
      return (
        <ModalComponent
          size="lg"
          title="Summary confirm"
          body={message.MSG_INFO_007}
          action="Export"
          show={modalShow}
          onHide={this.onCloseModal}
          onSave={this.exportFile}
        />
      );
    }

    // check disable/enable button Export
    if (csvData.length > 0) {
      return (
        <Button
          variant="primary width-button-back"
          onClick={this.onShowModal}
          style={{ marginRight: 10 }}
        >
          Xuất file
        </Button>
      );
    }
    return (
      <Button
        variant="primary width-button-back"
        disabled
        onClick={this.onShowModal}
        style={{ marginRight: 10 }}
      >
        Xuất file
      </Button>
    );
  }
}

export default ExportFileComponent;
