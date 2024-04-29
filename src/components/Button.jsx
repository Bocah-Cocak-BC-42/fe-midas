import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

function Button(props) {
  const {
    children,
    type = "button",
    variant = "success",
    icon,
    onClick,
    form,
  } = props;

  return (
    <button
      type={type}
      onClick={onClick}
      form={form}
      className={
        variant === "danger"
          ? "bg-[#D37676] rounded-md p-1 px-2 text-white hover:bg-red-400"
          : variant === "success"
          ? "bg-[#B0C5A4] rounded-md p-1 px-2 text-white hover:bg-[#8ea67f] "
          : variant === "warning"
          ? "bg-[#F1EF99] rounded-md p-1 px-2 text-black hover:bg-yellow-200"
          : variant === "info"
          ? "bg-[#51829B] rounded-md p-1 px-2 text-white hover:bg-[#41728a]"
          : null
      }
    >
      {icon === "arrow-left" && (
        <>
          <FontAwesomeIcon icon={faArrowLeft} /> |
        </>
      )}
      {icon === "check" && (
        <>
          <FontAwesomeIcon icon={faCheck} /> |
        </>
      )}
      {icon === "x-mark" && (
        <>
          <FontAwesomeIcon icon={faXmark} /> |
        </>
      )}
      {" " + children + " "}
      {icon === "arrow-right" && (
        <>
          | <FontAwesomeIcon icon={faArrowRight} />
        </>
      )}
    </button>
  );
}

export default Button;
