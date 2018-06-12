import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setUserType } from 'actions/auth';
import { USER_TYPE } from 'reducers/auth';

import { white, black } from 'styles/colors';

class UserSwitcher extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = { show: false };
  }

  setSuperadmin = () => {
    this.props.actions.setUserType(USER_TYPE.SUPER_ADMIN);
  };

  setAdmin = () => {
    this.props.actions.setUserType(USER_TYPE.ADMIN);
  };

  setCoach = () => {
    this.props.actions.setUserType(USER_TYPE.COACH);
  };

  setClient = () => {
    this.props.actions.setUserType(USER_TYPE.CLIENT);
  };

  setNone = () => {
    this.props.actions.setUserType(null);
  };

  toggleDisplay = () => {
    this.setState({ show: !this.state.show });
  };

  render() {
    const { type } = this.props;

    return this.state.show ? (
      <Wrapper>
        <label>
          <input
            type="checkbox"
            onChange={this.setSuperadmin}
            checked={type === USER_TYPE.SUPER_ADMIN}
          />Superadmin
        </label>
        <label>
          <input
            type="checkbox"
            onChange={this.setAdmin}
            checked={type === USER_TYPE.ADMIN}
          />Admin
        </label>
        <label>
          <input
            type="checkbox"
            onChange={this.setCoach}
            checked={type === USER_TYPE.COACH}
          />Coach
        </label>
        <label>
          <input
            type="checkbox"
            onChange={this.setClient}
            checked={type === USER_TYPE.CLIENT}
          />Client
        </label>
        <label>
          <input
            type="checkbox"
            onChange={this.setNone}
            checked={type === null}
          />None
        </label>
        <button onClick={this.toggleDisplay}>hide</button>
      </Wrapper>
    ) : (
      <Wrapper>
        <a href="#" onClick={this.toggleDisplay}>
          show user switcher
        </a>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  background: ${white};
  box-shadow: 0 0 6px ${black};
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 10px;
  padding: 20px;
  right: 10px;
  z-index: 1000;

  input {
    margin-right: 10px;
  }

  label {
    margin-bottom: 10px;
  }
`;

const mapStateToProps = state => ({
  type: state.auth.type,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ setUserType }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserSwitcher);
