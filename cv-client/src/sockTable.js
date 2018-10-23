
import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import axios from 'axios';
import BespokeGetComp from './bespokeGet';
import DeleteComp from './DeleteComp';
import AmendComp from './AmendComp';

import { BACKEND_URL } from './api-config';

// import 'react-bootstrap-table/css/react-bootstrap-table.css';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

class ExtraDataColumnFormatTable extends React.Component {

    state = {

        message : [],
        messageMeta : [],
        cvs : []
        };

    constructor(props){
        super(props);

        axios.get(`http://${BACKEND_URL}/getAllMeta`).then(response => {
	
            this.setState({messageMeta: response.data},() => {

                axios.get(`http://${BACKEND_URL}/getAll`).then(response => {
        
                    this.setState({message: response.data},() => {

                        this.popWorkingList();
        
                    })
            
                    })

            })

            })                
       
    }

popWorkingList(){

    var temp =  [];

    for (let i = 0; i < this.state.message.length; i++) {
 
      temp.push({
        id: this.state.messageMeta[(3*i)+2],
        fileName: this.state.message[i],
        firstName: this.state.messageMeta[3*i],
        lastName: this.state.messageMeta[(i*3)+1],
        quality: <BespokeGetComp name={this.state.message[i]}/>,
        delete: <DeleteComp firstName = {this.state.messageMeta[3*i]} lastName = {this.state.messageMeta[(3*i)+1]}/>,
        amend: <AmendComp firstName = {this.state.messageMeta[3*i]} lastName = {this.state.messageMeta[(3*i)+1]}/>
      
      });

      this.setState({cvs:temp});
    
    }

}


deleteFormatter(cell, row, enumObject) {

    return (<div>{cell}</div>);
   
  }


render() {

    console.log("Has rendered socks");

    if (this.props.changed){
    this.state.cvs.push({
        id: 0,
        fileName: this.props.firstName+this.props.lastName+"CV",
        firstName: this.props.firstName,
        lastName: this.props.lastName,
        quality: <BespokeGetComp name={this.props.firstName+this.props.lastName+"CV"}/>,
        delete: <DeleteComp firstName = {this.props.firstName} lastName = {this.props.lastName}/>,
        amend: <AmendComp firstName = {this.props.firstName} lastName = {this.props.lastName}/>
      
      });

    }

    return (<div>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css"/>
<script src="http://code.jquery.com/jquery-2.1.3.min.js"></script>
<meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <BootstrapTable ref='table' data={ this.state.cvs } >
        <TableHeaderColumn dataField='id' isKey={ true } dataSort = {true}>Delegate ID</TableHeaderColumn>
        <TableHeaderColumn dataField='fileName' dataSort = {true}>File Name</TableHeaderColumn>
        <TableHeaderColumn dataField='firstName' dataSort = {true}>First Name</TableHeaderColumn>
        <TableHeaderColumn dataField='lastName' dataSort = {true}>Last Name</TableHeaderColumn>
        <TableHeaderColumn dataField='quality'  dataFormat={ this.deleteFormatter.bind(this) }>Download</TableHeaderColumn>
        <TableHeaderColumn dataField='delete' dataFormat={ this.deleteFormatter.bind(this) }>Delete</TableHeaderColumn>
        <TableHeaderColumn dataField='amend' dataFormat={ this.deleteFormatter.bind(this) }>Amend</TableHeaderColumn>
      </BootstrapTable>
      </div>
    );
  }

}

export default ExtraDataColumnFormatTable;
  
