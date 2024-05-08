import React, { useEffect, useState } from 'react'
import Island from '../../components/Island'
import Submission from '../../components/Dashboard/Submission';
import Table from '../../components/Table';

function Dashboard() {
  const [creditType, setCreditType] = useState("perseorangan");
  const [dto, setDto] = useState(undefined);
  const [pageNumber, setPageNumber] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    totalPage: 0,
  });
  const [errorMessage, setErrorMessage] = useState("Gagal Memuat Data Role");
  useEffect(() => { getUserData() }, [creditType]);

  const getUserData = () => {
    setDto({
      fullName: "John Doe",
      gender: "L",
      email: "johnd@midas.com",
      creditScore: 100,
      personalCreditLimit: 1_000_000,
      companyCreditLimit: 1_000_000_000
    });
  };

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(number);
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
          <div className="grid grid-cols-[auto_12rem]">
            <div className="flex flex-col gap-2 justify-center items-center">
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
          <div className="flex flex-col gap-4 p-8">
            <span className="text-[#a7a1a1]">Actual Limit</span>
            <select
              className="p-2 w-fit"
              onChange={el => setCreditType(el.currentTarget.value)}
            >
              <option value="perseorangan">Limit Perseorangan</option>
              <option value="perusahaan">Limit Perusahaan</option>
            </select>
            <div className="flex justify-between items-center">
              <span className="text-4xl font-bold text-[#198a1e]">{rupiah(dto.personalCreditLimit)}</span>
              <div className="w-0.5 h-24 bg-gray-200" />
              <div>
                <a
                  className="p-4 text-white bg-[#b0c5a4] rounded-md"
                  href="/"
                >Upgrade Limit</a>
              </div>
            </div>

            <Submission data={null} />
            <Submission data={null} />
          </div>
        </Island>
      </div>

      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-[1fr_12rem] h-fit">
          <Island>
            <div className="flex flex-col gap-4 p-8">
              <span className="text-[#a7a1a1]">Saldo Saat Ini</span>
              <span className="text-4xl font-bold text-[#198a1e] text-center overflow-x-auto">{rupiah(dto.personalCreditLimit)}</span>
            </div>
          </Island>
          <Island>
            <div className="flex flex-col gap-4 p-8">
              <span className="text-[#a7a1a1]">Saldo Saat Ini</span>
              <span className="text-4xl font-bold text-[#198a1e] text-center overflow-x-auto">{dto.creditScore}</span>
            </div>
          </Island>
        </div>
        <Island>
          <div className="flex flex-col gap-4 p-8">
            <span className="text-[#a7a1a1]">Tagihan Pinjaman</span>
            <Table
              tableHeaders={tableDataHeaders}
              data={[
                {
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
