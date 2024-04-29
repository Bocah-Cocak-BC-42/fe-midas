import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function InputSearch(props) {
  const { placeholder, name } = props;
  return (
    <div className="relative">
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className="absolute top-2 left-2"
      />
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        className="border border-slate-300 p-1 rounded-md pl-10"
      />
    </div>
  );
}

export default InputSearch;
