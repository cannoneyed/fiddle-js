import * as React from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';
import { observer } from 'mobx-react';

import { Clip } from 'core/models/clip';
import SelectSnapToGrid from 'features/ClipEditorSection/components/SelectSnapToGrid';

export interface Props {
  clip: Clip;
}

@observer
export default class Toolbar extends React.Component<Props, {}> {
  render() {
    const { clip } = this.props;
    return (
      <ToolbarContainer>
        <SelectSnapToGrid clip={clip} />
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
