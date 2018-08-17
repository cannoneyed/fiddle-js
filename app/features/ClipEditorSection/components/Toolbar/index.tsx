import * as React from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';
import { observer } from 'mobx-react';

import { Clip } from 'core/models/clip';

export interface Props {
  clip: Clip;
}

@observer
export default class Toolbar extends React.Component<Props, {}> {
  render() {
    return (
      <ToolbarContainer id="editAreaToolbar">
        <h5>...</h5>
      </ToolbarContainer>
    );
  }
}

const ToolbarContainer = styled.div`
  height: ${theme.toolbarHeight.toString()};

  display: flex;
  flex-direction: row;
  align-items: center;
`;
