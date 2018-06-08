import * as React from 'react';
import { Container } from 'typedi';
import { observer } from 'mobx-react';

import EditArea from 'features/ClipSection/EditArea';

import { MainPageLayout } from 'core/state/layouts/main/page';

import { ClipSectionWrapper } from './styled-components';

@observer
export default class ClipSection extends React.Component<{}, {}> {
  mainPageLayout = Container.get(MainPageLayout);

  render() {
    const { mainPageLayout } = this;

    const editSectionWrapperStyle = {
      height: mainPageLayout.editSectionHeight,
    };

    return (
      <ClipSectionWrapper style={editSectionWrapperStyle}>
        <EditArea />
      </ClipSectionWrapper>
    );
  }
}
