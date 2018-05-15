import * as React from 'react';
import { Container } from 'typedi';
import { observer } from 'mobx-react';

import EditArea from 'features/EditSection/EditArea';

import { SequencerPageLayout } from 'core/layouts/sequencer/page';

import { EditSectionWrapper } from './styled-components';

@observer
export default class EditSection extends React.Component<{}, {}> {
  sequencerPageLayout = Container.get(SequencerPageLayout);

  render() {
    const { sequencerPageLayout } = this;

    const editSectionWrapperStyle = {
      height: sequencerPageLayout.editSectionHeight,
    };

    return (
      <EditSectionWrapper style={editSectionWrapperStyle}>
        <EditArea />
      </EditSectionWrapper>
    );
  }
}
