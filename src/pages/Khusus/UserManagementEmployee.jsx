import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import Table from "../../components/Table";
import InputSearch from "../../components/Input/InputSearch";
import { DelEmployee, getEmployees } from "../../services/user-management.service";
import { useNavigate } from "react-router-dom";


function UserManagementEmployee() {
    const [employees, setEmployees] = useState([]);
    const [pagination, setPagination] = useState({});
    const [id, setId] = useState("");
    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const [showModalAlert, setShowModalAlert] = useState(false);
    const [showModalAlertReset, setShowModalAlertReset] = useState(false);
    const [showModalResetPassword, setShowModalResetPassword] = useState(false);
    const [title, setTitle] = useState("");
    const [messageAlert, setMessageAlert] = useState("");
    const [errorMessage, setErrorMessage] = useState("Gagal Memuat Data Karyawan");
    const [employeeNIPSearch, setEmployeeNIPSearch] = useState("");
    const [employeeNameSearch, setEmployeeNameSearch] = useState("");
    const [employeeJabatanSearch, setEmployeJabatanSearch] = useState("");
    let navigate = useNavigate(); 

    const tableHeader = [{name: "Id", code: "id"}, { name: "NIP", code: "identityNumber"}, { name: "Nama Lengkap", code: "fullName"}, {name: "Jabatan", code: "role"}]
    const getData = (pageNumber, employeeNIPSearch, employeeNameSearch, employeeJabatanSearch)=>{
      getEmployees(
        (data)=>{
          setEmployees(data.data.map((item) => (
            tableHeader.reduce((acc, key) => {
              acc[key.code] = item[key.code]
              return acc
            }, {})
          )));
          setPagination(data.pagination);
        },
        (errMessage) => {
          setErrorMessage(errMessage);
          setEmployees([]);
        },
        {page: pageNumber, pageSize: 3, nip: employeeNIPSearch, fullName: employeeNameSearch, role: employeeJabatanSearch}
      );
     
    }
    
    useEffect(()=>{
      getData(1, "", "", "")
    }, []);

    const handleSearch = (e) =>{
      e.preventDefault();
      let employeeNIPSearch = e.target.employeeNIPSearch.value || "";
      let employeeNameSearch = e.target.employeeNameSearch.value || "";
      let employeeJabatanSearch = e.target.employeeJabatanSearch.value || "";

      setEmployeeNIPSearch(employeeNIPSearch);
      setEmployeeNameSearch(employeeNameSearch);
      setEmployeJabatanSearch(employeeJabatanSearch);

      getData(1, employeeNIPSearch, employeeNameSearch, employeeJabatanSearch);
    }

    const handleResetPassword =(confirm)=>{
      setShowModalResetPassword(false);
      if(confirm){
        setTitle("Reset Password");
        setShowModalResetPassword(true);
      }
    }

    const handleEdit =(data)=>{
      navigate(`/admin/user-management/karyawan/Upsert/${data.id}`)
    }

    const handleDelete = (data) => {
      setId(data.id);
      setTitle("Hapus Employee");
      setShowModalConfirm(true);
    };

    const handleConfirm = (confirm) => {
      setShowModalConfirm(true);
      setShowModalConfirm(false);
    if (confirm) {
      DelEmployee((message) => {
        setMessageAlert(message);
        setTitle("Pemberitahuan");
        setShowModalAlert(true);
      }, id);
    }
    };

    const handleCloseModal = ()=>{
      setShowModalAlert(false);
      setShowModalConfirm(false);
      setShowModalAlertReset(false);
      setShowModalResetPassword(false);
    };

  return (
    <>
      <div className="flex justify-between">
          <form onSubmit={handleSearch} method="Get" className="flex gap-2">
            <InputSearch placeholder="Search for NIP" name="employeeNIPSearch"/>
            <InputSearch placeholder="Search for Nama Lengkap" name="employeeNameSearch"/>
            <InputSearch placeholder="Search for Jabatan" name="employeeJabatanSearch"/>
            <Button type="submit">Search</Button>
          </form>
      </div>
      <div className="mt-5">
          <a href="/admin/user-management/karyawan/upsert" className="bg-[#B0C5A4] rounded-md p-1 px-2 text-white hover:bg-[#8ea67f] ">Tambah Karyawan</a>
      </div>
      
      <div className="rounded-md border mt-4 shadow">
        <Table
          tableHeaders={tableHeader}
          data={employees}
          messageErrorEmptyData={errorMessage}
          pagination={pagination}
          getDataByPagination={(pageNumber) =>
            getData(pageNumber, employeeNIPSearch, employeeNameSearch, employeeJabatanSearch)
          }
          actions={[
            {
              name: "Edit",
              variant: "warning",
              function: handleEdit
            },
            {
              name: "Delete",
              variant: "danger",
              function: handleDelete
            },
            {
              name: "Reset Password",
              variant: "danger",
              function: handleResetPassword,
            }
          ]}
        />
      </div>

      <Modal
        onClose={handleCloseModal}
        visible={showModalResetPassword}
        title={title}
        confirm={handleConfirm}
      >
        <p>Apakah anda yakin ingin Reset Password Data Ini??</p>
      </Modal>
      <Modal
        onClose={handleCloseModal}
        visible={showModalAlertReset}
        title={title}
      >
        Password Karyawan Berhasil direset
      </Modal>
    
      <Modal
        onClose={handleCloseModal}
        visible={showModalConfirm}
        title={title}
        confirm={handleConfirm}
      >
        <p>Apakah anda yakin ingin menghapus Data Karyawan ini?</p>
      </Modal>
      <Modal
        onClose={() => {
          handleCloseModal();
          location.reload();
        }}
        visible={showModalAlert}
        title="Pemberitahuan"
      >
        {messageAlert}
      </Modal>

    </>
  );
}

export default UserManagementEmployee
