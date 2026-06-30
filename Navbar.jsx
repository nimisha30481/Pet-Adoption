import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const userToken = localStorage.getItem("userToken");
  const staffToken = localStorage.getItem("staffToken");

  const logout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("staffToken");
    navigate("/");
  };

  return (
    <nav style={styles.nav}>
      <h2>PetCare</h2>

      <div style={styles.links}>
        {/* ❌ NOT LOGGED IN */}
        {!userToken && !staffToken && (
          <>
            <Link to="/user/login">User Login</Link>
            <Link to="/login">Staff Login</Link>
          </>
        )}

        {/* 👤 USER LOGGED IN */}
        {userToken && (
          <>
            <Link to="/user/pets">Available Pets</Link>
            <button onClick={logout}>Logout</button>
          </>
        )}

        {/* 👨‍💼 STAFF LOGGED IN */}
        {staffToken && (
          <>
            <Link to="/pets">Staff Pets</Link>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    position: "fixed",
    top: 0,
    width: "100%",
    height: "64px",
    background: "rgba(0,0,0,0.6)",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 24px",
    zIndex: 1000,
  },
  links: {
    display: "flex",
    gap: "16px",
    alignItems: "center",
  },
};
