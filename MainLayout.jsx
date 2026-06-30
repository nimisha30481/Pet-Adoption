import { Navbar } from "../components";

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: "70px" }}>
        {children}
      </div>
    </>
  );
}
