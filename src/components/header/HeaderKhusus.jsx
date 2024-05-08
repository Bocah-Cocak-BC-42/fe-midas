import Cookies from "js-cookie";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

function HeaderKhusus({ breadcrumbs }) {

  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('user');
    navigate('/');
  }

  const user = JSON.parse(Cookies.get("user") ?? null);
  return (
    <nav className="flex w-full h-20 bg-[#FFF7D4] shadow-lg items-center justify-between px-12">
      <div className="font-bold text-lg">{breadcrumbs}</div>
      <div>{user.nickname}</div>
      <div>
        <Button onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </nav>
  );
}

export default HeaderKhusus;
