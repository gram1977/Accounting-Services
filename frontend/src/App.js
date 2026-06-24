import "./App.css";
import { HashRouter, NavLink, Outlet, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Services from "./Services";
import About from "./About";
import Contact from "./Contact";
import Payments from "./Payments";
import Reports from "./Reports";
import AdminLogin from "./AdminLogin";

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
          <p>email: kairo365@gmail.com</p>
          <p>For Technical Support:</p>
          <p>☎Amandeep Singh Grewal: Ph:(+91)-9999-080593</p>
          <p>🎪Address: 69- College Road, Opp. Govt. College For Boys, Civil Lines, Ludhiana -141001</p>
        </div>
      </main>
    </div>
  );
}

// Protected Route Component for Reports
function ProtectedReports({ isAdminLoggedIn, onLoginSuccess, onLogout }) {
  if (!isAdminLoggedIn) {
    return <AdminLogin onLoginSuccess={onLoginSuccess} />;
  }
  return (
    <div>
      <button
        onClick={onLogout}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          padding: "8px 16px",
          backgroundColor: "#dc3545",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
      <Reports />
    </div>
  );
}

function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Check if admin is already logged in on component mount
  useEffect(() => {
    const adminLoggedIn = localStorage.getItem("adminLoggedIn");
    if (adminLoggedIn === "true") {
      setIsAdminLoggedIn(true);
    }
  }, []);

  // Handle successful admin login
  const handleLoginSuccess = (adminInfo) => {
    setIsAdminLoggedIn(true);
    // Redirect to Reports page
    window.location.href = "#/reports";
  };

  // Handle admin logout
  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem("adminInfo");
    localStorage.removeItem("adminLoggedIn");
    window.location.href = "#/";
  };

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route
            path="reports"
            element={
              <ProtectedReports
                isAdminLoggedIn={isAdminLoggedIn}
                onLoginSuccess={handleLoginSuccess}
                onLogout={handleLogout}
              />
            }
          />
          <Route path="payments" element={<Payments />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
