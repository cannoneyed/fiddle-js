import * as React from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';
import { observer } from 'mobx-react';

import ClipEdit from '../ClipEdit';

import { Clip } from 'core/models/clip';

import { injectCore } from 'features/ClipEditorSection/core';

export interface Props {}
export interface InjectedProps {
  clip: Clip;
}

const inject = injectCore<Props, InjectedProps>((_, core) => {
  return {
    clip: core.clip,
  };
});

@observer
export class EditArea extends React.Component<Props & InjectedProps, {}> {
  render() {
    const { clip } = this.props;
    return (
      <EditAreaContainer id="editArea">
        <EditAreaBody>
          <SnipsArea>
            <ClipEdit clip={clip} />
          </SnipsArea>
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
