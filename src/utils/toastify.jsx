import { Bounce, toast } from "react-toastify";

const notify = (message, options = {}) => {
  toast(message, {
    position: options.position || "top-center",
    autoClose: options.autoClose || 800,
    hideProgressBar:
      options.hideProgressBar !== undefined ? options.hideProgressBar : true,
    closeOnClick:
      options.closeOnClick !== undefined ? options.closeOnClick : true,
    pauseOnHover:
      options.pauseOnHover !== undefined ? options.pauseOnHover : true,
    draggable: options.draggable !== undefined ? options.draggable : true,
    progress: options.progress !== undefined ? options.progress : undefined,
    theme: options.theme || "colored",
    transition: options.transition || Bounce,
    type: options.type || "default",
  });
};

export { notify };
