import "./App.css";
import { HashRouter, NavLink, Outlet, Route, Routes } from "react-router-dom";
import Services from "./Services";
import About from "./About";
import Contact from "./Contact";
import Payments from "./Payments";
import Reports from "./Reports";

function Home() {
  return (
    <header className="AppHeader">
      <h1>Kairo Accounting</h1>
      <p>
        The firm specializes in US accounting and bookkeeping services using
        QuickBooks.
      </p>
    </header>
  );
}

function AppLayout() {
  return (
    <div className="AppLayout">
      <aside className="Sidebar">
        <nav className="SidebarNav" aria-label="Primary">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/reports">Reports</NavLink>
          <NavLink to="/payments">Payments</NavLink>
        </nav>
      </aside>

      <main className="AppMain">
        <Outlet />
        <div className="ContactFooter">
          <p>☎Simarjeet: Ph:(+91)-99884-80092</p>
          <p>🎪Address: 2336, Sector-35C, Chandigarh, India</p>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="reports" element={<Reports />} />
          <Route path="payments" element={<Payments />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
