import React, { Component } from 'react';
import { Paper } from 'material-ui';
import { withRouter } from 'react-router-dom';

import './Landing.css';

const style = {
  height: 100,
  width: 100
};

// const onClickRegister = () => {
//   this.props
// }

class Landing extends Component {
  state = {
    login: false
  };

  goToRegister = () => {
    this.props.history.push('/register');
  };

  goToLogin = () => {
    this.props.history.push('/login');
  };

  render() {
    return (
      <section className="landing">
        <h1 className="landing-title">dinnerbell</h1>
        <div className="landing-auth-container">
          <button onClick={this.goToRegister}>register</button>
          <button onClick={this.goToLogin}>login</button>
        </div>
        <div className="landing-images ">
          <Paper style={style} zDepth={2}>
            <div className="landing-img-container-1" />
          </Paper>
          <Paper style={style} zDepth={2}>
            <div className="landing-img-container-2" />
          </Paper>
          <Paper style={style} zDepth={2}>
            <div className="landing-img-container-3" />
          </Paper>
        </div>
        <div className="landing-images">
          <Paper style={style} zDepth={2}>
            <div className="landing-img-container-4" />
          </Paper>
          <Paper style={style} zDepth={2}>
            <div className="landing-img-container-5" />
          </Paper>
          <Paper style={style} zDepth={2}>
            <div className="landing-img-container-6" />
          </Paper>
        </div>
        <div className="landing-images">
          <Paper style={style} zDepth={2}>
            <div className="landing-img-container-7" />
          </Paper>
          <Paper style={style} zDepth={2}>
            <div className="landing-img-container-8" />
          </Paper>
          <Paper style={style} zDepth={2}>
            <div className="landing-img-container-9" />
          </Paper>
        </div>
      </section>
    );
  }
}

export default withRouter(Landing);

// <img
//   className="landing-img"
//   src="https://www.bellamysorganic.com.au/blog/wp-content/uploads/2013/12/understanding-the-health-benefits-of-organic-food-1.jpg"
// />
