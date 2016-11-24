import React, { PropTypes } from 'react';

const propTypes = {
  item: PropTypes.object.isRequired,
  style: PropTypes.object
};

const Card = (props) => {
  const { style, item, editCard } = props;

  return (
    <div style={style} className="item" id={style ? item.id : null} style={{borderTop:'5px solid '+item.color}}>
      <div className="item-name">{item.card_name}</div>
      <div className="editCard"><button className="btn btn-sm btn-warning" onClick={editCard.bind(null,item.id)}><i className="fa fa-gear"></i></button></div>
      <div className="item-container">
        <div className="item-content">
          <p>{item.card_content}</p>
        </div>
      </div>

    </div>
  );
};

Card.propTypes = propTypes;

export default Card;
