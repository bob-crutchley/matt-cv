import React from 'react';

import { BACKEND_URL } from './api-config';

// import Button from 'react-bootstrap/lib/Button';

import { Button } from 'react-bootstrap';

class BespokeGetComp extends React.Component {

    state = {

        target:`http://${BACKEND_URL}/`
       
        };

    changeTarget = () => {

var newTarget = `http://${BACKEND_URL}/`+this.props.name;

this.setState({target:newTarget});

console.log(this.state.target);

console.log(newTarget);

    }

    render(){
      return (
  
  <div>

      
  <form method="get" action={this.state.target}>
 
  <Button type="submit" bsStyle="primary" onClick={this.changeTarget}>Download CV</Button>

</form>
  </div>);
  
    }
  }
  
  export default BespokeGetComp;