import './Card.scss';

interface Props {
  children?: any;
  sx?: object;
  stretch?: boolean;
  className?: string;
}

export default function Card({ children, sx, stretch = false, className }: Props) {
  return (
    <div className={`card ${stretch ? 'stretch' : ''} ${className}`} style={sx}>{ children }</div>
  );
}