interface ITypographyProps {
  children: React.ReactElement | string;
}

export default function Typography({ children }: Readonly<ITypographyProps>) {
  return <div>{children}</div>;
}

interface ITextProps extends ITypographyProps {
  size?: 10 | 12 | 13 | 14 | 15 | 16 | 18;
  weight?: 'regular' | 'medium' | 'semibold';
  className?: string;
}

function Text({
  weight = 'regular',
  children,
  size = 16,
  className = '',
}: Readonly<ITextProps>) {
  const textClasses = {
    10: 'text-10',
    12: 'text-12',
    13: 'text-13',
    14: 'text-14',
    15: 'text-15',
    16: 'text-16',
    18: 'text-18',
  };

  const weightClasses = {
    regular: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
  };

  return (
    <p className={`${textClasses[size]} ${weightClasses[weight]} ${className}`}>
      {children}
    </p>
  );
}

interface IHeadingProps extends ITypographyProps {
  size?: 20 | 24 | 28 | 32 | 48 | 64;
  weight?: 'semibold' | 'bold';
  className?: string;
}

function Heading({
  size = 20,
  weight = 'semibold',
  children,
  className = '',
}: Readonly<IHeadingProps>) {
  const headingClasses = {
    20: 'text-20',
    24: 'text-24',
    28: 'text-28',
    32: 'text-32',
    48: 'text-48',
    64: 'text-64',
  };

  const weightClasses = {
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  return (
    <div
      className={`${headingClasses[size]} ${weightClasses[weight]} ${className}`}
    >
      {children}
    </div>
  );
}

Typography.Text = Text;
Typography.Heading = Heading;
