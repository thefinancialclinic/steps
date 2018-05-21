import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

import { remCalc } from 'styles/type';

interface Props {
  className?: string;
  children: any;
  to: string;
  white?: boolean;
}

class ButtonLink extends React.Component<Props, {}> {
  static defaultProps = { white: false };

  render() {
    const { className, children, to, white } = this.props;

    return <Link to={to}><Button {...this.props}>{children}</Button></Link>;
  }
}

export default ButtonLink;
