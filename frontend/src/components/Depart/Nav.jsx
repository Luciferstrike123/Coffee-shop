import React, { useEffect, useState } from "react";
import Logout from "../../screen/Logout";
import { NavLink } from "react-router-dom";
import iconCart from "../../assets/iconCart.png";
import { useSelector, useDispatch } from "react-redux";
import { toggleStatusTab } from "../../stores/cart";

export default function Nav() {
  const [totalQuantity, setTotalQuantity] = useState(0);
  const carts = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    let total = 0;
    carts.forEach((item) => (total += item.quantity));
    setTotalQuantity(total);
  }, [carts]);

  const handleOpenTabCart = () => {
    dispatch(toggleStatusTab());
  };
  return (
    <>
      <nav className=" border-gray-200 bg-gray-900 ">
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto p-4">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="font-througt self-center text-4xl text-red-500 font-semibold whitespace-nowrap dark:text-white">
              {localStorage.getItem("name")
                ? localStorage.getItem("name").toUpperCase()
                : "NULL"}
            </span>
          </a>

          <div className=" flex gap-10 items-center md:order-2 space-x-1 md:space-x-2 rtl:space-x-reverse">
            <div
              className=" cursor-pointer w-10 h-10 bg-gray-100 rounded-full flex justify-center items-center relative"
              onClick={handleOpenTabCart}
            >
              <img src={iconCart} alt="" className="w-6" />
              <span className="absolute top-2/3 right-1/2 bg-red-500 text-white text-sm w-5 h-5 rounded-full flex justify-center items-center">
                {totalQuantity}
              </span>
            </div>
            <div>
              <Logout />
            </div>
          </div>

          <div
            className="items-center justify-between  w-full md:flex md:w-auto md:order-1"
            id="navbar-cta"
          >
            <ul className="flex flex-col text-2xl font-robot p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <NavLink
                  to="gift"
                  className={({ isActive }) =>
                    isActive ? "text-red-800 underline" : "text-blue-500"
                  }
                >
                  GIFT
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="add-product"
                  className={({ isActive }) =>
                    isActive ? "text-red-800 underline" : "text-blue-500"
                  }
                >
                  ADD PRODUCT
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="employee"
                  className={({ isActive }) =>
                    isActive ? "text-red-800 underline" : "text-blue-500"
                  }
                >
                  EMPLOYEE
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="register"
                  className={({ isActive }) =>
                    isActive ? "text-red-800 underline" : "text-blue-500"
                  }
                >
                  REGISTER
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
