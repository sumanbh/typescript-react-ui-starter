export interface ButtonProps {
  text: string;
}

function Button({ text }: ButtonProps) {
  return <button type="button">{text}</button>;
}

export default Button;
