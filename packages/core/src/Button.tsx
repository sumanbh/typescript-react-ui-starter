import * as React from 'react';

export interface ButtonProps {
  text: string;
}

const Button: React.FC<ButtonProps> = ({ text }) => {
  return <button type="button">{text}</button>;
};

export default Button;
