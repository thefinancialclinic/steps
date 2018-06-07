import React from 'react';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import Button from 'atoms/Button';
import StackedInputRow from 'components/Forms/StackedInputRow';
import Panel from 'atoms/Panel';

import { remCalc } from 'styles/type';
import { grey } from 'styles/colors';

interface Props {
  className?: string;
}

class Signup extends React.Component<Props, {}> {
  render() {
    return (
      <div className={this.props.className}>
        <div className="left">word</div>
        <Panel className="right">
          <h2>Sign Up</h2>
          <p className="subtext">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime vero
            qui totam consequatur deserunt harum tempora mollitia quam? Esse
            corrupti mollitia aspernatur aperiam adipisci doloremque ea libero
            praesentium, in fuga?
          </p>
          <StackedInputRow label="First" />
          <StackedInputRow label="Last" />
          <StackedInputRow label="Organization's Name" />
          <StackedInputRow label="Email" />
          <StackedInputRow label="Password" />
          <div className="sign-up-button">
            <Link to="/admin/profile">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </Panel>
      </div>
    );
  }
}
const StyledSignup = styled(Signup)`
  display: table;
  min-height: 100%;

  .left {
    width: 100%;
  }

  .right {
    border-radius: 0;
    display: table-cell;
    min-height: 100%;
    padding: 30px;
    width: 400px;
  }

  .subtext {
    color: ${grey};
    margin-bottom: ${remCalc(40)};
  }

  .sign-up-button {
    text-align: center;
  }
`;

const mapStateToProps = (state, props) => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StyledSignup);
