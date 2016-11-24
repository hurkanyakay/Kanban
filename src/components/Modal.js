import React from "react";
import { Button,ButtonToolbar,Modal,FormGroup,ControlLabel,FormControl,Checkbox } from 'react-bootstrap';
import { SketchPicker } from 'react-color';

export default class ModalComp extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
    this.handleChange4 = this.handleChange4.bind(this);
    this.sendData = this.sendData.bind(this);
    this.setMyStates = this.setMyStates.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.state = {
      text1:'',
      text2:'',
      text3:'',
      text4:'0',
      item:''
    };
  }
  handleChange1(e){
    this.setState({text1: e.target.value});
  }
  handleChange2(e){
    this.setState({text2: e.target.value});
  }
  handleChange3(e){
    this.setState({text3: e.hex});
  }
  handleChange4(e){
    this.setState({text4: e.target.value});
  }
  setMyStates(a,b,c){
    if(a!=this.state.text1){
      this.setState({text1:a})
    }
    if(b!=this.state.text2){
      this.setState({text2:b})
    }
    if(c!=this.state.text3){
      this.setState({text3:c})
    }
  }
  componentWillMount(){
    var type=this.props.type;
    var cardList=this.props.dataList;
    if(type.indexOf("EditCard") !== -1){
      let card_id=type.split(":")[1];
      let card=null;
      for(let i=0; i<cardList.length; i++){
        for(let j=0; j<cardList[i].cards.length; j++){
          if(cardList[i].cards[j].id == card_id){
            card=cardList[i].cards[j];
          }
        }
      }
      this.setState({item:card});
      this.setMyStates(card.card_name,card.card_content,card.color);
    }else if(type.indexOf("EditColumn") !== -1){
      let column_id=type.split(":")[1];
      let column=null;
      for(let i=0; i<cardList.length; i++){
          if(cardList[i].id == column_id){
            column=cardList[i];
        }
      }
      this.setState({item:column});
      this.setMyStates(column.name);
    }else if(type=="Export"){
      this.setState({ text1:JSON.stringify(cardList) });
    }
  }
  sendData(){
    var data={
      type:this.props.type,
      texts:[this.state.text1,this.state.text2,this.state.text3,this.state.text4]
    }
    this.props.onAction(data);
    this.props.onClose();
    this.setState({text1: '',text2: '',text3: '',text4:'0',item:''});
  }
  deleteItem(){
    this.setState( { text4 : '-1' }, function() {
       this.sendData();
     }.bind(this));
  }

  render() {
    var type=this.props.type;
    var cardList=this.props.dataList;
    var title="";
    var action_button='';
    var content='';
    if(type=="AddColumn"){
      title="Add Column";
      action_button=<Button onClick={this.sendData}>Add Column</Button>
      content=<FormControl type="text" value={this.state.text1} placeholder="Column Name" onChange={this.handleChange1} />
    }else if(type=="AddCard"){
      title="Add Card";
      if(cardList.length>0){
        action_button=<Button onClick={this.sendData}>Add Card</Button>
        content=<div className="row"><div className="col-md-6"><FormControl type="text" value={this.state.text1} placeholder="Card Name" onChange={this.handleChange1} /><br /> <FormControl componentClass="textarea" value={this.state.text2} placeholder="Card Content" onChange={this.handleChange2} />
        <br />  <FormControl componentClass="select" placeholder="Select Column" onChange={this.handleChange4} >
          {cardList.map((item, i) =>
              <option key={i} value={item.id}>{item.name}</option>
          )}
         </FormControl>
         </div>
        <div className="col-md-6">
          <SketchPicker className="text-center" color={ this.state.text3 } onChangeComplete={ this.handleChange3 } />
        </div>
        </div>
      }else{
        content=<div>There is no column.. </div>
      }
    }else if(type.indexOf("AddCardinCol") !== -1){
      title="Add Card";
      action_button=<Button onClick={this.sendData}>Add Card</Button>
      content=<div className="row"><div className="col-md-6"><FormControl type="text" value={this.state.text1} placeholder="Card Name" onChange={this.handleChange1} /><br /> <FormControl componentClass="textarea" value={this.state.text2} placeholder="Card Content" onChange={this.handleChange2} />
       </div>
      <div className="col-md-6">
        <SketchPicker className="text-center" color={ this.state.text3 } onChangeComplete={ this.handleChange3 } />
      </div>
      </div>

    }else if(type.indexOf("EditCard") !== -1){
      let card=this.state.item;
      title="Edit Card";
      action_button=<Button onClick={this.sendData}>Edit Card</Button>
      content=<div className="row"><div className="col-md-6"><FormControl type="text" value={ this.state.text1 } placeholder="Card Name" onChange={this.handleChange1} /><br /> <FormControl componentClass="textarea" value={ this.state.text2 } placeholder="Card Content" onChange={this.handleChange2} />
       </div>
      <div className="col-md-6">
        <SketchPicker className="text-center" color={ this.state.text3 } onChangeComplete={ this.handleChange3 } />
      </div>
      <div className="col-md-12">
        <button className="btn btn-danger" onClick={this.deleteItem }>Delete Card</button>
      </div>
      </div>

    }else if(type.indexOf("EditColumn") !== -1){
      let column=this.state.item;
      title="Edit Column";
      action_button=<Button onClick={this.sendData}>Edit Column</Button>
      content=<div className="row"><div className="col-md-6"><FormControl type="text" value={ this.state.text1 } placeholder="Column Name" onChange={this.handleChange1} />
       </div>
       <div className="col-md-6">
         <button className="btn btn-danger" onClick={this.deleteItem }>Delete Column</button>
       </div>
       </div>
    }else if(type=="Import"){
      title="Export";
      action_button=<Button onClick={this.sendData}>Import JSON</Button>
      content=<div className="row"><div className="col-md-12"><FormControl componentClass="textarea" value={ this.state.text1 } placeholder="Import JSON" onChange={this.handleChange1}/>
       </div>
       </div>

    }else if(type=="Export"){
      title="Export";
      content=<div className="row"><div className="col-md-12"><FormControl componentClass="textarea" value={ this.state.text1 } placeholder="Export" />
       </div>
       </div>
    }
    return (
      <Modal show={this.props.showModal} onHide={this.props.onClose}>
        <Modal.Header closeButton>
          <Modal.Title> {title} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup controlId="formBasicText">
            <ControlLabel>{title} </ControlLabel>
            {content}
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <ButtonToolbar>
            {action_button}
            <Button className="pull-right" onClick={this.props.onClose}>Close</Button>
          </ButtonToolbar>
        </Modal.Footer>
      </Modal>
    );
  }
}
