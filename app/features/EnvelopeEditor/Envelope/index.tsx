import * as React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';

import { Envelope as EnvelopeModel } from 'core/models/envelope';
import { Dimensions } from 'core/interfaces';

interface Props {
  dimensions: Dimensions;
  envelope: EnvelopeModel;
}

@observer
export class Envelope extends React.Component<Props, {}> {
  render() {
    // const { envelope } = this.props;

    return <Svg />;
  }
}

const Svg = styled.svg`
  width: 100%;
  height: 100%;
`;

export default Envelope;
