import Button from "../../components/Button"
import Table from "../../components/Table"
import Modal from "../../components/Modal"
import InputSearch from "../../components/Input/InputSearch"
import { getCustomers, patchResetPassword } from "../../services/user-management.service"
import { useEffect, useState } from "react"

function UserManagementCustomer() {
    const [customers, setCustomers] = useState([])
    const [pagination, setPagination] = useState({})
    const [id, setId] = useState("")
    const [showModalAlertReset, setShowModalAlertReset] = useState(false)
    const [showModalConfirmReset, setShowModalConfirmReset] = useState(false)
    const [title, setTitle] = useState("")
    const [messageAlert, setMessageAlert] = useState("")
    const [nikCustomer, setNikCustomer] = useState("")
    const [fullNameCustomer, setFullNameCustomer] = useState("")
    const [genderCustomer, setGenderCustomer] = useState("")
    const [errorMessage, setErrorMessage] = useState("Gagal Memuat Data Nasabah")

    const tableHeader = [{name: "Id", code: "id"}, { name: "NIK", code: "identityNumber"}, { name: "Nama Lengkap", code: "fullName"}, {name: "Jenis Kelamin", code: "gender"}]

    const getData = (pageNumber, employeeNIPSearch, employeeNameSearch, employeeJabatanSearch)=>{
        getCustomers(
          (data)=>{
            setCustomers(data.data.map((item) => (
              tableHeader.reduce((acc, key) => {
                acc[key.code] = item[key.code]
                return acc
              }, {})
            )));
            setPagination(data.pagination);
          }, 
          (errMessage) => {
            setErrorMessage(errMessage);
            setCustomers([]);
          },
          {page: pageNumber, pageSize: 3, nik: employeeNIPSearch, fullName: employeeNameSearch, gender: employeeJabatanSearch}
        )
       
      };
    
    useEffect(() => {
        getData(1, "", "", "")
    },[]);

    const handleSearch =(e)=>{
        e.preventDefault();
        let nikCustomer = e.target.nik.value || "";
        let fullNameCustomer = e.target.fullName.value || "";
        let genderCustomer = e.target.gender.value || "";

      setNikCustomer(nikCustomer);
      setFullNameCustomer(fullNameCustomer);
      setGenderCustomer(genderCustomer);

      getData(1, nikCustomer, fullNameCustomer, genderCustomer);
    }

    const handleConfirmReset = (data) => {
      setId(data.id);
      setTitle("Reset Password Customer");
      setShowModalConfirmReset(true);
    }

    const handleConfirmResetPassword = (confirm) => {
      setShowModalConfirmReset(false);
      if(confirm){
        patchResetPassword(
         (messageAlert)=>{
           setShowModalAlertReset(true); 
           setMessageAlert(messageAlert)
         }, id);
       }
    }

    const handleCloseModal = ()=>{
        setShowModalAlertReset(false);
        setShowModalConfirmReset(false);
      };

  return (
    <>
      <div className="flex justify-between">
          <form onSubmit={handleSearch} method="Get" className="flex gap-2">
            <InputSearch placeholder="Search by NIK" name="nik"/>
            <InputSearch placeholder="Search by Nama Lengkap" name="fullName"/>
            <InputSearch placeholder="Search by Gender" name="gender"/>
            <Button type="submit">Search</Button>
          </form>
      </div>

      <div className="rounded-md border mt-4 shadow">
        <Table
          tableHeaders={tableHeader}
          data={customers}
          messageErrorEmptyData={errorMessage}
          pagination={pagination}
          getDataByPagination={(pageNumber) =>
            getData(pageNumber, nikCustomer, fullNameCustomer, genderCustomer)
          }
          actions={[
            {
              name: "Reset Password",
              variant: "danger",
              function: handleConfirmReset,
            }
          ]}
        />
      </div>

      <Modal
        onClose={handleCloseModal}
        visible={showModalConfirmReset}
        title={title}
        confirm={handleConfirmResetPassword}
      >
        <p>Apakah anda yakin ingin Reset Password Data Ini??</p>
      </Modal>

      <Modal
        onClose={handleCloseModal}
        visible={showModalAlertReset}
        title={title}
      >
        {messageAlert}
      </Modal>
    </>
  )
}

export default UserManagementCustomer
