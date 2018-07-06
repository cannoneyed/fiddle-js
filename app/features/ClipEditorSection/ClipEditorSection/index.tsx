import * as React from 'react';
import { observer } from 'mobx-react';

import EditArea from 'features/ClipEditorSection/EditArea';

import { ClipEditorSectionWrapper } from './styled-components';

interface Props {}

@observer
export default class ClipEditorSection extends React.Component<Props, {}> {
  render() {
    const editSectionWrapperStyle = {
      height: 300,
    };

    return (
      <ClipEditorSectionWrapper style={editSectionWrapperStyle}>
        <EditArea />
      </ClipEditorSectionWrapper>
    );
  }
}
