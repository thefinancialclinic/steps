import moment from 'moment';
import React from 'react';
import { grey } from 'styles/colors';
import styled from 'styled-components';

interface Props {
  date: moment.Moment;
  className?: string;
}

const DateDisplay: React.SFC<Props> = ({ date }) => (
  <StyledDate>{date.format('YYYY-MM-DD')}</StyledDate>
);

const StyledDate = styled.div`
  color ${grey};
`;

export default DateDisplay;
