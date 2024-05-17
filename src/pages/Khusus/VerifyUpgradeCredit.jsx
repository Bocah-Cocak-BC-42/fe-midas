import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import InputSearch from "../../components/Input/InputSearch";
import Status from "../../components/Status";
import Table from "../../components/Table";
import { GetUpgrades } from "../../services/upgrade-credit";

function VerifyUpgradeCredit() {
    const [dataCredits, setDataCredit] = useState([]);
    const [pagination, setPagination] = useState({});
    const [errorMessage, setErrorMessage] = useState("Gagal Memuat Data Kredit");
    const [fullNameSearch, setFullNameSearch] = useState("");
    const [numberUpgradeCodeSearch, setNumberUpgradeCodeSearch] = useState("");
    const navigate = useNavigate();
    const tableHeader = [{name: "Id", code: "id"}, { name: "Nama Lengkap", code: "fullName"},{name: "Code Pengajuan", code: "creditUpgradeNumber"}, { name: "Tanggal Pengajuan", code: "createdAt"}, {name: "Status", code: "status"}]
    const getData = (pageNumber, fullNameSearch, numberUpgradeCodeSearch)=>{
        GetUpgrades(
          (data)=>{
            setDataCredit(data.data.creditUpgrades.map((item) => (
              tableHeader.reduce((acc, key) => {
                if(key.code === "status") acc[key.code] = <Status children={item[key.code]} />
                else if(key.code === "createdAt") acc[key.code] =  new Date(item[key.code]).toLocaleDateString()
                else acc[key.code] = item[key.code]
                return acc
              }, {})
            )));
            setPagination(data.pagination);
          },
          (errMessage) => {
            setErrorMessage(errMessage);
            setDataCredit([]);
          },
        
          {page: pageNumber, size: 3, userId: fullNameSearch, creditUpgradeNumber: numberUpgradeCodeSearch}
        );
    }
    useEffect(()=>{
      getData(1, "", "")
    }, [])

    const handleSearch = (e) =>{
        e.preventDefault();
        let fullNameSearch = e.target.fullName.value || "";
        let numberUpgradeCode = e.target.numberUpgradeCode.value || "";
  
        setFullNameSearch(fullNameSearch);
        setNumberUpgradeCodeSearch(numberUpgradeCode);
  
        getData(1, fullNameSearch, numberUpgradeCode);
    }

    const handleLook = (data) =>{
      navigate(`/admin/verifikasi-penarikan/verifikasi/${data.id}`)
    }

  return (
    <>
      <div className="flex justify-between">
          <form onSubmit={handleSearch} method="Get" className="flex gap-2">
            <InputSearch placeholder="Search By Nama Lengkap" name="fullName"/>
            <InputSearch placeholder="Search By Code Pengajuan Upgrade" name="numberUpgradeCode"/>
            <Button type="submit">Search</Button>
          </form>
      </div>
      <div className="rounded-md border mt-4 shadow">
        <Table
          tableHeaders={tableHeader}
          data={dataCredits}
          messageErrorEmptyData={errorMessage}
          pagination={pagination}
          getDataByPagination={(pageNumber) =>
            getData(pageNumber, fullNameSearch, numberUpgradeCodeSearch)
          }
          actions={[
            {
              name: "Verifikasi",
              variant: "warning",
              function: handleLook, 
            },
          ]}
        />
      </div>
    </>
  )
}

export default VerifyUpgradeCredit
