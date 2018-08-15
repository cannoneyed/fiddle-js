import * as React from 'react';
import { observer } from 'mobx-react';
import { injector } from 'utils/injector';

import VerticalScroll from 'components/Scrollbars/Vertical';

import { get, TracksLayout } from 'features/SequencerSection/core';

interface Props {}
interface InjectedProps {
  setTracksScroll: (y: number) => void;
  tracksScrollPercentY: number;
  tracksViewPercentY: number;
}

const inject = injector<Props, InjectedProps>(props => {
  const tracksLayout = get(TracksLayout);

  return {
    setTracksScroll: (y: number) => tracksLayout.setTracksScroll({ y }),
    tracksScrollPercentY: tracksLayout.scrollPercentY,
    tracksViewPercentY: tracksLayout.tracksViewPercentY,
  };
});

@observer
export class VerticalScrollArea extends React.Component<Props & InjectedProps, {}> {
  handleThumbDrag = (deltaPercentX: number, deltaPercentY: number) => {
    const { setTracksScroll, tracksScrollPercentY } = this.props;

    const nextScrollPercentY = tracksScrollPercentY + deltaPercentY;
    setTracksScroll(nextScrollPercentY);
  };

  render() {
    const { tracksScrollPercentY, tracksViewPercentY } = this.props;

    return (
      <VerticalScroll
        scrollPositionPercent={tracksScrollPercentY}
        scrollViewPercent={tracksViewPercentY}
        onDrag={this.handleThumbDrag}
      />
    );
  }
}

export default inject(VerticalScrollArea);
