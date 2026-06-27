// src/components/Categories.jsx

import {
  Laptop,
  Shirt,
  Watch,
  Smartphone,
  Headphones,
  Sofa,
  ArrowRight,
} from "lucide-react";
import "animate.css";

const categories = [
  {
    id: 1,
    name: "Electronics",
    products: "120+ Products",
    icon: Laptop,
  },
  {
    id: 2,
    name: "Fashion",
    products: "250+ Products",
    icon: Shirt,
  },
  {
    id: 3,
    name: "Accessories",
    products: "80+ Products",
    icon: Watch,
  },
  {
    id: 4,
    name: "Mobiles",
    products: "95+ Products",
    icon: Smartphone,
  },
  {
    id: 5,
    name: "Audio",
    products: "60+ Products",
    icon: Headphones,
  },
  {
    id: 6,
    name: "Furniture",
    products: "150+ Products",
    icon: Sofa,
  },
];

const Categories = () => {
  return (
    <section className="animate__animated animate__fadeIn py-8">
      {/* Section Header */}
      <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
            Shop By Categories
          </h2>

          <p className="mt-2 text-slate-500">
            Explore our premium collection across categories
          </p>
        </div>

        <button className="flex items-center gap-2 font-semibold text-violet-600 transition hover:text-violet-700">
          View All
          <ArrowRight size={18} />
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => {
          const Icon = category.icon;

          return (
            <div
              key={category.id}
              className="group cursor-pointer rounded-3xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white">
                  <Icon size={30} />
                </div>

                <ArrowRight
                  size={20}
                  className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-violet-600"
                />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                {category.name}
              </h3>

              <p className="mt-2 text-slate-500">
                {category.products}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Categories;