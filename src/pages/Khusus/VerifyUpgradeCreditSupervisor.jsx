import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputSearch from "../../components/Input/InputSearch";
import Button from "../../components/Button";
import Table from "../../components/Table";



function VerifyUpgradeCreditSupervisor(){
    const [dataCredit, setDataCredit] = useState([]);
    const [pagination, setPagination] = useState({});
    const [errorMessage, setErrorMessage] = useState("Gagal Memuat Data");
    const [fullNameSearch, setFullNameSearch] = useState("");
    const [numberUpdgradeCode, setNumberUpgradeCode ] = useState("");
    const navigate = useNavigate();
    const tableHeader = [
        {name: "Id", code: "id"},
        {name: "Nama Lengkap", code: "fullname"},
        {name: "Code Pengajuan", code: "creditUpgradeNumber"},
        {name: "Tanggal Pengajuan", code: "createdAt"}, 
        {name: "Nama Admin", code: "adminId"},
        {name: "Status", code: "status"}
    ]


    return (
        <>
            <div className="flex jutify-beetwen">
                <form method="Get" className="flex gap-2">
                    <InputSearch placeholder="Search By Full Name" name="fullName"/>
                    <InputSearch placeholder="Search By Code Pengajuan Upgrade"/>
                    <Button type="submit">Search</Button>
                </form>
            </div>
            <div className="rounded-md border mt-4 shadow">
               <Table
                tableHeader={tableHeader}
                data={dataCredit}
                messageErrorEmptyData={errorMessage}
                pagination={pagination}
                getDataByPagination={(pageNumber) => 
                    getData(pageNumber, fullNameSearch, numberUpdgradeCode)
                }
                actions={[
                    {
                        name: "Verifikasi",
                        variant: "warning",
    
                    }
                ]}
               />
            </div>
        </>
    )
}

export default VerifyUpgradeCreditSupervisor