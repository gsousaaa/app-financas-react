import { AuthContextProvider } from "@/contexts/AuthContext";
import { FinancesContext, FinancesContextProvider } from "@/contexts/FinancesContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider >
      <FinancesContextProvider>
        <ToastContainer />
        <Component {...pageProps} />
      </FinancesContextProvider>
    </AuthContextProvider>
  );
}
