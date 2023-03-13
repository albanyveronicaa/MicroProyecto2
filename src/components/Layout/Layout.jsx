import { Navbar } from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { UserContextProvider } from "../../contexts/UserContext";

export function Layout() {
  return (
    <main>
      <UserContextProvider>
        <Navbar />
        <section className="body">
          <Outlet />
        </section>
      </UserContextProvider>
    </main>
  );
}
