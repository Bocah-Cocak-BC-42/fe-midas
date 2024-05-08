import Table from "../../components/Table";
import InputSearch from "../../components/Input/InputSearch";
import Button from "../../components/Button";
import { useState, useEffect } from "react";
function VerifyUpgradeCredit() {
    const [dataCredits, setDataCredit] = useState([]);
    const [pagination, setPagination] = useState({});
    const [id, setId] = useState("");
    const [errorMessage, setErrorMessage] = useState("Gagal Memuat Data Kredit");
    const [fullNameSearch, setFullNameSearch] = useState("");
    const [numberUpgradeCodeSearch, setNumberUpgradeCodeSearch] = useState("");

    const tableHeader = [{name: "Id", code: "id"}, { name: "Nama Lengkap", code: "fullName"},{name: "code Pengajuan", code: "numberUpgradeCode"}, { name: "Tanggal Pengajuan", code: "createdAt"}, {name: "Status", code: "status"}]
    const getData = (pageNumber, fullNameSearch, numberUpgradeCodeSearch)=>{
        // getEmployees(
        //   (data)=>{
        //     setDataCredit(data.data.map((item) => (
        //       tableHeader.reduce((acc, key) => {
        //         acc[key.code] = item[key.code]
        //         return acc
        //       }, {})
        //     )));
        //     setPagination(data.pagination);
        //   },
        //   (errMessage) => {
        //     setErrorMessage(errMessage);
        //     setDataCredit([]);
        //   },
        
        //   {page: pageNumber, pageSize: 3, fullName: fullNameSearch, numberUpgradeCode: numberUpgradeCodeSearch}
        // );

        setDataCredit([
            {
                id: 1,
                fullName: "John Doe",
                numberUpgradeCode: 123456789,
                createdAt: "2022-01-01",
                status: "Approved",
              },
              {
                id: 2,
                fullName: "Jane Smith",
                numberUpgradeCode: 987654321,
                createdAt: "2022-01-02",
                status: "Pending",
              },
              {
                id: 3,
                fullName: "Alice Johnson",
                numberUpgradeCode: 456789123,
                createdAt: "2022-01-03",
                status: "Rejected",
              },
              {
                id: 4,
                fullName: "Bob Brown",
                numberUpgradeCode: 789123456,
                createdAt: "2022-01-04",
                status: "Approved",
              },
              {
                id: 5,
                fullName: "Eve Wilson",
                numberUpgradeCode: 321654987,
                createdAt: "2022-01-05",
                status: "Pending",
              }
        ])
        
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
              name: "Edit",
              variant: "warning"
            },
          ]}
        />
      </div>
    </>
  )
}

export default VerifyUpgradeCredit
