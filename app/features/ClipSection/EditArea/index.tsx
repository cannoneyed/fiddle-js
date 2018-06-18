import * as React from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';
import { Container } from 'typedi';
import { observer } from 'mobx-react';
import { injector } from 'utils/injector';

import { Fraction } from 'core/primitives/fraction';

import Toolbar from '../Toolbar';
import Timeline from 'components/Timeline';

import { GridLayout } from 'core/state/layouts/sequencer/grid';

export interface Props {}
export interface InjectedProps {
  division: Fraction;
  divisionWidth: number;
  nDivisions: number;
}

const inject = injector<Props, InjectedProps>(props => {
  const gridLayout = Container.get(GridLayout);

  return {
    division: gridLayout.division,
    divisionWidth: gridLayout.divisionWidth,
    nDivisions: gridLayout.nDivisions,
  };
});

@observer
export class EditArea extends React.Component<Props & InjectedProps, {}> {
  render() {
    const { division, divisionWidth, nDivisions } = this.props;
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

export default inject(EditArea);

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
