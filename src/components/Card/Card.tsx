import './Card.scss';

interface Props {
  children?: any;
  sx?: object;
  stretch?: boolean;
}

export default function Card({ children, sx, stretch = false }: Props) {
  return (
    <div className={`card ${stretch ? 'stretch' : ''}`} style={sx}>{ children }</div>
  );
}