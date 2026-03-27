type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return <section className="min-h-screen">{children}</section>;
}
