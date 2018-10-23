import React from 'react';
import axios from 'axios';

import { BACKEND_URL } from './api-config';

import { Button } from 'react-bootstrap';

class DeleteComp extends React.Component {

    state = {
        target:`http://${BACKEND_URL}/`+this.props.firstName+"/"+this.props.lastName,
        temp:0
        };

        changeTarget = () => {

            this.setState({temp:1});
            axios.delete(this.state.target);
            console.log(this.state.target);

                }

    render(){
        console.log("Delete Rendered")
        if (this.state.temp == 0){
      return (
  
  <div>
  <Button bsStyle="primary"  onClick={this.changeTarget}>Delete CV</Button>
  </div>);
  
    }else{
        return(<div></div>)
    }
}
  }
  
  export default DeleteComp;