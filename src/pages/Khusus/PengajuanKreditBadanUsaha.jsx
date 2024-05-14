import { useEffect, useState } from "react";
import Table from "../../components/Table";
import Button from "../../components/Button";
import { Link } from "react-router-dom";

function PengajuanKreditBadanUsaha() {
  const [creditRequests, setCreditRequests] = useState([]);
  const [pagination, setPagination] = useState({});
  const [errorMessage, setErrorMessage] = useState("Gagal Memuat Data");

  const tableDataHeaders = [
    { code: "id", name: "ID" },
    { code: "noPengajuanKredit", name: "No Pengajuan Kredit" },
    { code: "kantorCabangPengajuan", name: "Kantor Cabang Pengajuan" },
    { code: "nominalPengajuan", name: "Nominal Pengajuan" },
    { code: "jangkaWaktuPengajuan", name: "Jangka Waktu Pengajuan" },
    { code: "status", name: "Status" },
  ];

  const dataDummy = [
    {
      id: 1,
      noPengajuanKredit: "123456788",
      kantorCabangPengajuan: "Lombok Timur",
      nominalPengajuan: 100000000,
      jangkaWaktuPengajuan: 12,
      status: "Menunggu Konfirmasi",
    },
    {
      id: 2,
      noPengajuanKredit: "123456789",
      kantorCabangPengajuan: "Lombok Barat",
      nominalPengajuan: 200000000,
      jangkaWaktuPengajuan: 11,
      status: "Diterima",
    },
  ];

  const getData = (pageNumber) => {
    setCreditRequests(
      dataDummy.map((item) =>
        tableDataHeaders.reduce((acc, header) => {
          acc[header.code] = item[header.code];
          return acc;
        }, {})
      )
    );
    setPagination({
      pageSize: 5,
      page: pageNumber,
      totalPage: 7,
    });

    // getCreditRequests(
    //   (res) => {
    //     setCreditRequests(
    //       res.data.map((item) =>
    //         tableDataHeaders.reduce((acc, header) => {
    //           acc[header.code] = item[header.code];
    //           return acc;
    //         }, {})
    //       )
    //     );
    //     setPagination(res.pagination);
    //   },
    //   (errMessage) => {
    //     setErrorMessage(errMessage);
    //     setCreditRequests([]);
    //   },
    //   { page: pageNumber, pageSize: 5 }
    // );
  };

  useEffect(() => {
    getData(1);
  }, []);

  const handleRequest = (data) => {
    console.log(data);
  };

  const handleEdit = (data) => {
    console.log(data);
  };

  const handleDelete = (id) => {
    console.log(id);
  };

  return (
    <>
      <Link to="/pengajuan-kredit-badan-usaha/draft">
        <Button>Tambah Draft</Button>
      </Link>
      <div className="rounded-md border mt-4 shadow">
        <Table
          tableHeaders={tableDataHeaders}
          data={creditRequests}
          messageErrorEmptyData={errorMessage}
          pagination={pagination}
          getDataByPagination={getData}
          actions={[
            {
              name: "Request",
              variant: "success",
              function: handleRequest,
            },
            {
              name: "Edit",
              variant: "warning",
              function: handleEdit,
            },
            {
              name: "Delete",
              variant: "danger",
              function: (id) => handleDelete(id),
            },
          ]}
        />
      </div>
    </>
  );
}

export default PengajuanKreditBadanUsaha;
