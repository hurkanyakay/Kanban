import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import Card from './DraggableCard';
import { Scrollbars } from 'react-custom-scrollbars';

function getPlaceholderIndex(y, scrollY) {
  let placeholderIndex;
  const cardHeight = 161;
  const cardMargin = 10;
  const offsetHeight = 84;
  const yPos = y - offsetHeight + scrollY;
  if (yPos < cardHeight / 2) {
    placeholderIndex = -1;
  } else {
    placeholderIndex = Math.floor((yPos - cardHeight / 2) / (cardHeight + cardMargin));
  }
  return placeholderIndex;
}
const specs = {
  drop(props, monitor, component) {
    const { placeholderIndex } = component.state;
    const lastX = monitor.getItem().x;
    const lastY = monitor.getItem().y;
    const nextX = props.x;
    let nextY = (lastX === nextX) ? placeholderIndex : placeholderIndex + 1;
    if (lastX === nextX && lastY - nextY > 1) {
      nextY = nextY + 1;
      if (lastY - nextY === 1) {
        props.moveCard(lastX, lastY, nextX, nextY);
        return;
      }
    }
    if ((lastX === nextX && lastY === nextY) ||
    (lastX === nextX && nextY + 1 === lastY) || nextY === -1) {
      return;
    }
    props.moveCard(lastX, lastY, nextX, nextY);
  },
  hover(props, monitor, component) {
    const placeholderIndex = getPlaceholderIndex(
      monitor.getClientOffset().y,
      findDOMNode(component).scrollTop
    );
    component.setState({ placeholderIndex });
    const item = monitor.getItem();
    document.getElementById(item.id).style.display = 'none';
  }
};

@DropTarget('card', specs, (connectDragSource, monitor) => ({
  connectDropTarget: connectDragSource.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
  item: monitor.getItem()
}))
export default class Cards extends Component {
  constructor(props) {
    super(props);
    this.hashCode=this.hashCode.bind(this);
    this.state = {
      placeholderIndex: undefined,
      isScrolling: false,
    };
  }
  hashCode(str) {
    return str.split('').reduce((prevHash, currVal) =>
      ((prevHash << 5) - prevHash) + currVal.charCodeAt(0), 0);
  }

  render() {
    const { connectDropTarget, x, cards, isOver, canDrop,editCard } = this.props;
    const { placeholderIndex } = this.state;

    let toPlaceFirst;
    let toPlaceLast;
    let cardList = [];
    cards.forEach((item, i) => {
      toPlaceFirst = false;
      if (isOver && canDrop && i === 0 && placeholderIndex === -1) {
        toPlaceFirst = true;
        cardList.push(<div key="placeholder" className="item placeholder" />);
      }
      if (item !== undefined) {
        cardList.push(
          <Card x={x} y={i}
            item={item}
            key={this.hashCode(item.card_content+item.card_name+item.color)}
            editCard={editCard}
          />
        );
      }
      if (isOver && canDrop) {
        toPlaceLast = false;
        if (!toPlaceFirst && placeholderIndex > i) {
          toPlaceLast = true;
        } else if (!toPlaceFirst && !toPlaceLast && placeholderIndex === i) {
          cardList.push(<div key="placeholder" className="item placeholder" />);
        }
      }
    });
    if (toPlaceLast || (isOver && canDrop && cards.length === 0) ) {
      cardList.push(<div key="placeholder" className="item placeholder" />);
    }
    return connectDropTarget(
      <div className="desk-items">
      <Scrollbars>
        {cardList}
      </Scrollbars>
      </div>
    );
  }
}
