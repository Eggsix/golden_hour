import React from "react"
import styled from 'styled-components'
import {SplitScreenInterface, PaneInterface} from "../interfaces/SplitScreen.interface"

const Container = styled.div`  
  display: flex;
`;

const Pane = styled.div<PaneInterface>`
  flex: ${props => props.weight};
`;

export const SplitScreen = ({ children, leftWeight = 1, rightWeight = 1 }: SplitScreenInterface) => {
  const [left, right] = React.Children.toArray(children);
  return (
    <Container>
      <Pane weight={leftWeight}>{left}</Pane>
      <Pane weight={rightWeight}>{right}</Pane>
    </Container>
  );
};