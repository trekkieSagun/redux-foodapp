import { EDITITEM, LOADMENU, MODIFY, MODIFYEDIT } from "../actions";

export const LOADMENULIST = (menuList) => {
  return {
    type: LOADMENU,
    payload: menuList,
  };
};

export const EDITMENU = (editingMenu) => {
  return {
    type: EDITITEM,
    payload: editingMenu,
  };
};

export const MODIFYSTATES = (obj) => {
  return {
    type: MODIFY,
    payload: obj,
  };
};

export const MODIFYEDITSTATE = (obj) => {
  return {
    type: MODIFYEDIT,
    payload: obj,
  };
};

// export const ADDQUANTITY = () => {
//   return {
//     type: CALCULATEADD,
//     value: 1,
//   };
// };

// export const REMOVEQUANTITY = () => {
//   return {
//     type: CALCULATEADD,
//     value: 1,
//   };
// };
