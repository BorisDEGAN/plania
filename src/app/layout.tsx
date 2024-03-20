import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import ProgressBarProvider from "@/provider/progress-bar.provider";
import "../assets/css/global.css";
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: "Plania",
  description: "Plania - The next generation of project planning",
  icons: {
    icon: {
      url: "/logo.svg",
    },
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body suppressHydrationWarning={true} className='min-h-screen min-w-full font-montserrat dark:bg-black'>
        <ProgressBarProvider>
          {children}
          <ToastContainer />
        </ProgressBarProvider>
      </body>
    </html>
  );
}
