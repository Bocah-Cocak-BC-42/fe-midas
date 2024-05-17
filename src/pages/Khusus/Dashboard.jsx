import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import Submission from '../../components/Dashboard/Submission';
import Island from '../../components/Island';
import Table from '../../components/Table';
import { getSubmissions, getUserDetail } from '../../services/dashboard-nasabah';

function Dashboard() {
  const [user, setUser] = useState("");
  useEffect(() => setUser(JSON.parse(Cookies.get("user"))), []);

  const [creditType, setCreditType] = useState("perseorangan");
  const [dtoUser, setDtoUser] = useState(undefined);
  useEffect(() => {
    if (user.userId !== undefined) {
      getUserData();
      getSubmissionsData();
    }
  }, [user]);
  const getUserData = () => {
    getUserDetail(
      { id: user.userId },
      (dtoUser) => {
        if (dtoUser.status === "OK") setDtoUser(dtoUser.data);
        else if (dtoUser.status === "FAILED") console.log(dtoUser.message);
        else if (dtoUser.status === "NOTFOUND") console.log(dtoUser.message);
      },
      (errMessage) => {
        setErrorMessage(errMessage);
        setDtoUser([]);
      },
    );
  };

  const [dtoSubmissions, setDtoSubmissions] = useState(undefined);
  const getSubmissionsData = () => {
    getSubmissions(
      {},
      (dtoSubmissions) => {
        if (dtoSubmissions.status === "OK") setDtoSubmissions(dtoSubmissions.data.creditUpgrades);
        else if (dtoSubmissions.status === "FAILED") console.log(dtoSubmissions.message);
        else if (dtoSubmissions.status === "NOTFOUND") console.log(dtoSubmissions.message);
      },
      (errMessage) => {
        setErrorMessage(errMessage);
        setDtoSubmissions([]);
      },
    );
  }

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

  if (!dtoUser) return <span>Memuat dashboard...</span>

  let upgradeCreditButtonElement = <button className="flex flex-col gap-8 p-4 bg-gray-200 rounded-md" disabled>Upgrade Credit</button>
  if (dtoSubmissions) {
    if (
      dtoSubmissions.length <= 0
      || dtoSubmissions.length > 0 && dtoSubmissions[0].status === "Approved"
    ) upgradeCreditButtonElement = <a className="p-4 text-white bg-[#b0c5a4] rounded-md" href={`/nasabah/upgradecredit`}>Upgrade Limit</a>;
  }

  let submissionsElements = <span className="text-center">Memuat data...</span>;
  if (dtoSubmissions) {
    if (dtoSubmissions.length <= 0) submissionsElements = <span className="text-center">Tidak ada data</span>;
    else {
      submissionsElements = dtoSubmissions.map((submission, index) => (
        <Submission
          data={submission}
          index={index}
          key={index}
        />
      ));
    }
  }

  return (
    <div className="grid grid-cols-2 gap-8 my-8">
      <div className="flex flex-col gap-8">
        <Island>
          <div className="grid grid-cols-[auto_12rem] gap-4 ml-8 mr-4">
            <div className="flex flex-col gap-2 justify-center">
              <div className="flex flex-col gap-2">
                <span className="text-[#a7a1a1]">Selamat Datang, {dtoUser.gender === "M" ? "Bapak" : dtoUser.gender === "F" ? "Ibu" : "Bapak / Ibu"} {dtoUser.fullName}</span>
                <span className="text-2xl text-[#a7a1a1]">{dtoUser.email}</span>
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
              <span className="text-4xl font-bold text-[#198a1e]">{rupiah(creditType === "perseorangan" ? dtoUser.personalCreditLimit : dtoUser.companyCreditLimit)}</span>
              <div className="w-0.5 h-24 bg-gray-200" />
              <div>{upgradeCreditButtonElement}</div>
            </div>

            <div className="flex flex-col gap-8 p-4">{submissionsElements}</div>
          </div>
        </Island>
      </div>

      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-[1fr_12rem] gap-8 h-fit">
          <Island>
            <div className="flex flex-col p-4">
              <span className="text-[#a7a1a1]">Saldo Saat Ini</span>
              <span className="p-4 text-4xl font-bold text-[#198a1e] text-center overflow-x-auto overflow-y-hidden">{rupiah(creditType === "perseorangan" ? dtoUser.personalCreditLimit : dtoUser.companyCreditLimit)}</span>
            </div>
          </Island>
          <Island>
            <div className="flex flex-col p-4">
              <span className="text-[#a7a1a1]">Skor Kredit</span>
              <span
                className="p-4 text-4xl font-bold text-center overflow-x-auto overflow-y-hidden"
                style={{ color: dtoUser.creditScore >= 100 ? "#198a1e" : dtoUser.creditScore >= 50 ? "#ffd95a" : "red" }}
              >{dtoUser.creditScore}</span>
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
