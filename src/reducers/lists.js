import { Record,fromJS,List,Map } from 'immutable';

import {
  GET_LISTS,
  MOVE_CARD,
  MOVE_LIST,
  ADD_COLUMN,
  EDIT_COLUMN,
  DELETE_COLUMN,
  ADD_CARD,
  EDIT_CARD,
  DELETE_CARD,
  TOGGLE_DRAGGING
} from '../actions/lists';

const InitialState = Record({
  lists: [],
  isDragging: false
});
const initialState = new InitialState;

export default function lists(state = initialState, action) {
  switch (action.type) {
    case GET_LISTS:{
      localStorage.setItem("cards", JSON.stringify(action.lists));
      return state.withMutations((ctx) => {
        ctx.set('lists', action.lists);
      });
    }
    case ADD_COLUMN:{
      let add_column = [...state.lists];
      add_column.push(action.column);
      localStorage.setItem("cards", JSON.stringify(add_column));
      return state.withMutations((ctx) => {
        ctx.set('lists', add_column);
      });
    }
    case EDIT_COLUMN:{
      let edit_column = [...state.lists];
      for(let i=0; i<edit_column.length; i++){
        if(edit_column[i].id == action.column.id){
          edit_column[i].name=action.column.name
        }
      }
      localStorage.setItem("cards", JSON.stringify(edit_column));
      return state.withMutations((ctx) => {
        ctx.set('lists', edit_column);
      });
    }
    case DELETE_COLUMN:{
      let column_delete = [...state.lists];
      for(let i=0; i<column_delete.length; i++){
        if(column_delete[i].id == action.column){
          column_delete.splice(i, 1);
        }
      }
      localStorage.setItem("cards", JSON.stringify(column_delete));
      return state.withMutations((ctx) => {
        ctx.set('lists', column_delete);
      });
    }
    case ADD_CARD:{
      let add_card = [...state.lists];
      let lastCard = add_card[action.column].cards.length
      add_card[action.column].cards.splice(lastCard,0,action.card);
      localStorage.setItem("cards", JSON.stringify(add_card));
      return state.withMutations((ctx) => {
        ctx.set('lists', add_card);
      });
    }
    case EDIT_CARD:{
      let edit_card = [...state.lists];
      for(let i=0; i<edit_card.length; i++){
        for(let j=0; j<edit_card[i].cards.length; j++){
          if(edit_card[i].cards[j].id == action.card.id){
            edit_card[i].cards[j]=action.card;
          }
        }
      }
      localStorage.setItem("cards", JSON.stringify(edit_card));
      return state.withMutations((ctx) => {
        ctx.set('lists', edit_card);
      });
    }
    case DELETE_CARD:{
      let delete_card = [...state.lists];
      for (let i = 0; i < delete_card.length; i++) {
        for (let j = 0; j < delete_card[i].cards.length; j++) {
          if(delete_card[i].cards[j].id == action.card){
            delete_card[i].cards.splice(j, 1);
          }
        }
      }
      localStorage.setItem("cards", JSON.stringify(delete_card));
      return state.withMutations((ctx) => {
        ctx.set('lists', delete_card);
      });
    }
    case MOVE_CARD: {
      const newLists = [...state.lists];
      const { lastX, lastY, nextX, nextY } = action;
      if (lastX === nextX) {
        newLists[lastX].cards.splice(nextY, 0, newLists[lastX].cards.splice(lastY, 1)[0]);
      } else {
        newLists[nextX].cards.splice(nextY, 0, newLists[lastX].cards[lastY]);
        newLists[lastX].cards.splice(lastY, 1);
      }
      localStorage.setItem("cards", JSON.stringify(newLists));
      return state.withMutations((ctx) => {
        ctx.set('lists', newLists);
      });
    }
    case MOVE_LIST: {
      const newLists = [...state.lists];
      const { lastX, nextX } = action;
      const t = newLists.splice(lastX, 1)[0];
      newLists.splice(nextX, 0, t);
      localStorage.setItem("cards", JSON.stringify(newLists));
      return state.withMutations((ctx) => {
        ctx.set('lists', newLists);
      });
    }
    case TOGGLE_DRAGGING: {
      return state.set('isDragging', action.isDragging);
    }
    default:
      return state;
  }
}
