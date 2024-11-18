import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../common/AuthContext"; // Custom Auth context
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, setUser } = useAuth(); // Get user and setUser from context
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Toggle function to open and close the menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Logout handler
  const handleLogout = async () => {
    if (user && user.email) {
      // Make a POST request to the logout endpoint with the user's email
      console.log(user.email);
      setUser(null); // Clear user from context
      console.log("User logged out");
      const res = await axios.post(
        "https://server-eight-tau.vercel.app/api/logout",
        {
          email: user.email, // Send email in the request payload
        }
      );

      console.log(res.data.message);

      navigate("auth/login"); // Use your router to navigate
    } else {
      console.error("No email provided for logout. User is:", user);
    }
  };

  return (
    <nav className="py-7 px-7 mt-5 mx-5 font-geist-sans bg-black text-charcoal flex justify-between items-center rounded-2xl">
      <Link className="flex items-center gap-4" to="/">
        <h2 className="text-xl font-bold text-lightBeige">CMS</h2>
      </Link>

      <div className="hidden md:flex flex-row items-center gap-8">
        <ul className="flex flex-row gap-8">
          <li>
            <Link
              to="/"
              className="px-5 py-3 rounded-3xl bg-mintGreen font-medium text-sm hover:bg-softBlue hover:text-lightBeige text-center"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="dashboard"
              className="px-5 py-3 rounded-3xl bg-mintGreen font-medium text-sm hover:bg-softBlue hover:text-lightBeige text-center"
            >
              Dashboard
            </Link>
          </li>
          {user ? (
            <li>
              <Link
                to="/"
                onClick={handleLogout}
                className="px-5 py-3 rounded-3xl bg-red-500 font-medium text-sm text-lightBeige hover:bg-red-600 text-center"
              >
                Logout
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link
                  to="auth/login"
                  className="px-5 py-3 rounded-3xl bg-mintGreen font-medium text-sm hover:bg-softBlue hover:text-lightBeige text-center"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="auth/register"
                  className="px-5 py-3 rounded-3xl bg-mintGreen font-medium text-sm hover:bg-softBlue hover:text-lightBeige text-center"
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Mobile menu toggle button */}
      <button className="p-2 md:hidden" onClick={toggleMenu}>
        <FontAwesomeIcon
          icon={isMenuOpen ? faXmark : faBars}
          className="text-lightBeige"
        />
      </button>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div className="p-2 px-7 mt-5 mx-5 fixed inset-0 bg-charcoal z-50">
          <div className="flex justify-between items-center mb-6">
            <Link to="/" className="flex items-center gap-4">
              <h2 className="text-lg font-bold text-lightBeige">CMS</h2>
            </Link>
            <button className="p-2 md:hidden" onClick={toggleMenu}>
              <FontAwesomeIcon icon={faXmark} className="text-lightBeige" />
            </button>
          </div>

          <ul className="flex flex-col gap-4">
            <li>
              <Link
                to="/"
                className="font-medium text-lightBeige"
                onClick={toggleMenu} // Close menu on click
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="dashboard"
                className="font-medium text-lightBeige"
                onClick={toggleMenu} // Close menu on click
              >
                Dashboard
              </Link>
            </li>
            {user ? (
              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu(); // Close menu on logout
                  }}
                  className="font-medium text-lightBeige"
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    to="auth/login"
                    className="font-medium text-lightBeige"
                    onClick={toggleMenu} // Close menu on click
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="auth/register"
                    className="font-medium text-lightBeige"
                    onClick={toggleMenu} // Close menu on click
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
