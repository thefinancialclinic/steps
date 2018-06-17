import React from 'react';
import styled from 'styled-components';
import { formatNumber } from 'libphonenumber-js';

import Modal from 'components/Modal';
import { black, green } from 'styles/colors';
import Button from 'atoms/Buttons/Button';

interface Props {
  phoneNumber: string;
}

interface State {
  closed: boolean;
}

export class TermsModal extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      closed: false,
    };
    this.close = this.close.bind(this);
  }

  close() {
    this.setState({ closed: true });
  }

  formattedPhoneNumber() {
    return formatNumber(this.props.phoneNumber, 'US', 'National');
  }

  render() {
    if (this.state.closed) {
      return null;
    } else {
      return (
        <StyledModal>
          <Container>
            <i className="material-icons close" onClick={this.close}>
              close
            </i>
            <h1>
              Text <address>{this.formattedPhoneNumber()}</address> to get
              started.
            </h1>
            <p>
              By continuing, you (the Client) agree to receive autodialed text
              messages to the mobile device phone number you provided and push
              notifications from the Steps application to your mobile device.
              You may opt-out of receiving text messages at any time by replying
              STOP to any Steps text message. Message and data rates may apply.
            </p>

            <p>
              The information you provide to this application (such as chat
              content, your financial plan, etc) may be used by your financial
              coach and <a href="https://ideo.org">IDEO.org</a>, the Step
              application’s creators (a non-profit) to evaluate the
              effectiveness of the app. Your information may also be used in
              promotional materials; but if we do so, your information will be
              anonymized.
            </p>

            <p>
              You will never be asked for personal information such as your
              Social Security Number, bank accounts, or credit card numbers. For
              your own privacy and protection never send this type of
              information when communicating with the app.
            </p>

            <p>
              By texting the number, you agree to these terms and conditions
            </p>
            <a onClick={this.close}>
              <Button>Next</Button>
            </a>
          </Container>
        </StyledModal>
      );
    }
  }
}

const StyledModal = styled(Modal)`
  div {
    position: relative;
    min-width: 400px;
    max-width: 840px;
    margin: auto;
  }
  margin: auto;
`;

const Container = styled.div`
  text-align: center;
  padding: 54px 54px 30px 54px;

  i.close {
    color: ${black};
    font-size: 20px;
    position: absolute;
    top: 0;
    left: 0;
  }

  h1 {
    font-family: 'Tiempos', serif;
    font-weight: 600;
  }

  p {
    font-family: 'Calibre', sans-serif;
    text-align: left;

    a {
      text-decoration: none;
      color: ${green};
    }
  }

  address {
    display: inline;
    color: ${green};
    font-style: normal;
  }

  button {
    margin-top: 14px;
  }
`;

export default TermsModal;
