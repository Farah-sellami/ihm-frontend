import {  CustomNavLink, } from "../common/Design";

import { MdOutlineCategory } from "react-icons/md";

import { FaPlusCircle } from "react-icons/fa";
import { useLocation } from "react-router-dom";

export const FilterSide = () => {
  const location = useLocation();

//   const className = "flex items-center gap-3 mb-2 p-4 rounded-full";
  const className ="flex items-center gap-3 mb-2 p-4 rounded-full border border-[#20354c] text-[#20354c] hover:bg-[#FBF1E5] transition-colors duration-200";

  return (
    <>
    <section className="sidebar">
      <div className="logo-container">
        <h1>🛒</h1>
      </div>
      {/* <Category handleChange={handleChange} /> */}
      {/* <Price handleChange={handleChange} /> */}
      {/* <Colors handleChange={handleChange} /> */}
    </section>
  </>
  );
};
