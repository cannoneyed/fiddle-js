import * as React from 'react';
import { Container } from 'typedi';
import { observer } from 'mobx-react';
import { injector } from 'utils/injector';

import VerticalScroll from 'components/Scrollbars/Vertical';

import { TracksLayout } from 'core/state/layouts/sequencer/tracks';

interface Props {}
interface InjectedProps {
  setTracksScroll: (y: number) => void;
  tracksScrollPercentY: number;
  tracksViewPercentY: number;
}

const inject = injector<Props, InjectedProps>(props => {
  const tracksLayout = Container.get(TracksLayout);

  return {
    setTracksScroll: (y: number) => tracksLayout.setTracksScroll({ y }),
    tracksScrollPercentY: tracksLayout.tracksScrollPercentY,
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
