// import Logo from "./../../../public/Logo-Midas.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardCheck,
  faCircleUser,
  faServer,
  faCaretDown,
  faCreditCard,
  faMoneyBillTransfer,
  faUserCheck,
  faMoneyBillWave
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

function SideBarKhusus({ navLinkActive, subNavLinkActive }) {
  const [sidebar, setSidebar] = useState([]);
  const [openNavDataMaster, setOpenNavDataMaster] = useState(
    navLinkActive === "Data Master"
  );
  const [openNavUserManage, setOpenNavUserManage] = useState(
    navLinkActive === "User Management"
  );
  const [openNavPengajuanKredit, setOpenPengajuanKredit] = useState(
    navLinkActive === "Pengajuan Kredit"
  )

  useEffect(() => {
    const user = JSON.parse(Cookies.get("user") ?? null);
    if (user?.role === "Admin") {
      setSidebar([
        {
          name: "Verifikasi Kredit",
          icon: faClipboardCheck,
          key: 0,
        },
        {
          name: "User Management",
          icon: faCircleUser,
          key: 1,
          children: [
            {
              name: "Karyawan",
              location: "/admin/user-management/karyawan",
            },
            {
              name: "Nasabah",
              location: "/admin/user-management/nasabah",
            },
          ],
        },
        {
          name: "Data Master",
          icon: faServer,
          key: 2,
          children: [
            {
              name: "Role",
              location: "/admin/data-master/role",
            },
            {
              name: "Kantor Cabang",
              location: "/admin/data-master/kantor-cabang",
            },
            {
              name: "Sektor Usaha",
              location: "/admin/data-master/sektor-usaha",
            },
            {
              name: "Alamat",
              location: "/admin/data-master/alamat",
            },
            {
              name: "Bank",
              location: "/admin/data-master/bank",
            },
          ],
        },
        {
          name: "Verifikasi Penarikan",
          icon: faUserCheck,
          key: 3,
        }
      ]);
    } 
    else if(user?.role === "Nasabah")
    {
      setSidebar([
        {
          name: "Pengajuan Kredit",
          icon: faCreditCard,
          key: 0,
          children: [
            {
              name: "Perseorangan",
              location: "/nasabah/perseorangan"
            },
            {
              name: "Badan Usaha",
              location: "/nasabah/badan-usaha"
            }
          ]
        },
        {
          name: "Pembayaran Angsuran",
          icon: faMoneyBillTransfer,
          key: 1
        },
        {
          name: "Upgrade Kredit",
          icon: faUserCheck,
          key: 2,
        },
        {
          name: "Penarikan Dana",
          icon: faMoneyBillWave,
          key: 3
        }
      ])
    }
  }, []);

  const mapSideBar = () => {
    let mapedSideBar = [];
    sidebar.map((item) => {
      mapedSideBar.push(
        <div key={item.key}>
          <li
            onClick={() => {
              item.key === 2 && setOpenNavDataMaster(!openNavDataMaster);
              item.key === 1 && setOpenNavUserManage(!openNavUserManage);
              item.key === 0 && setOpenPengajuanKredit(!openNavPengajuanKredit)
            }}
            className={`${
              item.name == navLinkActive && "text-[#C07F00]"
            } w-full p-2 cursor-pointer focus:border-r-8 hover:text-[#C07F00] hover:border-r-8 focus:border-r-[#C07F00] hover:border-r-[#C07F00] hover:bg-slate-200`}
          >
            <FontAwesomeIcon className="px-2 w-4" icon={item.icon} />
            {item.name}
            {item.children && (
              <FontAwesomeIcon className="px-2" icon={faCaretDown} />
            )}
          </li>
          {openNavDataMaster && item.key === 2 && (
            <ul>
              {item.children.map((child) => (
                <a href={child.location} key={child.name}>
                  <li
                    className={`${
                      child.name == subNavLinkActive && "text-[#C07F00]"
                    } pl-10 w-full p-2 cursor-pointer focus:border-r-8 hover:text-[#C07F00] hover:border-r-8 focus:border-r-[#C07F00] hover:border-r-[#C07F00] hover:bg-slate-200`}
                  >
                    {child.name}
                  </li>
                </a>
              ))}
            </ul>
          )}
          {openNavUserManage && item.key === 1 && (
            <ul>
              {item.children.map((child) => (
                <a href={child.location} key={child.name}>
                  <li
                    className={`${
                      child.name == subNavLinkActive && "text-[#C07F00]"
                    } pl-10 w-full p-2 cursor-pointer focus:border-r-8 hover:text-[#C07F00] hover:border-r-8 focus:border-r-[#C07F00] hover:border-r-[#C07F00] hover:bg-slate-200`}
                  >
                    {child.name}
                  </li>
                </a>
              ))}
            </ul>
          )}
          {openNavPengajuanKredit && item.key === 0 && (
            <ul>
              {item.children.map((child) => (
                <a href={child.location} key={child.name}>
                  <li
                    className={`${
                      child.name == subNavLinkActive && "text-[#C07F00]"
                    } pl-10 w-full p-2 cursor-pointer focus:border-r-8 hover:text-[#C07F00] hover:border-r-8 focus:border-r-[#C07F00] hover:border-r-[#C07F00] hover:bg-slate-200`}
                  >
                    {child.name}
                  </li>
                </a>
              ))}
            </ul>
          )}
        </div>
      );
    });
    return mapedSideBar;
  };

  return (
    <div className="flex flex-col shadow-lg h-screen w-1/5 items-center gap-5">
      <div className="w-10/12 pt-5">
        <img srcSet="/Logo-Midas.png"></img>
      </div>
      <div className="sidebar w-full">
        <ul className="list-none">{mapSideBar()}</ul>
      </div>
    </div>
  );
}

export default SideBarKhusus;
