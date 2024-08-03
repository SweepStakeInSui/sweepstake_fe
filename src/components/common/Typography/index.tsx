interface ITypographyProps {
  children: React.ReactNode;
  tag?: React.ElementType;
}

export default function Typography({
  children,
  tag: Tag = 'p',
}: Readonly<ITypographyProps>) {
  return <Tag>{children}</Tag>;
}

interface ITextProps extends ITypographyProps {
  size?: 10 | 12 | 13 | 14 | 15 | 16 | 18 | 20 | 24;
  weight?: 'regular' | 'medium' | 'semibold';
  className?: string;
}

function Text({
  weight = 'regular',
  children,
  size = 16,
  className = '',
  tag: Tag = 'p',
}: Readonly<ITextProps>) {
  const textClasses = {
    10: 'text-10',
    12: 'text-12',
    13: 'text-13',
    14: 'text-14',
    15: 'text-15 leading-5',
    16: 'text-16',
    18: 'text-18',
    20: 'text-20',
    24: 'text-24',
  };

  const weightClasses = {
    regular: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
  };

  return (
    <Tag
      className={`${textClasses[size]} ${weightClasses[weight]} ${className} text-text`}
    >
      {children}
    </Tag>
  );
}

interface IHeadingProps extends ITypographyProps {
  size?: 20 | 24 | 28 | 32 | 48 | 64;
  weight?: 'semibold' | 'bold' | 'normal';
  className?: string;
}

function Heading({
  size = 20,
  weight = 'semibold',
  children,
  className = '',
  tag: Tag = 'h3',
}: Readonly<IHeadingProps>) {
  const headingClasses = {
    20: 'text-20',
    24: 'text-24',
    28: 'text-28 leading-8',
    32: 'text-32',
    48: 'text-48',
    64: 'text-64',
  };

  const weightClasses = {
    semibold: 'font-semibold',
    bold: 'font-bold',
    normal: 'font-normal',
  };

  return (
    <Tag
      className={`${headingClasses[size]} ${weightClasses[weight]} ${className} text-text`}
    >
      {children}
    </Tag>
  );
}

Typography.Text = Text;
Typography.Heading = Heading;
