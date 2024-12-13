import { Tooltip } from '@/components/ui/tooltip';
import { formatNumber } from '@/utils/formatNumber';

interface FormatNumberProps {
  number: string | number;
  className?: string;
  tag?: React.ElementType;
}

// handle number values
const FormatNumber = ({
  number,
  tag: Tag = 'div',
  className,
}: FormatNumberProps) => {
  const roundedNumber = Number(number);
  const decimalPlaces = Math.max(
    0,
    -Math.floor(Math.log10(Math.abs(roundedNumber)) - 3),
  );

  // Convert number to exponential notation
  const str = roundedNumber.toExponential();
  const splitStr = str.split('e');
  const firstFourDigits = Math.abs(
    Number(splitStr[0].replace('.', '').slice(0, 4)),
  );
  const exponent = -splitStr[1];

  const renderNumber = () => {
    if (roundedNumber === 0) {
      return <>0</>;
    }

    if (roundedNumber < 1e-5) {
      return (
        <div>
          0.0
          <span className="text-[9px]">{exponent}</span>
          {firstFourDigits}
        </div>
      );
    }

    if (roundedNumber >= 1e-5 && roundedNumber < 1) {
      return <>{parseFloat(roundedNumber.toFixed(decimalPlaces)).toString()}</>;
    }

    return <>{Number(roundedNumber.toFixed(2)).toLocaleString('en-US')}</>;
  };

  return <Tag className={className}>{renderNumber()}</Tag>;
};
// Tooltip when hover number values <0,0001
const TooltipNumber = ({ data }: { data: string }) => {
  return (
    <div>
      {Number(data) >= 1000 || Number(data) < 0.001 ? (
        <Tooltip content={<FormatNumber number={data} />}>
          <p>{formatNumber.formatToUnit(data)}</p>
        </Tooltip>
      ) : (
        <div className="">{formatNumber.formatToUnit(data)}</div>
      )}
    </div>
  );
};
export { FormatNumber, TooltipNumber };
