import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import Submission from '../../components/Dashboard/Submission';
import Island from '../../components/Island';
import Table from '../../components/Table';
import { getUserDetail } from '../../services/dashboard-nasabah';

function Dashboard() {
  const [user, setUser] = useState("");
  useEffect(() => setUser(JSON.parse(Cookies.get("user"))), []);

  const [creditType, setCreditType] = useState("perseorangan");
  useEffect(() => { }, [creditType]);

  const [dto, setDto] = useState(undefined);
  useEffect(() => { if (user.userId !== undefined) getUserData() }, [user]);
  const getUserData = () => {
    getUserDetail(
      { id: user.userId },
      (dto) => {
        if (dto.status === "OK") setDto(dto.data);
        else if (dto.status === "FAILED") console.log(dto.message);
        else if (dto.status === "NOTFOUND") console.log(dto.message);
      },
      (errMessage) => {
        setErrorMessage(errMessage);
        setDto([]);
      },
    );
  };

  const [pageNumber, setPageNumber] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    totalPage: 0,
  });
  const [errorMessage, setErrorMessage] = useState("Gagal Memuat Data Role");

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(number).replace(",00", "");
  };

  const tableDataHeaders = [
    { code: "creditUpgradeNumber", name: "Code Pembayaran" },
    { code: "dueDate", name: "Tenggat Waktu Pembayaran" },
    { code: "status", name: "Status" },
    { code: "note", name: "Note" },
  ];

  if (!dto) return <span>Wait a sec, mfs...</span>

  return (
    <div className="grid grid-cols-2 gap-8 my-8">
      <div className="flex flex-col gap-8">
        <Island>
          <div className="grid grid-cols-[auto_12rem] gap-4 ml-8 mr-4">
            <div className="flex flex-col gap-2 justify-center">
              <div className="flex flex-col gap-2">
                <span className="text-[#a7a1a1]">Selamat Datang, {dto.gender === "M" ? "Bapak" : dto.gender === "F" ? "Ibu" : "Bapak / Ibu"} {dto.fullName}</span>
                <span className="text-2xl text-[#a7a1a1]">{dto.email}</span>
              </div>
            </div>
            <img
              className=""
              srcSet="\midashboard.png"
              alt="happy-family"
            />
          </div>
        </Island>

        <Island>
          <div className="flex flex-col gap-4 p-4">
            <span className="text-[#a7a1a1]">Limit Kredit</span>
            <select
              className="p-2 w-fit"
              onChange={el => setCreditType(el.currentTarget.value)}
            >
              <option value="perseorangan">Limit Perseorangan</option>
              <option value="perusahaan">Limit Perusahaan</option>
            </select>
            <div className="flex justify-between items-center px-4">
              <span className="text-4xl font-bold text-[#198a1e]">{rupiah(creditType === "perseorangan" ? dto.personalCreditLimit : dto.companyCreditLimit)}</span>
              <div className="w-0.5 h-24 bg-gray-200" />
              <div>
                <a
                  className="p-4 text-white bg-[#b0c5a4] rounded-md"
                  href={`/${user.role.toLowerCase()}/upgradecredit`}
                >Upgrade Limit</a>
              </div>
            </div>

            <div className="flex flex-col gap-8 p-4">
              <Submission data={null} />
              <Submission data={null} />
            </div>
          </div>
        </Island>
      </div>

      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-[1fr_12rem] gap-8 h-fit">
          <Island>
            <div className="flex flex-col p-4">
              <span className="text-[#a7a1a1]">Saldo Saat Ini</span>
              <span className="p-4 text-4xl font-bold text-[#198a1e] text-center overflow-x-auto overflow-y-hidden">{rupiah(creditType === "perseorangan" ? dto.personalCreditLimit : dto.companyCreditLimit)}</span>
            </div>
          </Island>
          <Island>
            <div className="flex flex-col p-4">
              <span className="text-[#a7a1a1]">Skor Kredit</span>
              <span
                className="p-4 text-4xl font-bold text-center overflow-x-auto overflow-y-hidden"
                style={{ color: dto.creditScore >= 100 ? "#198a1e" : dto.creditScore >= 50 ? "#ffd95a" : "red" }}
              >{dto.creditScore}</span>
            </div>
          </Island>
        </div>
        <Island>
          <div className="flex flex-col gap-4 p-4">
            <span className="text-[#a7a1a1]">Tagihan Pinjaman</span>
            <Table
              tableHeaders={tableDataHeaders}
              data={[
                {
                  id: 0,
                  creditUpgradeNumber: "B000001",
                  dueDate: "Besok",
                  status: "Berhasil",
                  note: "Berkas sobek"
                },
              ]}
              messageErrorEmptyData={errorMessage}
              pagination={pagination}
              getDataByPagination={(pageNumber) => setPageNumber(pageNumber)}
            />
          </div>
        </Island>
      </div>
    </div>
  )
}

export default Dashboard
