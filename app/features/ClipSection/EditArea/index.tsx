import * as React from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';
import { Container } from 'typedi';
import { observer } from 'mobx-react';

import Toolbar from '../Toolbar';

import Timeline from 'components/Timeline';

import { GridLayout } from 'core/state/layouts/sequencer/grid';

@observer
export default class EditArea extends React.Component<{}, {}> {
  gridLayout = Container.get(GridLayout);

  render() {
    const { division, divisionWidth, nDivisions } = this.gridLayout;

    return (
      <EditAreaContainer id="editArea">
        <ToolbarContainer>
          <Toolbar />
        </ToolbarContainer>
        <EditAreaBody>
          <LayersPanel />
          <SnipsArea>
            <Timeline division={division} divisionWidth={divisionWidth} nDivisions={nDivisions} />
          </SnipsArea>
        </EditAreaBody>
      </EditAreaContainer>
    );
  }
}

const ToolbarContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid ${theme.colors.lightGray.toRgbString()};
`;

const SnipsArea = styled.div``;

const EditAreaBody = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

const LayersPanel = styled.div`
  width: 100px;
  height: 100%;
`;

const EditAreaContainer = styled.div`
  flex-grow: 1;
  background-color: ${theme.colors.black.toRgbString()};
  position: relative;
`;
