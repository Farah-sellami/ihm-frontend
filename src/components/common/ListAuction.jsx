import React from 'react'
import { ProductList } from '../hero/ProductList'
import { Hero } from '../hero/Hero';
import { FilterSide } from './FilterSide';
import { Container , Title } from "../../router";

export const ListAuction = () => {
  return (
    <>
      {/* <Hero /> */}
      <br /><br /><br />
           <div className="bg-[#20354c] pt-8 h-[40vh] relative content">
                <Container>
                  <div>
                    <Title level={3} className="text-white">
                      Auctions
                    </Title>
                    <div className="flex items-center gap-3">
                      <Title level={5} className="text-white font-normal text-xl">
                        Home
                      </Title>
                      <Title level={5} className="text-white font-normal text-xl">
                        /
                      </Title>
                      <Title level={5} className="text-white font-normal text-xl">
                      Auctions
                      </Title>
                    </div>
                  </div>
                </Container>
              </div>

      <div className="flex gap-6 px-4 lg:px-20 py-10">
        {/* Sidebar */}
        <div className="w-full md:w-1/3 lg:w-1/4">
          <FilterSide />
        </div>

        {/* Product list */}
        <div className="w-full md:w-2/3 lg:w-3/4">
          <ProductList />
        </div>
      </div>
    </>
  );
};