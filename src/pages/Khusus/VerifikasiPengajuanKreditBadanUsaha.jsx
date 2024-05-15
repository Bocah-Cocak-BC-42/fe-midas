import { useEffect, useState } from "react";
import Table from "../../components/Table";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
function VerifikasiPengajuanKreditBadanUsaha() {
    const [creditRequests, setCreditRequests] = useState([]);
    const [pagination, setPagination] = useState({});
    const [errorMessage, setErrorMessage] = useState("Gagal Memuat Data");

    const tableDataHeaders = [
        { code: "id", name: "ID" },
        { code: "noPengajuanKredit", name: "No Pengajuan Kredit" },
        { code: "namaBadanUsaha", name: "Nama Badan Usaha" },
        { code: "jenisBadanUsaha", name: "Jenis Badan Usaha" },
        { code: "kantorCabangPengajuan", name: "Kantor Cabang Pengajuan" },
        { code: "nominalPengajuan", name: "Nominal Pengajuan" },
        { code: "jangkaWaktuPengajuan", name: "Jangka Waktu Pengajuan" },
        { code: "status", name: "Status" },
    ];

    const dataDummy = [
        {
        id: 1,
        noPengajuanKredit: "123456788",
        namaBadanUsaha: "PT. ABC",
        jenisBadanUsaha: "Konveksi",
        kantorCabangPengajuan: "Lombok Timur",
        nominalPengajuan: 100000000,
        jangkaWaktuPengajuan: 12,
        status: "Menunggu Konfirmasi",
        },
        {
        id: 2,
        noPengajuanKredit: "123456789",
        namaBadanUsaha: "PT. DEF",
        jenisBadanUsaha: "Perdagangan",
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

    const handleVerifikasi = (data) => {
        console.log(data);
    };

    const handleDetail = (data) => {
        console.log(data);
    };

  return (
    <>
      <Link to="/supervisor/verifikasi-pengajuan-kredit-badan-usaha/detail">
        <Button>Detail Pengajuan Kredit</Button>
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
              name: "Verifikasi",
              variant: "success",
              function: handleVerifikasi,
            },
            {
              name: "Detail",
              variant: "warning",
              function: handleDetail,
            },
          ]}
        />
      </div>
    </>
  )
}

export default VerifikasiPengajuanKreditBadanUsaha