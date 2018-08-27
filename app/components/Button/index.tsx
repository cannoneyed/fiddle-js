import * as React from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';

import Icon from 'components/Icon';

interface Props {
  children?: React.ReactNode;
  icon?: string;
  onClick?: () => void;
}

export default class Button extends React.Component<Props, {}> {
  renderIcon() {
    const { icon } = this.props;
    const iconStyle = {
      marginRight: 5,
    };
    return <Icon type={icon!} size={18} style={iconStyle} />;
  }
  render() {
    const { children, icon, onClick } = this.props;

    return (
      <ButtonWrapper onClick={onClick}>
        {icon && this.renderIcon()}
        {children}
      </ButtonWrapper>
    );
  }
}

const ButtonWrapper = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  font-family: Menlo;
  font-size: 12px;
  color: ${theme.colors.white.toRgbString()};
  padding: 5px 10px;
  border: 1px solid ${theme.colors.lightGray.toRgbString()};
  background-color: ${theme.colors.darkGray.toRgbString()};
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.mediumGray.toRgbString()};
  }

  &:active {
    background-color: ${theme.colors.darkGray.toRgbString()};
  }
`;
