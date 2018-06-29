import Panel from 'atoms/Panel';
import React from 'react';
import EditButton from 'atoms/Buttons/EditButton';
import styled from 'styled-components';
import { pink } from 'styles/colors';
import { remCalc } from 'styles/type';
import { Flex } from 'grid-styled';

interface Props {
  text: string;
  onEdit?(): void;
  className?: string;
}

const Goal: React.SFC<Props> = ({ text, onEdit, className }) => (
  <Panel className={className}>
    {onEdit && (
      <Flex justifyContent="flex-end">
        <EditButton component="Goal" onClick={onEdit} />
      </Flex>
    )}
    <Flex flexDirection="column" alignItems="center">
      <StarIcon className="material-icons">star</StarIcon>
      <StyledText>{text}</StyledText>
    </Flex>
  </Panel>
);

const StarIcon = styled.i`
  color: ${pink};
  font-size: ${remCalc(50)};
`;

const StyledText = styled.div`
  text-align: center;
  font-size: ${remCalc(64)};
`;

const StyledGoal = styled(Goal)`
  margin-bottom: 2rem;
`;

export default StyledGoal;
