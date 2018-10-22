import React from 'react';
import axios from 'axios';

import { BACKEND_URL } from './api-config';

class AmendComp extends React.Component {
    constructor(props){
super(props)
this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {

    target:`${BACKEND_URL}/`+this.props.firstName+"/"+this.props.lastName

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

    render(){
        
      return (

        <form method="POST" encType="multipart/form-data" onSubmit={this.handleSubmit}>
    
		
				<input type="file" name="file" />
    
				<input type="submit" value="Upload"/>
			
		</form>

      )
    }
}
  
  
  export default AmendComp;