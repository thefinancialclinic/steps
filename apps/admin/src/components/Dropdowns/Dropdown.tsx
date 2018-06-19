import React from 'react';
import styled from 'styled-components';
import Color from 'color';
import onClickOutside from 'react-onclickoutside';

import Panel from 'atoms/Panel';
import { darkBlue, white } from 'styles/colors';

interface Props {
  className?: string;
  title: string;
}

interface State {
  open: boolean;
}

export class Dropdown extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  handleClickOutside(_event) {
    this.setState({
      open: false,
    });
  }

  toggle() {
    this.setState(prevState => ({
      open: !prevState.open,
    }));
  }

  title() {
    return `${this.props.title} \u25BE`;
  }

  renderDropdownItems() {
    if (this.state.open) {
      return (
        <div className="dropdown">
          <div className="arrow-up" />
          <StyledPanel className="dropdown-content">
            {this.props.children}
          </StyledPanel>
        </div>
      );
    }
  }

  render() {
    return (
      <div className={this.props.className}>
        <div className="dropdown-toggle" onClick={this.toggle}>
          {this.title()}
          <div className="arrow-down" />
        </div>
        {this.renderDropdownItems()}
      </div>
    );
  }
}

const StyledPanel = styled(Panel)`
  box-shadow: 0 4px 4px
    ${Color(darkBlue)
      .fade(0.75)
      .rgb()
      .string()};
`;

const CloseOnOutsideClickDropdown = onClickOutside(Dropdown);

const StyledDropdown = styled<Props>(CloseOnOutsideClickDropdown)`
  .dropdown {
    position: absolute;
    z-index: 1;
  }

  .dropdown-toggle {
    text-transform: uppercase;
    cursor: pointer;
  }

  .dropdown-content {
    background-color: ${white};
    margin-top: 0;
  }

  .arrow-up {
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;

    border-bottom: 5px solid ${white};
  }
`;

export default StyledDropdown;
