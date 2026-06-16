import "./styles.css";

export const metadata = {
  title: "NPL AI Product Expert",
  description: "Internal AI expert speaker and trainer for financial services AI product programs."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
