interface IPaperProps {
  children: React.ReactNode;
}

export default function Paper({ children }: Readonly<IPaperProps>) {
  return <div className="p-5 bg-bg-surface rounded-xl">{children}</div>;
}
