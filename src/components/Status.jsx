function Status(props) {
  const {
    children
  } = props;

  return (
    <div
    className={
      children === "Rejected"
        ? "bg-[#D37676] rounded-md  text-white"
        : children === "Approved"
        ? "bg-[#B0C5A4] rounded-md p-1 text-white"
        : children === "Pending"
        ? "bg-[#F1EF99] rounded-md p-1 text-white"
        :null
    }>
      {children}
    </div>
  )
}

export default Status
