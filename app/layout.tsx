import "./globals.css";
import Topbar from "@/components/Topbar";

export const metadata = {
  title: "Movie Ticket App",
  description: "DotKonnekt Movie Ticket App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-screen">
        <Topbar />
        <div style={{ height: "90%" }}>{children}</div>
      </body>
    </html>
  );
}
