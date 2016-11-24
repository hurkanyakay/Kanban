import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import * as ListsActions from '../actions/lists';
import CardsContainer from './CardBoard/CardsContainer';
import ModalComp from './Modal'
import { Scrollbars } from 'react-custom-scrollbars';

function mapStateToProps(state) {
  return {
    lists: state.lists.lists
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ListsActions, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
@DragDropContext(HTML5Backend)
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.moveCard = this.moveCard.bind(this);
    this.moveList = this.moveList.bind(this);
    this.findList = this.findList.bind(this);
    this.triggerClose = this.triggerClose.bind(this);
    this.modalAction = this.modalAction.bind(this);
    this.state = {
      showModal: false,
      modalType:''
    };
  }
  componentDidMount(){
    if(localStorage.getItem("cards")!=undefined){
      var store = JSON.parse(localStorage.getItem("cards"));
      this.props.getLists(store);
    }
  }
  moveCard(lastX, lastY, nextX, nextY) {
    this.props.moveCard(lastX, lastY, nextX, nextY);
  }
  moveList(listId, nextX) {
    const { lastX } = this.findList(listId);
    this.props.moveList(lastX, nextX);
  }
  findList(id) {
    const { lists } = this.props;
    const list = lists.filter(l => l.id === id)[0];
    return {
      list,
      lastX: lists.indexOf(list)
    };
  }
  addCard = (id) =>{
    var addCard='AddCardinCol:'+id
    this.setState({showModal:true, modalType:addCard});
  }
  editColumn = (id) =>{
    var editcolumn='EditColumn:'+id
    this.setState({showModal:true,modalType: editcolumn});
  }
  editCard = (id) =>{
    var editcard='EditCard:'+id
    this.setState({showModal:true,modalType: editcard});
  }
  triggerClose(){
    this.setState({showModal:false});
  }
  modalAction(data){
    if(data.type.indexOf("AddCardinCol") !== -1){
      let column_id=data.type.split(":")[1];
      var id=0;
      if(this.props.lists[data.texts[3]].cards.length>0){
        let totalcount = 0;
        for (let i = 0; i < this.props.lists.length; i++) {
          for (let j = 0; j < this.props.lists[i].cards.length; j++) {
            totalcount += 1;
          }
        }
        id=totalcount;
      }
      var card={
        id: id,
        card_name: data.texts[0],
        card_content: data.texts[1],
        color: data.texts[2]
      };
      this.props.addCard(card,column_id);
    }else if(data.type.indexOf("EditColumn") !== -1){
      let column_id=data.type.split(":")[1];
      if(data.texts[3]=='-1'){
        let list=this.findList(column_id);
        this.props.deleteColumn(column_id);
      }else{
        var column={
          id: column_id,
          name: data.texts[0],
        };
        this.props.editColumn(column);
      }
    }else if(data.type.indexOf("EditCard") !== -1){
      let card_id=data.type.split(":")[1];
      if(data.texts[3]=='-1'){
        this.props.deleteCard(card_id);
      }else{
        var card={
          id: card_id,
          card_name: data.texts[0],
          card_content: data.texts[1],
          color: data.texts[2]
        };
        this.props.editCard(card);
      }
    }
  }
  render() {
    const { lists } = this.props;
    return (
      <div className="main" >
      <Scrollbars>
        {
          lists.map((item, i) =>
          <CardsContainer
            key={item.id}
            id={item.id}
            item={item}
            addCard={this.addCard}
            editColumn={this.editColumn}
            editCard={this.editCard}
            moveCard={this.moveCard}
            moveList={this.moveList}
            x={i}
          />
        )
      }
      </Scrollbars>
        {this.state.showModal==true ? <ModalComp showModal={this.state.showModal} type={this.state.modalType} onClose={this.triggerClose} onAction={this.modalAction} dataList={this.props.lists}/> : ''  }
      </div>
    );
  }
}
