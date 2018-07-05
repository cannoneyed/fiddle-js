import * as React from 'react';
import { Container } from 'typedi';
import { observer } from 'mobx-react';

import EditArea from 'features/ClipEditorSection/EditArea';

import { MainPageLayout } from 'core/state/layouts/pages/main';

import { ClipEditorSectionWrapper } from './styled-components';

@observer
export default class ClipEditorSection extends React.Component<{}, {}> {
  mainPageLayout = Container.get(MainPageLayout);

  render() {
    const { mainPageLayout } = this;

    const editSectionWrapperStyle = {
      height: mainPageLayout.editSectionHeight,
    };

    return (
      <ClipEditorSectionWrapper style={editSectionWrapperStyle}>
        <EditArea />
      </ClipEditorSectionWrapper>
    );
  }
}
