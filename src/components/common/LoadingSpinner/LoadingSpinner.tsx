import Svg from '../Svg';

export interface ISVGProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const LoadingSpinner = ({ className }: ISVGProps) => {
  return (
    <Svg src="/icons/loading.svg" className={`animate-spin ${className}`} />
  );
};

export default LoadingSpinner;
