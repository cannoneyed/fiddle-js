import * as React from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';
import { Container } from 'typedi';
import { observer } from 'mobx-react';
import { injector } from 'utils/injector';

import { Fraction } from 'core/primitives/fraction';

import ClipEdit from '../ClipEdit';
import Toolbar from '../Toolbar';
import Timeline from 'components/Timeline';

import { ClipEditorState } from 'core/state/app/clip-editor';
import { ClipStore, Clip } from 'core/state/stores/clips';
import { GridLayout } from 'core/state/layouts/clip-editor/grid';

export interface Props {}
export interface InjectedProps {
  clip: Clip | null;
  division: Fraction;
  divisionWidth: number;
  nDivisions: number;
}

const inject = injector<Props, InjectedProps>(props => {
  const gridLayout = Container.get(GridLayout);
  const clipEditorState = Container.get(ClipEditorState);
  const clipStore = Container.get(ClipStore);

  const clipId = clipEditorState.selectedClipId;
  const clip = clipStore.getClipById(clipId);

  return {
    clip,
    division: gridLayout.division,
    divisionWidth: gridLayout.divisionWidth,
    nDivisions: gridLayout.nDivisions,
  };
});

@observer
export class EditArea extends React.Component<Props & InjectedProps, {}> {
  render() {
    const { clip, division, divisionWidth, nDivisions } = this.props;
    return (
      <EditAreaContainer id="editArea">
        <ToolbarContainer>
          <Toolbar />
        </ToolbarContainer>
        <EditAreaBody>
          <LayersPanel />
          <SnipsArea>
            <Timeline division={division} divisionWidth={divisionWidth} nDivisions={nDivisions} />
            {clip && <ClipEdit clip={clip} />}
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
