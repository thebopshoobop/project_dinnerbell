import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../../actions/user_actions";
import "../Profile/Profile.css";
import { withRouter } from "react-router-dom";
import Checkbox from "material-ui/Checkbox";
import FlatButton from "material-ui/FlatButton";

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

  componentWillReceiveProps = nextProps => {
    if (
      this.props.userReducer.user === null &&
      nextProps.userReducer.user !== null
    ) {
      const user = nextProps.userReducer.user;
      const checkboxes = { ...this.state };
      if (user && Array.isArray(user.dietaryRestrictions)) {
        user.dietaryRestrictions.forEach(restriction => {
          if (allPreferences.includes(restriction)) {
            checkboxes[restriction] = true;
          }
        });
        this.setState(checkboxes);
      }
    }
  };

  onCheck = preference => () => {
    this.setState({ ...this.state, [preference]: !this.state[preference] });
  };

<<<<<<< HEAD
  createCheckbox = label => {
    const user = this.props.userReducer.user
    return (
=======
  buildCheckbox = label => (
>>>>>>> 7fe12603093cd35292d4b92ba92eb5a0efa2091a
    <Checkbox
      key={label}
      label={label}
      checked={this.state[label]}
      onCheck={this.onCheck(label)}
    />
<<<<<<< HEAD
    );
  }
=======
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
>>>>>>> 7fe12603093cd35292d4b92ba92eb5a0efa2091a

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            Select your dietary requirements:
            <form onSubmit={this.handleFormSubmit}>
              {allPreferences.map(pref => this.buildCheckbox(pref))}

              <FlatButton
                primary
                backgroundColor="#fff"
                hoverColor="#aaa"
                onClick={this.handleFormSubmit}
              >
                Save
              </FlatButton>
            </form>
          </div>
        </div>
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
