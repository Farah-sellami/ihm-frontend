import { CategorySlider, Hero, Process } from "../../router";
import { ProductList } from "../../components/hero/ProductList";

export const Home = () => {
  return (
    <>
      <Hero />
      <CategorySlider />
      <Process />
      <ProductList />
      {/* <TopSeller /> */}
     
      {/* <Trust /> */}
      {/* <TopCollection /> */}
    </>
  );
};
