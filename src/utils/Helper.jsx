import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function successToast(message){
    toast.success(message, {
      position: "top-right",
      autoClose: 1000,
      closeOnClick: true,
      pauseOnHover: false,
      progress: undefined
    });
}

export function errorToast(message) {
  toast.error(message, {
    position: "top-right",
    autoClose: 1000,
    closeOnClick: true,
    pauseOnHover: false,
    progress: undefined
  });
}

export function warnToast(message) {
  toast.warn(message, {
    position: "top-right",
    autoClose: 1000,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined
  });
}


export function infoToast(message) {
  toast.info(message, {
    position: "top-right",
    autoClose: 3000,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined
  });
}