import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import ProgressBarProvider from "@/provider/progress-bar.provider";
import "../assets/css/global.css";
import 'react-toastify/dist/ReactToastify.css';
import { ReactQueryProvider } from "@/context/react-query.provider";
import RecoilContextProvider from "@/provider/recoil-provider.context";

export const metadata: Metadata = {
  title: "Plan'IA",
  description: "Plan'IA - The next generation of project planning",
  icons: {
    icon: {
      url: "/logo.svg",
    },
  },
  /* openGraph: {
    title: "Plan'IA",
    description: "Plan'IA - The next generation of project planning",
    url: "https://plania.vercel.app",
    siteName: "Plan'IA",
    images: {
      url: "/logo.svg",
      width: 1920,
      height: 1080,
      alt: "Plan'IA",
      type: "image/svg+xml",
    }
  }, */
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
            </RecoilContextProvider>
          </ReactQueryProvider>
        </ProgressBarProvider>
      </body>
    </html>
  );
}
