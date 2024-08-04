interface IPaperProps {
  children: React.ReactNode;
}

export default function Paper({ children }: Readonly<IPaperProps>) {
  return <div className="p-6 bg-bg-primary rounded-xl">{children}</div>;
}
