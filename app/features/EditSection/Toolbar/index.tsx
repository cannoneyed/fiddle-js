import * as React from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';
import { observer } from 'mobx-react';

@observer
export default class Toolbar extends React.Component<{}, {}> {
  render() {
    return (
      <ToolbarContainer id="editAreaToolbar">
        <h5>...</h5>
      </ToolbarContainer>
    );
  }
}

const ToolbarContainer = styled.div`
  position: absolute;
  top: 0px;
  height: ${theme.toolbarHeight.toString()};

  display: flex;
  flex-direction: row;
  align-items: center;
`;
