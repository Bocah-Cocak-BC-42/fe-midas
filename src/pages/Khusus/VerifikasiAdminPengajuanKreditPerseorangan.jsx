import { useEffect, useState } from "react";
import Table from "../../components/Table";
import { Link, useNavigate } from "react-router-dom";

function VerifikasiAdminPengajuanKreditPerseorangan(){
    const [forms, setForms] = useState([]);
    const [form, setForm] = useState();
    const [pagination, setPagination] = useState({});
    const [errorMessage, setErrorMessage] = useState("Gagal Memuat Data Pengajuan Kredit")
    const [id, setId] = useState("");

    const tableDataHeaders = [
        { code: "no", name: "Nomor Pengajuan" },
        { code: "name", name: "Nama Lengkap"},
        { code: "company-name", name: "Nama Usaha"},
        { code: "office-branch", name: "Kantor Cabang"},
        { code: "amount", name: "Nominal"},
        { code: "period", name: "Jangka Waktu"},
    ]

    const getData = (pageNumber) => {
        // getForms(
        //     //function untuk 
        //     (res) => {
        //         setRoles(res.data.map((item) => tableDataHeaders.reduce((acc, header) => { acc[header.code] = item[heaader.code]; return acc;}, {})));
        //         setPagination(res.pagination);
        //     },

        //     //function untuk mengambil error
        //     (errMessage) => {
        //         setErrorMessage(errMessage);
        //         setRoles([]);
        //     },

        //     //object params
        //     { page: pageNumber, pageSize: 5}
        // );
    };

    useEffect(() => {
        getData(1, "");
    }, []);

    const handleDetail = (data) => {
        <Link to={"verifikasi/detail"}>
        </Link>
    }

    const handleVerif = (data) => {
        
    }

    return (
        <>
            <div className="rounded-md border mt-4 shadow">
                <Table
                    tableHeaders={tableDataHeaders}
                    data={forms}
                    messageErrorEmptyData={errorMessage}
                    pagination={pagination}
                    getDataByPagination={(pageNumber) => getData(pageNumber)}
                    actions={[
                        {
                            name: "Detail",
                            variant: "warning",
                            function: handleDetail,
                        },
                        {
                            name: "Verifikasi",
                            variant: "danger",
                            function: handleVerif
                        }
                    ]}
                />
            </div>
        </>
    )
}

export default VerifikasiAdminPengajuanKreditPerseorangan;