import * as React from 'react';
import { Container } from 'typedi';
import { observer } from 'mobx-react';

import EditArea from 'features/EditSection/EditArea';

import { MainPageLayout } from 'core/state/layouts/main/page';

import { EditSectionWrapper } from './styled-components';

@observer
export default class EditSection extends React.Component<{}, {}> {
  mainPageLayout = Container.get(MainPageLayout);

  render() {
    const { mainPageLayout } = this;

    const editSectionWrapperStyle = {
      height: mainPageLayout.editSectionHeight,
    };

    return (
      <EditSectionWrapper style={editSectionWrapperStyle}>
        <EditArea />
      </EditSectionWrapper>
    );
  }
}
