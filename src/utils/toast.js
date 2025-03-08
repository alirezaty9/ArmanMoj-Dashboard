"use client";

import { toast } from "react-toastify";

export const showToast = {
  success: (message) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      className: "font-vazir text-sm",
      bodyClassName: "font-vazir",
      theme: "colored",
      rtl: true,
    });
  },
  error: (message) => {
    toast.error(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      className: "font-vazir text-sm",
      bodyClassName: "font-vazir",
      rtl: true,
    });
  },
  warning: (message) => {
    toast.warning(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      className: "font-vazir text-sm",
      bodyClassName: "font-vazir",
      rtl: true,
    });
  },
  info: (message) => {
    toast.info(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      className: "font-vazir text-sm",
      bodyClassName: "font-vazir",
      rtl: true,
    });
  },
};
