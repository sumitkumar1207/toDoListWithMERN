import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

import { connect } from "react-redux";
import { addItem } from "../actions/itemActions";
// import uuid from 'uuid';
class ItemModal extends Component {
  state = {
    modal: false,
    name: "",
    showError: false
  };
  toggle = () => {
    this.setState({
        showError: false,
        name: '',
      modal: !this.state.modal
    });
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    let { showError } = this.state;
    if (this.state.name == "" || this.state.name.length == 0) {
      e.preventDefault();
      this.setState({ showError: true });
    } else {
      e.preventDefault();
      const newItem = {
        // id: uuid(),
        name: this.state.name
      };

      //Add item via addItem action
      this.props.addItem(newItem);

      //Close Modal
      this.toggle();
    }
  };

  render() {
    return (
      <div>
        <Button
          color="dark"
          style={{ marginBottom: "2rem" }}
          onClick={this.toggle}
        >
          Add Items
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add To ToDo List </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item"> Item</Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Add ToDo Item"
                  onChange={this.onChange}
                />
                {this.state.showError ? <p>Please Enter your ToDo item</p>:null}
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Add Item
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item
});
export default connect(
  mapStateToProps,
  { addItem }
)(ItemModal);
