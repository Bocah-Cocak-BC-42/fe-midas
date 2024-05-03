import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import Table from "../../components/Table";
import InputSearch from "../../components/Input/InputSearch";
import { getEmployees } from "../../services/user-management.service";
import { useNavigate } from "react-router-dom";


function UserManagementEmployee() {
    const [employees, setEmployees] = useState([]);
    const [employee, setEmployee] = useState();
    const [pagination, setPagination] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const [showModalAlert, setShowModalAlert] = useState(false);
    const [showModalResetPassword, setShowModalResetPassword] = useState(false);
    const [title, setTitle] = useState("");
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
        {page: pageNumber, pageSize: 3, employeeNIPSearch: employeeNIPSearch, employeeNameSearch: employeeNameSearch, employeeJabatanSearch: employeeJabatanSearch}
      );
     
    }
    
    useEffect(()=>{
      getData(1, "", "", "")
    }, []);

    const handleSearch = (e) =>{
      e.preventDefault();
      let employeeNIPSearch = e.target.employeeNIPSearch.value || null;
      let employeeNameSearch = e.target.employeeNameSearch.value || null;
      let employeeJabatanSearch = e.target.employeeJabatanSearch.value || null;

      setEmployeeNIPSearch(employeeNIPSearch);
      setEmployeeNameSearch(employeeNameSearch);
      setEmployeJabatanSearch(employeeJabatanSearch);

      getData(1, employeeNIPSearch, employeeNIPSearch, employeeJabatanSearch);
    }
    const handleResetPassword =(confirm)=>{
      setShowModalResetPassword(false);
      if(confirm){
        setTitle("Reset Password");
        setShowModalResetPassword(true);
      }
    }

    const handleDelete =()=>{
      setShowModalConfirm(true);
      setTitle("Konfirmasi");
    }

    const handleEdit =(id)=>{
      console.log(id);
      navigate(`/user-management/karyawan/Upsert/${id}`)
    }

    const handleConfirm = (confirm) => {
      setShowModalConfirm(true);
      if(confirm){
        setTitle("Pemberitahuan");
        setShowModalAlert(true);
      }
    };

    const handleCloseModal = ()=>{
      setShowModal(false);
      setShowModalAlert(false);
      setShowModalConfirm(false);
    };

  return (
    <>
      <div className="flex justify-between">
          <form action="" onSubmit={handleSearch} method="" className="flex gap-2">
            <InputSearch placeholder="Search for NIP" name="employeeNIPSearch"/>
            <InputSearch placeholder="Search for Nama Lengkap" name="employeeNameSearch"/>
            <InputSearch placeholder="Search for Jabatan" name="employeeJabatanSearch"/>
            <Button type="submit">Search</Button>
          </form>
      </div>
      <div className="mt-5">
          <a href="/user-management/karyawan/Upsert" className="bg-[#B0C5A4] rounded-md p-1 px-2 text-white hover:bg-[#8ea67f] ">Tambah Karyawan</a>
      </div>
      
      <div className="rounded-md border mt-4 shadow">
        <Table
          tableHeaders={tableHeader}
          data={employees}
          pagination={pagination}
          getDataByPagination={(pageNumber)=> {}}
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
        visible={showModalConfirm}
        title={title}
        confirm={handleConfirm}
      >
        <p>Apakah anda yakin ingin Reset Password Data Ini??</p>
      </Modal>
      <Modal
        onClose={handleCloseModal}
        visible={showModalAlert}
        title={title}
      >
        Data User Karyawan Berhasil dihapus
      </Modal>
    

    </>
  );
}

export default UserManagementEmployee
