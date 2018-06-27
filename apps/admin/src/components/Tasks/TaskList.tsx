import React from 'react';
import { Task } from 'reducers/tasks';
import styled from 'styled-components';
import { Box } from 'grid-styled';

import { svgBackgroundImageUrl } from 'styles';
import { mediumBlue, white } from 'styles/colors';
import { remCalc } from 'styles/type';
import TaskListItem from './TaskListItem';

const TaskContainer = styled.div`
  box-shadow: 0 0 4px 0 rgba(30 65 165, 0.2);
  display: flex;
  flex-direction: row;
  margin-bottom: ${remCalc(20)};
  position: relative;
  ./TaskList &.completed {
    div {
      background-color: ${mediumBlue};
    }
  }
`;

const TaskNumber = styled.div`
  align-items: center;
  background-color: ${white};
  border-bottom-left-radius: 4px;
  border-top-left-radius: 4px;
  bottom: 0;
  display: flex;
  font-size: ${remCalc(90)};
  font-weight: 700;
  justify-content: center;
  margin-right: 2px;
  position: relative;
  text-align: center;
  width: 130px;
`;

type SVGProps = {
  i: number;
};

const SVG = styled<SVGProps, 'div'>('div')`
  background-image: ${svgBackgroundImageUrl('hover-bg.svg')};
  background-position: ${props => `${Math.sin(props.i) * 100}% top`};
  background-repeat: repeat;
  background-size: 200%;
  border-radius: 5px;
  bottom: 0;
  left: 0;
  mix-blend-mode: lighten;
  overflow: hidden;
  position: absolute;
  right: 0;
  top: 0;
`;

interface Props {
  setTaskStatus;
  items: Partial<Task>[];
  url: string;
}

const TaskList: React.SFC<Props> = ({ items, setTaskStatus, url }) => {
  let taskClass = status => {
    return status === 'COMPLETED' ? 'completed' : 'active';
  };
  return (
    <Box>
      {items.map((task, index) => {
        return (
          <TaskContainer key={index} className={taskClass(task.status)}>
            <TaskNumber>
              <div>{index + 1}</div>
              <SVG i={index + 1} />
            </TaskNumber>
            <TaskListItem
              key={`item-${index}`}
              setTaskStatus={setTaskStatus}
              index={index}
              task={task}
              url={url}
            />
          </TaskContainer>
        );
      })}
    </Box>
  );
};

export default TaskList;
