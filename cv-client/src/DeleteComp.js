import React from 'react';
import axios from 'axios';

import { BACKEND_URL } from './api-config';

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
  <button  onClick={this.changeTarget}>Delete CV!</button>
  </div>);
  
    }else{
        return(<div></div>)
    }
}
  }
  
  export default DeleteComp;