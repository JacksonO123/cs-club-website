import './Card.scss';

interface Props {
  children?: any;
  sx?: object;
  stretch?: boolean;
  className?: string;
  onClick?: Function;
}

export default function Card({
  children,
  sx,
  stretch = false,
  className,
  onClick,
}: Props) {
  const handleClick = (e: any) => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <div
      className={`card ${stretch ? 'stretch' : ''} ${
        className ? className : ''
      }`}
      style={sx}
      onClick={(e: any) => handleClick(e)}
    >
      {children}
    </div>
  );
}
