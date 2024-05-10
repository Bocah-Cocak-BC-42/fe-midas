function Status(props) {
  const {
    children
  } = props;

  return (
    <div
    className={
      children === "Rejected"
        ? "bg-[#D37676] rounded-md text-red-700 max-w-fit px-2"
        : children === "Approved"
        ? "bg-[#B0C5A4] rounded-md p-1 text-green-700 max-w-fit px-2"
        : children === "Pending"
        ? "bg-[#F1EF99] rounded-md p-1 text-yellow-700 max-w-fit px-2"
        :null
    }>
      {children}
    </div>
  )
}

export default Status
