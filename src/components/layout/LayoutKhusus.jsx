import SideBarKhusus from "../sidebar/SideBarKhusus";
import HeaderKhusus from "../header/HeaderKhusus";

function LayoutKhusus({
  children,
  breadcrumbs,
  navLinkActive,
  subNavLinkActive,
}) {
  return (
    <div className="flex">
      <SideBarKhusus
        navLinkActive={navLinkActive}
        subNavLinkActive={subNavLinkActive}
      />
      <div className="w-screen">
        <HeaderKhusus breadcrumbs={breadcrumbs} />
        <div className="p-4 px-12">{children}</div>
      </div>
    </div>
  );
}

export default LayoutKhusus;
