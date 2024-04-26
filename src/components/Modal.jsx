function Modal({ children, visible, onClose, title }) {
    if (!visible) return null;
  
    const handleOnClose = (e) => {
      if (e.target.id === "container-modal") onClose();
    };
  
    return (
      <div
        id="container-modal"
        onClick={handleOnClose}
        className="fixed inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center"
      >
        <div className="bg-slate-200 px-4 p-4 mt-4 w-1/2 h-14 rounded-t-lg">
          <h1 className="text-xl font-bold">{title}</h1>
        </div>
        <div className="bg-white px-4 pb-4 w-1/2 h-3/4 rounded-b-lg overflow-auto">
          <div>{children}</div>
        </div>
      </div>
    );
  }
  
  export default Modal;
  