import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { formatNumber } from '@/utils/formatNumber';
// handle number values
const FormatNumber = ({ number }: { number: string | number }) => {
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

  return <div>{renderNumber()}</div>;
};
// Tooltip when hover number values <0,0001
const TooltipNumber = ({ data }: { data: string }) => {
  return (
    <div>
      {Number(data) >= 1000 || Number(data) < 0.001 ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>{formatNumber.formatToUnit(data)}</TooltipTrigger>
            <TooltipContent>
              <FormatNumber number={data} />
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <div className="">{formatNumber.formatToUnit(data)}</div>
      )}
    </div>
  );
};
export { FormatNumber, TooltipNumber };
