import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createClient  } from 'actions/clients';
import { Link, Redirect } from 'react-router-dom';
import { Flex, Box } from 'grid-styled';
import { remCalc } from 'styles/type';
import Button from 'atoms/Button';
import StackedInputRow from 'components/Forms/StackedInputRow';
import Panel from 'atoms/Panel';
import NewClientForm from './NewClientForm';

const Content = styled.div`
  position: relative;
  padding: 2em 2em 6em 2em;
  height: 100%;

  button {
    position: absolute;
    bottom:0;
    left: 50%;
    transform: translateX(-50%);
  }
`;

interface Props {
  className?: string;
  actions: any;
}

class NewClient extends React.Component<Props>{

  state = {
    shouldRedirect: false
  }
  setRedirect = () => {
    this.setState({
      shouldRedirect: true
    })
  }
  renderRedirect = () => {
    if (this.state.shouldRedirect) {
      return <Redirect to='/clients' from='/clients/new' />
    }
  }

  createClient = clientData => {
    this.props.actions.createClient(clientData)
      .then(res => {
        this.setRedirect();
        this.renderRedirect();
      }).catch(error => this.setState({ shouldRedirect: false, errorMessage: error }))
  };

  render () {
    return (

      <div className='new-client'>
        {this.renderRedirect()}
        <Flex flexWrap='wrap'>
          <Box width={[1, 1/2]} px={2}>
            <Content>
              <h2>Title</h2>
              <Box>Learn how this digital helper can help you achieve your dreams. It's a text message based program and will reach out to you once a day with reminders, content, and encouragement.</Box>
              <Button>Play Video</Button>
            </Content>
          </Box>
          <Box width={[1, 1/2]} px={2}>
            <Content>
              <NewClientForm onSubmit={this.createClient}></NewClientForm>
            </Content>
          </Box>
        </Flex>
        <Link to="/">Home</Link>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ createClient }, dispatch)
});

export default connect(null, mapDispatchToProps)(NewClient);
