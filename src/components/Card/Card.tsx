import './Card.scss';

interface Props {
  children?: any;
  sx?: object;
  stretch?: boolean;
  className?: string;
  onClick?: Function;
  onScroll?: Function;
}

export default function Card({
  children,
  sx,
  stretch = false,
  className,
  onClick,
  onScroll,
}: Props) {
  const handleClick = (e: any) => {
    if (onClick) {
      onClick(e);
    }
  };

  const handleScroll = (e: any) => {
    if (onScroll) {
      onScroll(e);
    }
  };

  return (
    <div
      className={`card ${stretch ? 'stretch' : ''} ${
        className ? className : ''
      }`}
      style={sx}
      onClick={(e: any) => handleClick(e)}
      onScroll={(e: any) => handleScroll(e)}
    >
      {children}
    </div>
  );
}
