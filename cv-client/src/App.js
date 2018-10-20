import React, { Component } from 'react';

import axios from 'axios';

import { Container, Row, Col, Input, Button, Fa, Card, CardBody } from 'mdbreact';


//this line really mucks with the css for the whole frontend
import 'mdbreact/dist/css/mdb.css';

// import 'mdbreact/dist/css/style.css';

import ExtraDataColumnFormatTable from './sockTable'

import './App.css';

import { BACKEND_URL } from './api-config';



class App extends Component {
state = {

getTarget:`http://${BACKEND_URL}/`,
temp:1,
firstState : "",
lastState : "",
displayAdd : false,
changeSocks:false
}



  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGet = this.handleGet.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.changeAddVis = this.changeAddVis.bind(this);


  
  }

  


  handleSubmit(event) {



    event.preventDefault();
    const data = new FormData(event.target);

    var first = document.getElementById("firstName").value;
    var last = document.getElementById("lastName").value;

    fetch(`http://${BACKEND_URL}/`+first+"/"+last, {
      method: 'POST',
      body: data,
    });
  }


  handleGet(){
    var last = document.getElementById("lastName").value;
    this.state.getTarget = `http://${BACKEND_URL}/`+last;
  }

  handleUpload(){
    var first = document.getElementById("firstName").value;
    var last = document.getElementById("lastName").value;
    this.setState({firstState:first});
    this.setState({lastState:last});
    this.setState({changeSocks:true})
  }

  changeAddVis(){

var oppDisplayAdd = !(this.state.displayAdd);

    this.setState({displayAdd:oppDisplayAdd});

  }

  
  render() {


    if (this.state.displayAdd){
    return (

      <div className="App">

      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous"/>
      
 <Container>
        <Row>
          <Col md="12">
            <Card>
              <CardBody>
                <form  method="POST" encType="multipart/form-data" onSubmit={this.handleSubmit}>
                  <p className="h1 text-center py-4">Upload a new CV</p>
                  <div className="grey-text">
                    <Input id = "firstName" label="First name" icon="user" group type="text" validate error="wrong" success="right"/>
                    <Input  id = "lastName" label="Last name" icon="user" group type="text" validate error="wrong" success="right" onChange={this.handleGet}/>
                  </div>
                  <div className="text-center py-4 mt-3">
                 <div id = "bespokeDiv">
                  <input id = "bespoke" type="file" name="file" accept="application/vnd.openxmlformats-officedocument.wordprocessingml.document"/>
                 </div>
              
                  <br/>
                    <Button color="cyan" type="submit" onClick = {this.handleUpload}>Upload</Button>
                  </div>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
<br/>
<i class="fas fa-angle-double-up"></i>
      <button id = "dropdown" value = "Display Add CV" onClick = {this.changeAddVis}>Hide Dropdown</button>
      <i class="fas fa-angle-double-up"></i>
     
			<br/>
      <br/>
    

<ExtraDataColumnFormatTable firstName={this.state.firstState} lastName={this.state.lastState} changed={this.state.changeSocks}/>
      </div>
      );

    }else{
      return(

     

        <div className="App">  
         <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous"/>
      
        <br/>
        
<i class="fas fa-angle-double-down"></i>

        <button id = "dropdown" value = "Display Add CV" onClick = {this.changeAddVis}>Display Add CV</button>
        
<i class="fas fa-angle-double-down"></i>
        <br/>
        <br/>
      
  
  <ExtraDataColumnFormatTable firstName={this.state.firstState} lastName={this.state.lastState} changed={this.state.changeSocks}/>
        </div>
        );
    }
    
  }
}

export default App;
