import * as React from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';
import { Container } from 'typedi';
import { observer } from 'mobx-react';
import { injector } from 'utils/injector';

import ClipEdit from '../ClipEdit';

import { ClipEditorState } from 'core/state/app/clip-editor';
import { ClipStore, Clip } from 'core/state/stores/clips';

export interface Props {}
export interface InjectedProps {
  clip: Clip | null;
}

const inject = injector<Props, InjectedProps>(props => {
  const clipEditorState = Container.get(ClipEditorState);
  const clipStore = Container.get(ClipStore);

  const clipId = clipEditorState.selectedClipId;
  const clip = clipStore.getClipById(clipId);

  return {
    clip,
  };
});

@observer
export class EditArea extends React.Component<Props & InjectedProps, {}> {
  render() {
    const { clip } = this.props;
    return (
      <EditAreaContainer id="editArea">
        <EditAreaBody>
          <SnipsArea>{clip && <ClipEdit clip={clip} />}</SnipsArea>
        </EditAreaBody>
      </EditAreaContainer>
    );
  }
}

export default inject(EditArea);

const SnipsArea = styled.div``;

const EditAreaBody = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

const EditAreaContainer = styled.div`
  flex-grow: 1;
  background-color: ${theme.colors.black.toRgbString()};
  position: relative;
`;
