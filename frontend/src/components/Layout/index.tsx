import { Footer } from "../Footer";
import { Menu } from "../Menu";

export function Layout(props) {
  return (
    <>
      <Menu />
      <main>{props.children}</main>
      <Footer />
    </>
  );
}
