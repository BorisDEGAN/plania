import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import ProgressBarProvider from "@/provider/progress-bar.provider";
import "../assets/css/global.css";
import 'react-toastify/dist/ReactToastify.css';
import { ReactQueryProvider } from "@/context/react-query.provider";

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
      <body suppressHydrationWarning={true} className='min-h-screen min-w-full font-montserrat'>
        <ProgressBarProvider>
          <ReactQueryProvider>
            {children}
            <ToastContainer />
          </ReactQueryProvider>
        </ProgressBarProvider>
      </body>
    </html>
  );
}
