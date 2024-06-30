import { ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
import { FC } from "react";
import ModalProvider from "./modal-provider";
import { SocketProvider } from "./socket-provider";
import QueryProvider from "./query-provider";

interface providersProps {
  children: ReactNode;
}

const Providers: FC<providersProps> = ({ children }) => {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        storageKey="neko-theme"
      >
        <SocketProvider>
          <ModalProvider />
          <QueryProvider>{children}</QueryProvider>
        </SocketProvider>
      </ThemeProvider>
    </>
  );
};

export default Providers;
