import React, { Component, PropTypes } from 'react';
import { DropTarget, DragSource } from 'react-dnd';
import Cards from './Cards';
const listSource = {
  beginDrag(props) {
    return {
      id: props.id,
      x: props.x
    };
  }
};

const listTarget = {
  canDrop() {
    return false;
  },
  hover(props, monitor) {
    const { id: listId } = monitor.getItem();
    const { id: nextX } = props;
    if (listId !== nextX) {
      props.moveList(listId, props.x);
    }
  }
};

@DropTarget('list', listTarget, connectDragSource => ({
  connectDropTarget: connectDragSource.dropTarget(),
}))
@DragSource('list', listSource, (connectDragSource, monitor) => ({
  connectDragSource: connectDragSource.dragSource(),
}))
export default class CardsContainer extends Component {
  render() {
    const { connectDropTarget, connectDragSource, item, x, moveCard,editColumn,editCard,addCard } = this.props;
    return connectDragSource(connectDropTarget(
      <div className="desk">
        <div className="desk-head">
          <div className="desk-name">{item.name}<span>({item.cards.length})</span></div>
          <div className="addColumn"><button onClick={this.props.addCard.bind(null,item.id)} className="btn btn-sm btn-success "><i className="fa fa-plus"></i></button></div>
          <div className="editColumn"><button onClick={this.props.editColumn.bind(null,item.id)} className="btn btn-sm btn-info"><i className="fa fa-gear"></i></button></div>
        </div>
        <Cards
          moveCard={moveCard}
          x={x}
          cards={item.cards}
          editCard={editCard}
        />
      </div>
    ));
  }
}
