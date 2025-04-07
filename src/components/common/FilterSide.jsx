
import { useLocation } from "react-router-dom";
import { useState } from 'react';
import {
  Dialog,
  Disclosure,

} from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid';

const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
];

const filters = [
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'white', label: 'White', checked: false },
      { value: 'beige', label: 'Beige', checked: false },
      { value: 'blue', label: 'Blue', checked: true },
      { value: 'brown', label: 'Brown', checked: false },
      { value: 'green', label: 'Green', checked: false },
      { value: 'purple', label: 'Purple', checked: false },
      { value: 'black', label: 'Black', checked: false },
      { value: 'red', label: 'Red', checked: false },
    ],
  },
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'new-arrivals', label: 'New Arrivals', checked: false },
      { value: 'sale', label: 'Sale', checked: false },
      { value: 'travel', label: 'Travel', checked: true },
      { value: 'organization', label: 'Organization', checked: false },
      { value: 'accessories', label: 'Accessories', checked: false },
    ],
  },
  {
    id: 'size',
    name: 'Size',
    options: [
      { value: 'xs', label: 'XS', checked: false },
      { value: 's', label: 'S', checked: false },
      { value: 'm', label: 'M', checked: false },
      { value: 'l', label: 'L', checked: false },
      { value: 'xl', label: 'XL', checked: false },
      { value: 'xxl', label: 'XXL', checked: false },
    ],
  },
  {
    id: 'price',
    name: 'Price Range',
    options: [
      { value: 'under-25', label: 'Under $25', checked: false },
      { value: '25-50', label: '$25 to $50', checked: false },
      { value: '50-100', label: '$50 to $100', checked: false },
      { value: 'over-100', label: 'Over $100', checked: false },
    ],
  },
  {
    id: 'brand',
    name: 'Brand',
    options: [
      { value: 'nike', label: 'Nike', checked: false },
      { value: 'adidas', label: 'Adidas', checked: false },
      { value: 'puma', label: 'Puma', checked: false },
      { value: 'reebok', label: 'Reebok', checked: false },
      { value: 'under-armour', label: 'Under Armour', checked: false },
    ],
  },
  {
    id: 'rating',
    name: 'Rating',
    options: [
      { value: '4-up', label: '4 Stars & Up', checked: false },
      { value: '3-up', label: '3 Stars & Up', checked: false },
      { value: '2-up', label: '2 Stars & Up', checked: false },
      { value: '1-up', label: '1 Star & Up', checked: false },
    ],
  }
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const FilterSide = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Dialog 
          as="div"
          className="relative z-40 lg:hidden"
          open={mobileFiltersOpen} 
          onClose={setMobileFiltersOpen}
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />

          <div className="fixed inset-0 z-40 flex">
            <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
              {/* Filter content for mobile */}
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md p-2 text-gray-400"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4">
                {filters.map((section) => (
                  <Disclosure key={section.id} className="border-t border-gray-200 px-4 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between px-2 py-3">
                            <span className="font-medium text-gray-900">{section.name}</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon className="h-5 w-5" />
                              ) : (
                                <PlusIcon className="h-5 w-5" />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-6">
                            {section.options.map((option, optionIdx) => (
                              <div key={option.value} className="flex items-center">
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>
            </Dialog.Panel>
          </div>
        </Dialog>

        {/* Desktop filters */}
        <section className="sidebar p-6 w-full md:w-64 border-r border-gray-200 bg-white">
          <div className="hidden lg:block">
            {filters.map((section) => (
              <Disclosure key={section.id} className="border-b border-gray-200 py-6">
                {({ open }) => (
                  <>
                    <h3 className="-my-3 flow-root">
                      <Disclosure.Button className="flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">{section.name}</span>
                        <span className="ml-6 flex items-center">
                          {open ? (
                            <MinusIcon className="h-5 w-5" />
                          ) : (
                            <PlusIcon className="h-5 w-5" />
                          )}
                        </span>
                      </Disclosure.Button>
                    </h3>
                    <Disclosure.Panel className="pt-6">
                      <div className="space-y-4">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              id={`filter-${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              defaultValue={option.value}
                              type="checkbox"
                              defaultChecked={option.checked}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor={`filter-${section.id}-${optionIdx}`}
                              className="ml-3 text-sm text-gray-600"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};