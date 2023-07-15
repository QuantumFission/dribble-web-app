import "./globals.css";
import { Toaster } from "react-hot-toast";


export const metadata = {
  title:
    "dribbble - Discover the World's Top Designers & Creative Professionals",
  description:
    "Find Top Designers & Creative Professionals on Dribbble. We are where designers gain inspiration, feedback, community, and jobs. Your best resource to discover and connect with designers worldwide.",
};

type Props = {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {

  return (
    <html lang='en'>
      <body>
        <Toaster />
        <main>{children}</main>
      </body>
    </html>
  );
}