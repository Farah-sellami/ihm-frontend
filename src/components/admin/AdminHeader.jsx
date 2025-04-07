import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import authService from "../../api/authService";

// design
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Container, CustomNavLink, CustomNavLinkList, ProfileCard } from "../../router";
import { User1 } from "../hero/Hero";
import { menulistsAdmin } from "../../utils/data";

export const AdminHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const location = useLocation();
  const menuRef = useRef(null);
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 0);
  };

  const closeOutsideClick = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    window.location.href = "/"; // ou utiliser un navigate si tu es dans un composant Router
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeOutsideClick);
    window.addEventListener("scroll", handleScroll);

    setIsAuthenticated(authService.isAuthenticated());
    setCurrentUser(authService.getAuthenticatedUser());

    return () => {
      document.removeEventListener("mousedown", closeOutsideClick);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isHomePage = location.pathname === "/";

  return (
    <header className={isHomePage ? `header py-1 bg-primary ${isScrolled ? "scrolled" : ""}` : `header bg-white shadow-s1 ${isScrolled ? "scrolled" : ""}`}>
      <Container>
        <nav className="p-4 flex justify-between items-center relative">
          <div className="flex items-center gap-14">
            <div>
              {isHomePage && !isScrolled ? (
                <img src="../images/common/header-logo.png" alt="LogoImg" className="h-11" />
              ) : (
                <img src="../images/common/header-logo2.png" alt="LogoImg" className="h-11" />
              )}
            </div>
            <div className="hidden lg:flex items-center justify-between gap-8">
              {menulistsAdmin.map((list) => (
                <li key={list.id} className="capitalize list-none">
                  <CustomNavLinkList
                    href={list.path}
                    isActive={location.pathname === list.path}
                    className={`${isScrolled || !isHomePage ? "text-black" : "text-white hover:text-[#cedaed]"}`}
                  >
                    {list.link}
                  </CustomNavLinkList>
                </li>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-8 icons">
            <div className="hidden lg:flex lg:items-center lg:gap-8">
            {isAuthenticated && (
  <div className="flex items-center gap-3">
    <span className="text-black font-medium">
      {currentUser.prenom} {currentUser.nom}
    </span>

    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setShowDropdown((prev) => !prev)}>
        <ProfileCard>
          <img
            src={currentUser?.photoProfil || User1}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </ProfileCard>
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-[#20354c]"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  </div>
)}

            </div>
            <div className={`icon flex items-center justify-center gap-6 ${isScrolled || !isHomePage ? "text-primary" : "text-white"}`}>
              <button onClick={toggleMenu} className="lg:hidden w-10 h-10 flex justify-center items-center bg-[#20354c] text-white focus:outline-none">
                {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
              </button>
            </div>
          </div>
          {/* Responsive Menu if below 768px */}
          <div
            ref={menuRef}
            className={`lg:flex lg:items-center lg:w-auto w-full p-5 absolute right-0 top-full menu-container ${isOpen ? "open" : "closed"}`}
          >
            {menulistsAdmin.map((list) => (
              <li key={list.id} className="uppercase list-none">
                <CustomNavLink href={list.path} className="text-[#20354c]">
                  {list.link}
                </CustomNavLink>
              </li>
            ))}
          </div>
        </nav>
      </Container>
    </header>
  );
};
