import * as React from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';
import { observer } from 'mobx-react';

import { Envelope } from 'core/models/envelope';

interface Props {
  envelope: Envelope;
  height: number;
}

@observer
export class EnvelopeEditor extends React.Component<Props, {}> {
  render() {
    const { envelope } = this.props;

    const editorWrapperStyle = {
      height: this.props.height,
    };

    return <EnvelopeEditorWrapper style={editorWrapperStyle}>{envelope.id}</EnvelopeEditorWrapper>;
  }
}

export default EnvelopeEditor;

const EnvelopeEditorWrapper = styled.div`
  position: relative;
  background-color: ${theme.colors.black.toRgbString()};
`;
