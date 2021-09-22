import { LOADMENU, MODIFY, MODIFYEDIT, EDITITEM } from "../actions";

const initialState = {
  menuList: [
    {
      name: "Buger",
      price: 300,
      image: "./images/burger.jpg",
      quantity: 0,
    },
    { name: "MoMo", price: 200, image: "./images/momo.jpg", quantity: 0 },
    {
      name: "Sandwich",
      price: 200,
      image: "./images/sandwich.jfif",
      quantity: 0,
    },
  ],
  addClicked: false,
  foodname: null,
  price: null,
  image: null,
  quantity: 0,
  toggleEdit: false,
  editingIndex: null,

  editingMenu: {
    foodname: null,
    price: null,
    image: null,
  },

  calculator: false,
  total: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADMENU:
      return { ...state, menuList: action.payload };

    case EDITITEM:
      return {
        ...state,
        editingMenu: action.payload,
      };

    case MODIFY:
      return { ...state, [action.payload.name]: action.payload.value };

    case MODIFYEDIT:
      return {
        ...state,
        editingMenu: {
          ...state.editingMenu,
          [action.payload.name]: action.payload.value,
        },
      };

    // case DELETE:
    //   const newState = { ...state };
    //   newState.menuList.splice(action.payload.index, 1);
    //   return newState;

    default:
      return state;
  }
};

export default reducer;
