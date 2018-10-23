import React from 'react';
import axios from 'axios';

import { BACKEND_URL } from './api-config';

import { Button } from 'react-bootstrap';

class AmendComp extends React.Component {
    constructor(props){
super(props)
this.handleSubmit = this.handleSubmit.bind(this);
this.clickLabel = this.clickLabel.bind(this);
    }

    state = {

    target:`http://${BACKEND_URL}/`+this.props.firstName+"/"+this.props.lastName

    };

        handleSubmit(event) {
            event.preventDefault();
            const data = new FormData(event.target);

            axios.delete(this.state.target);
        
        
            fetch(this.state.target, {
              method: 'POST',
              body: data,
            });
            console.log("Submitted");
          }

          clickLabel(){

            document.getElementById("fileLabel").click();


          }

    render(){
        
      return (
<div>




        <form method="POST" encType="multipart/form-data" onSubmit={this.handleSubmit}>
    
		
				<input type="file" class="custom-file-input" id = "file" name="file" style={{color:'red',opacity:'0',position: 'absolute',width: '1px', height : '1px'}}/>
        
        <label id="fileLabel" for="file" type = "button" style={{color:'red',opacity:'0',position: 'absolute',width: '1px', height : '1px'}}>!!Upload file!!</label>
			
        <Button bsStyle = "primary" type="button" onClick={this.clickLabel}>Select File</Button>
        <Button bsStyle = "primary" type="submit" >Upload</Button>
			
		</form>
    </div>

      )
    }
}
  
  
  export default AmendComp;