import React from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { formatNumber } from "libphonenumber-js";

import ButtonLink from "atoms/ButtonLink";
import Modal from "components/Modal";
import { green } from "styles/colors";

interface Props {
  phoneNumber: string;
  link: string;
}

export class TermsModal extends React.Component<Props, {}> {
  formattedPhoneNumber() {
    return formatNumber(this.props.phoneNumber, "US", "National");
  }

  render() {
    const { link } = this.props;
    return (
      <StyledModal>
        <Container>
          <Link to={link}><i className="material-icons">close</i></Link>
          <h1>
            Text <address>{this.formattedPhoneNumber()}</address> to get
            started.
          </h1>
          <p>
            By continuing, you (the Client) agree to receive autodialed text
            messages to the mobile device phone number you provided and push
            notifications from the Steps application to your mobile device. You
            may opt-out of receiving text messages at any time by replying STOP
            to any Steps text message. Message and data rates may apply.
          </p>

          <p>
            The information you provide to this application (such as chat
            content, your financial plan, etc) may be used by your financial
            coach and <a href="https://ideo.org">IDEO.org</a>, the Step application’s creators (a non-profit)
            to evaluate the effectiveness of the app. Your information may also
            be used in promotional materials; but if we do so, your information
            will be anonymized.
          </p>

          <p>
            You will never be asked for personal information such as your Social
            Security Number, bank accounts, or credit card numbers. For your own
            privacy and protection never send this type of information when
            communicating with the app.
          </p>

          <p>By texting the number, you agree to these terms and conditions</p>
          <ButtonLink to={link}>Next</ButtonLink>
        </Container>
      </StyledModal>
    );
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

  i {
      font-size: 20px;
      position: absolute;
      top: 0;
      left: 0;
  }

  h1 {
    font-family: "Tiempos", serif;
    font-weight: 600;
  }

  p {
    font-family: "Calibre", sans-serif;
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

  button { margin-top: 14px; }
`;

export default TermsModal;