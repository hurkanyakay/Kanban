export const GET_LISTS = 'GET_LISTS';
export const ADD_COLUMN = 'ADD_COLUMN';
export const EDIT_COLUMN = 'EDIT_COLUMN';
export const DELETE_COLUMN = 'DELETE_COLUMN';
export const ADD_CARD = 'ADD_CARD'; EDIT_CARD
export const EDIT_CARD = 'EDIT_CARD';
export const DELETE_CARD = 'DELETE_CARD';
export const MOVE_CARD = 'MOVE_CARD';
export const MOVE_LIST = 'MOVE_LIST';
export const TOGGLE_DRAGGING = 'TOGGLE_DRAGGING';

export function getLists(lists) {
  return {
      type: GET_LISTS, lists
    }
}
export function addColumn(column) {
  return {
      type: ADD_COLUMN, column
    }
}
export function editColumn(column) {
  return {
      type: EDIT_COLUMN, column
    }
}
export function deleteColumn(column) {
  return {
      type: DELETE_COLUMN, column
    }
}
export function addCard(card,column) {
  return {
      type: ADD_CARD, card,column
    }
}
export function editCard(card) {
  return {
      type: EDIT_CARD, card
    }
}
export function deleteCard(card) {
  return {
      type: DELETE_CARD, card
    }
}
export function moveList(lastX, nextX) {
  return {
    type: MOVE_LIST, lastX, nextX }
}

export function moveCard(lastX, lastY, nextX, nextY) {
  return {
  type: MOVE_CARD, lastX, lastY, nextX, nextY }
}

export function toggleDragging(isDragging) {
  return {
  type: TOGGLE_DRAGGING, isDragging
}
}
