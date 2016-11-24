import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ListsActions from '../actions/lists';
import faker from 'faker';
import { Button,ButtonToolbar,Modal } from 'react-bootstrap';
import ModalComp from './Modal'

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ListsActions, dispatch);
}
function mapStateToProps(state) {
  return {
    lists: state.lists.lists
  };
}
@connect(mapStateToProps,mapDispatchToProps)
export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.triggerClose = this.triggerClose.bind(this);
    this.modalAction = this.modalAction.bind(this);
    this.LoadDummy = this.LoadDummy.bind(this);
    this.AddColumn = this.AddColumn.bind(this);
    this.AddCard = this.AddCard.bind(this);
    this.Import = this.Import.bind(this);
    this.Export = this.Export.bind(this);
    this.state = {
      showModal: false,
      modalType:''
    };
  }
  Import(){
    this.setState({showModal:true, modalType:'Import'});
  }
  Export(){
    this.setState({showModal:true, modalType:'Export'});
  }
  LoadDummy(){
    var quantity=10;
    var colorlist=5;
    const lists = [];
    let totalcount = 0;
    for (let i = 0; i < quantity; i++) {
      const cards = [];
      const randomQuantity = Math.floor(Math.random() * quantity) + 1;
      for (let ic = 0; ic < randomQuantity; ic++) {
        cards.push({
          id: totalcount,
          card_name: faker.lorem.sentence(),
          card_content: faker.lorem.paragraph(),
          color: "#"+(Math.random()*0xFFFFFF<<0).toString(16)
        });
        totalcount = totalcount + 1;
      }
      lists.push({
        id: i,
        name: faker.lorem.sentence(),
        cards
      });
    }
    this.props.getLists(lists);
  }
  AddColumn(){
    this.setState({showModal:true, modalType:'AddColumn'});
  }
  AddCard(){
    this.setState({showModal:true, modalType:'AddCard'});
  }
  triggerClose(){
    this.setState({showModal:false});
  }
  modalAction(data){
    if(data.type=="AddColumn"){
      var id=0;
      if(this.props.lists.length>0){
        id=this.props.lists.length;
      }
      var column={
        id: id,
        name: data.texts[0],
        cards:[]
      };
      this.props.addColumn(column);
    }else if(data.type=="AddCard"){
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
      this.props.addCard(card,data.texts[3]);
    }else if(data.type=="Import"){
      var store=JSON.parse(data.texts[0]);
      this.props.getLists(store);
    }
  }
  render() {
    return (
      <div className="row header">
        <div className="col-md-12">
        <ButtonToolbar>
          <Button bsStyle="primary" onClick={this.LoadDummy}>LOAD Dummy Data</Button>
          <Button bsStyle="primary" onClick={this.AddColumn}>Add Column</Button>
          <Button bsStyle="primary" onClick={this.AddCard}>Add Card</Button>
          <Button bsStyle="primary" onClick={this.Import}>Import</Button>
          <Button bsStyle="primary" onClick={this.Export}>Export</Button>
        </ButtonToolbar>
        </div>
        {this.state.showModal==true ? <ModalComp showModal={this.state.showModal} type={this.state.modalType} onClose={this.triggerClose} onAction={this.modalAction} dataList={this.props.lists}/> : ''  }
      </div>
    );
  }
}
