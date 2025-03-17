import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }: any) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <hr className="my-4 w-full border-black dark:border-white" />
      <Footer />
    </>
  );
};

export default Layout;
