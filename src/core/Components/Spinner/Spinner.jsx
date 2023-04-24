import clsx from "clsx";
import React from "react";
import { useSelector } from "react-redux";

/* import packages */
import { MoonLoader } from "react-spinners";

export default function Spinner() {
  let isLoading = useSelector((state) => state.spinnerReducer.isLoading);

  const loadingClass = isLoading
    ? "opacity-100 visible "
    : "opacity-0 invisible";
  return (
    <div
      className={clsx(
        "spinner",
        "fixed left-0 top-0 bg-[#282c34] flex justify-center items-center z-[300]",
        "h-screen w-screen",
        loadingClass,
        "transition-all duration-[1200ms]"
      )}
    >
      <MoonLoader color="#36d7b7" speedMultiplier={0.7} size={80} />
    </div>
  );
}
