import Header from "./Header";
import Footer from "./Footer";
import { Toaster } from "sonner";

const Layout = ({ children }: any) => {
  return (
    <>
      <Header />
      <main className="w-full">
        {children}
        <Toaster richColors position="top-right" />
      </main>
      <hr className="my-4 w-full border-black dark:border-white" />
      <Footer />
    </>
  );
};

export default Layout;
