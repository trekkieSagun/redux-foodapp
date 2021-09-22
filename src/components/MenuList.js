import React, { Component } from "react";
import { connect } from "react-redux";
import {
  EDITMENU,
  LOADMENULIST,
  MODIFYEDITSTATE,
  MODIFYSTATES,
} from "../redux/store/action-creator";
import AddMenu from "./AddMenu";
import FoodCalculator from "./FoodCalculator";

class MenuList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addClicked: false,
      toggleEdit: false,
      editingIndex: null,
      calculator: false,
      total: null,
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.props.changeState({ name: name, value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const newMenuList = [...this.props.menuList];
    newMenuList.push({
      name: this.props.foodname,
      price: this.props.price,
      image: this.props.image,
      quantity: this.props.quantity,
    });

    this.props.setMenuList(newMenuList);
    this.setState({
      addClicked: false,
    });
  };

  handleAdd = () => {
    this.setState({
      addClicked: true,
    });
  };

  handleImage = (e) => {
    this.props.changeState({
      name: "image",
      value: URL.createObjectURL(e.target.files[0]),
    });
  };

  handleDelete = (menuIndex) => {
    const confirmed = window.confirm("Do you want to delete this?");

    if (confirmed) {
      const newMenu = this.props.menuList.filter(
        (item, index) => index !== menuIndex
      );
      this.props.setMenuList(newMenu);
    }
  };

  handleEdit = (menuIndex) => {
    this.setState({ toggleEdit: true, editingIndex: menuIndex });

    this.props.setEditMenu({
      foodname: this.props.menuList[menuIndex].name,
      price: this.props.menuList[menuIndex].price,
      image: this.props.menuList[menuIndex].image,
    });
  };

  handleEditingData = (e) => {
    const { name, value } = e.target;
    this.props.changeEditState({ name: name, value });
  };

  handleImageEdit = (e) => {
    this.props.changeEditState({
      name: "image",
      value: URL.createObjectURL(e.target.files[0]),
    });
  };

  submitEditting = (e, menuIndex) => {
    e.preventDefault();
    const newMenuList = [...this.props.menuList];
    newMenuList[menuIndex] = {
      name: this.props.editingMenu.foodname,
      price: this.props.editingMenu.price,
      image: this.props.editingMenu.image,
    };
    this.props.setMenuList(newMenuList);
    this.setState({
      toggleEdit: false,
    });
  };

  handleCalculator = () => {
    this.setState({
      calculator: true,
    });
  };

  handleIncrement = (e, index) => {
    const newMenu = [...this.props.menuList];

    newMenu[index] = {
      ...newMenu[index],
      quantity: newMenu[index].quantity + 1,
    };

    this.props.setMenuList(newMenu);
  };

  handleDecrement = (e, index) => {
    const newMenu = [...this.props.menuList];

    newMenu[index] = {
      ...newMenu[index],
      quantity: newMenu[index].quantity - 1,
    };

    this.props.setMenuList(newMenu);
  };

  handleCalculate = () => {
    let total = 0;
    this.props.menuList.forEach((item, index) => {
      total = item.price * item.quantity + total;
    });

    this.setState({
      total,
    });
  };

  render() {
    return (
      <div className="container">
        {this.state.calculator ? (
          <FoodCalculator
            menuList={this.props.menuList}
            handleDecrement={this.handleDecrement}
            handleIncrement={this.handleIncrement}
            total={this.state.total}
            handleCalculate={this.handleCalculate}
          />
        ) : (
          <>
            <div className="calculator">
              <button
                className="btn btn-primary"
                onClick={this.handleCalculator}
              >
                Calculator
              </button>
            </div>
            <div className="button-add">
              <button className="btn btn-primary" onClick={this.handleAdd}>
                Add Menu
              </button>
            </div>

            {this.state.addClicked ? (
              <AddMenu
                menuList={this.props.menuList}
                addClicked={this.state.addClicked}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                handleImage={this.handleImage}
              />
            ) : null}

            <div className="menuList">
              {this.props.menuList?.map((data, menuIndex) => {
                return (
                  <div className="menu-item" key={menuIndex}>
                    <ul>
                      <li>
                        <img src={data.image} alt="No preview" />{" "}
                      </li>
                      <li>
                        <span>Name: </span>
                        {data.name}{" "}
                      </li>
                      <li>
                        <span>Price: </span>
                        {data.price}{" "}
                      </li>
                      <div className="action-btn">
                        {" "}
                        <button
                          className="btn btn-info"
                          onClick={() => this.handleEdit(menuIndex)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => this.handleDelete(menuIndex)}
                        >
                          Delete
                        </button>
                      </div>

                      {this.state.toggleEdit &&
                      menuIndex === this.state.editingIndex ? (
                        <div>
                          <form
                            className="form-group"
                            onSubmit={(e) => this.submitEditting(e, menuIndex)}
                          >
                            <input
                              type="text"
                              name="foodname"
                              placeholder="Food name"
                              required
                              className="form-control"
                              value={this.props.editingMenu.foodname}
                              onChange={(e) => this.handleEditingData(e)}
                            />
                            <input
                              type="number"
                              name="price"
                              placeholder="Price"
                              className="form-control"
                              required
                              onChange={(e) => this.handleEditingData(e)}
                              value={this.props.editingMenu.price}
                            />

                            <input
                              name="image"
                              type="file"
                              onChange={(e) => this.handleImageEdit(e)}
                            />

                            <button className="btn btn-primary" type="submit" o>
                              Submit
                            </button>
                          </form>
                        </div>
                      ) : null}
                    </ul>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  menuList: state.menuList,
  editingMenu: state.editingMenu,
  quantity: state.quantity,
  foodname: state.foodname,
  price: state.price,
  image: state.image,
  quantity: state.quantity,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setMenuList: (menuList) => {
      dispatch(LOADMENULIST(menuList));
    },

    setEditMenu: (editingMenu) => {
      dispatch(EDITMENU(editingMenu));
    },
    changeState: (obj) => {
      dispatch(MODIFYSTATES(obj));
    },

    changeEditState: (obj) => {
      dispatch(MODIFYEDITSTATE(obj));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuList);
