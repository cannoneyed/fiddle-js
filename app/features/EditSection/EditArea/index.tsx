import * as React from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';
import { Container } from 'typedi';
import { observer } from 'mobx-react';

import { SequencerPageLayout } from 'core/layouts/sequencer/page';
import { TracksSectionLayout } from 'core/layouts/sequencer/tracks';

@observer
export default class EditArea extends React.Component<{}, {}> {
  tracksSectionLayout = Container.get(TracksSectionLayout);
  sequencerPageLayout = Container.get(SequencerPageLayout);

  render() {
    return <EditAreaContainer id="editArea" />;
  }
}

const EditAreaContainer = styled.div`
  flex-grow: 1;
  background-color: ${theme.colors.black.toRgbString()};
  position: relative;
`;
