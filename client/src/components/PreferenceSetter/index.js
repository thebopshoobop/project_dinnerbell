import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../../actions/user_actions";
import "../Profile/Profile.css";
import { withRouter } from "react-router-dom";
import Checkbox from "material-ui/Checkbox";
import FlatButton from "material-ui/FlatButton";

import "./PreferenceSetter.css";

const allPreferences = [
  "balanced",
  "high-protein",
  "low-fat",
  "low-carb",
  "vegan",
  "vegetarian",
  "sugar-conscious",
  "peanut-free",
  "tree-nut-free",
  "alcohol-free"
];

const buildCheckboxes = (acc, preference) => {
  acc[preference] = false;
  return acc;
};

class PreferenceSetter extends Component {
  constructor(props) {
    super(props);
    this.state = allPreferences.reduce(buildCheckboxes, {});
  }

  populatePreferences = user => {
    const checkboxes = { ...this.state };
    if (user && Array.isArray(user.dietaryRestrictions)) {
      user.dietaryRestrictions.forEach(restriction => {
        if (allPreferences.includes(restriction)) {
          checkboxes[restriction] = true;
        }
      });
      this.setState(checkboxes);
    }
  };

  componentWillReceiveProps = nextProps => {
    if (
      this.props.userReducer.user === null &&
      nextProps.userReducer.user !== null
    ) {
      this.populatePreferences(nextProps.userReducer.user);
    }
  };

  componentDidMount = () => {
    if (this.props.userReducer.user) {
      this.populatePreferences(this.props.user);
    }
  };

  onCheck = preference => () => {
    this.setState({ ...this.state, [preference]: !this.state[preference] });
  };

  buildCheckbox = label => (
    <Checkbox
      key={label}
      label={label}
      checked={this.state[label]}
      onCheck={this.props.show ? this.onCheck(label) : null}
    />
  );

  handleFormSubmit = e => {
    e.preventDefault();
    const user = this.props.userReducer.user;
    const { updateUser } = this.props;
    const preferences = Object.entries(
      this.state
    ).reduce((acc, [pref, selected]) => {
      if (selected) acc.push(pref);
      return acc;
    }, []);
    updateUser({ ...user, dietaryRestrictions: preferences });
  };

  render() {
    return (
      <div className="preference-setter">
        <h5>
          {this.props.show
            ? "Select your dietary requirements"
            : `${this.props.user.username}'s dietary preferences:`}
        </h5>
        <form onSubmit={this.handleFormSubmit}>
          {allPreferences.map(pref => this.buildCheckbox(pref))}
          {this.props.show ? (
            <FlatButton
              backgroundColor="#E34B27"
              hoverColor="#C32B07"
              style={{ marginTop: "5px", padding: "0px 10px", color: "#fff" }}
              onClick={this.handleFormSubmit}
            >
              Save
            </FlatButton>
          ) : null}
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch)
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PreferenceSetter)
);
