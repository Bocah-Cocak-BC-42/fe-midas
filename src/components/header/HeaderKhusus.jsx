import Cookies from "js-cookie";

function HeaderKhusus({ breadcrumbs }) {
  const user = JSON.parse(Cookies.get("user") ?? null);
  return (
    <nav className="flex w-full h-20 bg-[#FFF7D4] shadow-lg items-center justify-between px-12">
      <div className="font-bold text-lg">{breadcrumbs}</div>
      <div>{user.nickname}</div>
    </nav>
  );
}

export default HeaderKhusus;
