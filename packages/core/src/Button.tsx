export interface ButtonProps {
  text: string;
}

const Button = ({ text }: ButtonProps) => {
  return <button type="button">{text}</button>;
};

export default Button;
