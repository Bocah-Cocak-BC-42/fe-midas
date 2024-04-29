import Button from "./Button";

function Modal({ children, visible, onClose, title, form, confirm }) {
  if (!visible) return null;

  // const handleOnClose = (e) => {
  //   if (e.target.id === "container-modal") onClose();
  // };

  return (
    <div
      id="container-modal"
      // onClick={handleOnClose}
      className="fixed inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center"
    >
      <div className="min-w-96">
        <div className="bg-white px-4 p-4 mt-4 w-auto h-14 rounded-t-lg">
          <h1 className="text-xl font-bold">{title}</h1>
        </div>
        <div className="bg-white p-4 max-h-96 overflow-auto">
          <div>{children}</div>
        </div>
        <div className="bg-white p-4 rounded-b-lg flex justify-end gap-2">
          <Button variant="danger" onClick={onClose}>
            Tutup
          </Button>
          {form && children && (
            <Button type="submit" form={form}>
              Ya
            </Button>
          )}
          {confirm && children && (
            <Button onClick={() => confirm(true)}>Ya</Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
