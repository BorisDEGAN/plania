import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import ProgressBarProvider from "@/provider/progress-bar.provider";
import "../assets/css/global.css";
import 'react-toastify/dist/ReactToastify.css';
import { ReactQueryProvider } from "@/context/react-query.provider";
import RecoilContextProvider from "@/provider/recoil-provider.context";
import { Modal } from "@/components/Modal";

export const metadata: Metadata = {
  title: "Plan'IA",
  description: "Plan'IA - The next generation of project planning",
  icons: {
    icon: {
      url: "/logo.svg",
    },
  },
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
            <RecoilContextProvider>
              {children}
              <ToastContainer />
              <Modal />
            </RecoilContextProvider>
          </ReactQueryProvider>
        </ProgressBarProvider>
      </body>
    </html>
  );
}
