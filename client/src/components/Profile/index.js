import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../../actions/user_actions";
import Dropzone from "react-dropzone";
import "./Profile.css";
import PreferenceSetter from "../PreferenceSetter";
import { withRouter, Link } from "react-router-dom";
import AsyncManager from "../../services/AsyncManager.js";
import FlatButton from "material-ui/FlatButton";
import _ from "lodash";

import UserLogContainer from "../UserLogContainer";

class Profile extends Component {
  state = {};

  allowedActions = () => {
    const local = this.state;
    const current = this.props.userReducer;
    if (local && current.user && local._id === current.user._id) {
      return this.props.userActions;
    }
  };

  imageSelected = async files => {
    const actions = this.allowedActions();
    if (actions) actions.setUserProfileImage(files[0]);
  };

  updateArray = field => async newData => {
    const actions = this.allowedActions();
    if (actions) actions.updateUser({ ...this.state, [field]: newData });
  };

  fetchUser = async id => {
    this.setState(await AsyncManager.getRequest(`/api/users/${id}`));
  };


  componentDidMount() {
    const user = this.props.userReducer.user;
    let id = this.props.match.params._id;
    id = id ? id : user._id;
    if (id) this.fetchUser(id);
  }

  componentWillReceiveProps(nextProps) {
    const current = this.props.match.params._id;
    const next = nextProps.match.params._id;
    if (next && next !== current) this.fetchUser(next);

    const nextUser = nextProps.userReducer.user;
    const currentPic = this.state.profilePicture;
    if (this.allowedActions() && nextUser && currentPic !== nextUser.profilePicture) {
      this.setState({ profilePicture: nextUser.profilePicture });
    }
  }

  render() {
    const { userReducer } = this.props;
    const { recipes = [], meals = [], registeredMeals = [] } = this.state;
    return (
      <div className="profile">
        <p className="profile-name">{this.state.username}</p>
        <Dropzone onDrop={this.imageSelected} style={{ border: "none" }}>
          {!this.state.profilePicture ? (
            <div className="profile-pic-default" />
          ) : (
            <div className="profile-pic-custom">
              <img src={this.state.profilePicture} alt="" />
            </div>
          )}
        </Dropzone>
        <br/>
        {this.allowedActions() && 
          <Link to={"/profileUpdater"}>
            <FlatButton primary backgroundColor="#fff" hoverColor="#aaa"
              fullWidth={true} 
              style={{padding: '0px 10px'}}
              >Update Account Settings
            </FlatButton>
          </Link>
            }
        
        <br />
        <PreferenceSetter
          updateUser={this.props.userActions.updateUser}
          show={this.allowedActions()}
          user={this.state}
        />
        <div className='user-logs-container'>
          <UserLogContainer
            title="recipes"
            resource="recipes"
            items={recipes}
            updateArray={this.updateArray("recipes")}
          />
          <UserLogContainer
            title="meals"
            resource="meals"
            items={meals}
            updateArray={this.updateArray("meals")}
          />
          <UserLogContainer
            title="invited"
            resource="meals"
            items={registeredMeals}
            updateArray={this.updateArray("registeredMeals")}
          />
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
  connect(mapStateToProps, mapDispatchToProps)(Profile)
);
