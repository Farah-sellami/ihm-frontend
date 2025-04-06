import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

// design
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";
import { Container, CustomNavLink, CustomNavLinkList, ProfileCard } from "../../router";
import { User1 } from "../hero/Hero";
import { menulists , categorylists} from "../../utils/data";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenuOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 0);
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeMenuOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", closeMenuOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Check if it's the home page
  const isHomePage = location.pathname === "/";

  const role = "buyer";
  return (
    <>
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
                {menulists.map((list) => (
                  <li key={list.id} className="capitalize list-none">
                    <CustomNavLinkList href={list.path} isActive={location.pathname === list.path} className={`${isScrolled || !isHomePage ? "text-black" : "text-white hover:text-[#cedaed]"}`}>
                      {list.link}
                    </CustomNavLinkList>
                  </li>
                ))}

                {/* Dropdown dynamique */}
  {/* <li className="list-none">
    <div className="dropdown dropdown-hover">
      <div
        tabIndex={0}
        role="button"
        className={`btn btn-sm px-4 py-2 rounded-md normal-case bg-transparent border-none ${
          isScrolled || !isHomePage ? "text-black" : "text-white hover:text-[#dde4f0]"
        }`}
      >
        Plus
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow-sm"
      >
        {menulists.map((item) => (
          <li key={item.id}>
            <a href={item.path}>{item.link}</a>
          </li>
        ))}
      </ul>
    </div>
  </li>  */}
              </div>
            </div>
            <div className="flex items-center gap-8 icons">
              <div className="hidden lg:flex lg:items-center lg:gap-8">
                <IoSearchOutline size={23} className={`${isScrolled || !isHomePage ? "text-black" : "text-white hover:text-[#dde4f0]"}`} />
                {/* {role === "buyer" && (
                  <CustomNavLink href="/seller/login" className={`${isScrolled || !isHomePage ? "text-black" : "text-white hover:text-[#dde4f0]"}`}>
                    Become a Seller
                  </CustomNavLink>
                )} */}
                <CustomNavLink href="/login" className={`${isScrolled || !isHomePage ? "text-black" : "text-white hover:text-[#cedaed]"}`}>
                  Sign in
                </CustomNavLink>
                <CustomNavLink href="/register" className={`${!isHomePage || isScrolled ? "bg-[#20354c] text-white" : "bg-white text-[#20354c]"} px-8 py-2 rounded-full shadow-md`}>
                  Join
                </CustomNavLink>
                <CustomNavLink href="/dashboard">
                  <ProfileCard>
                    <img src={User1} alt="" className="w-full h-full object-cover" />
                  </ProfileCard>
                </CustomNavLink>
              </div>
              <div className={`icon flex items-center justify-center gap-6 ${isScrolled || !isHomePage ? "text-primary" : "text-white"}`}>
                <button onClick={toggleMenu} className="lg:hidden w-10 h-10 flex justify-center items-center bg-[#20354c] text-white focus:outline-none">
                  {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
                </button>
              </div>
            </div>

            {/* Responsive Menu if below 768px */}
            <div ref={menuRef} className={`lg:flex lg:items-center lg:w-auto w-full p-5 absolute right-0 top-full menu-container ${isOpen ? "open" : "closed"}`}>
              {menulists.map((list) => (
                <li href={list.path} key={list.id} className="uppercase list-none">
                  <CustomNavLink className="text-[#20354c]">{list.link}</CustomNavLink>
                </li>
              ))}
            </div>
          </nav>
        </Container>
      </header>
    </>
  );
};
