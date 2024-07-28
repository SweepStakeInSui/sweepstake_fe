interface IPaperProps {
  children: React.ReactNode;
}

export default function Paper({ children }: Readonly<IPaperProps>) {
  return <div className="p-5 bg-wht-a100 rounded-xl">{children}</div>;
}
