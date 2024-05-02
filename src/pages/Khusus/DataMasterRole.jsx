import { useEffect, useState } from "react";
import Button from "../../components/Button";
import FormUpsertRole from "../../components/Form/FormUpsertRole";
import Modal from "../../components/Modal";
import Table from "../../components/Table";
import InputSearch from "../../components/Input/InputSearch";
import { getRoles, getRoleById, delRole } from "../../services/data-master-role.service";

function DataMasterRole() {
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState();
  const [pagination, setPagination] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [showModalAlert, setShowModalAlert] = useState(false);
  const [title, setTitle] = useState("");
  const [roleNameSearch, setRoleNameSearch] = useState("");
  const [messageAlert, setMessageAlert] = useState("");
  const [errorMessage, setErrorMessage] = useState("Gagal Memuat Data Role");
  const [id, setId] = useState("");

  const tableDataHeaders = [
    { code: "id",  name:"ID"},
    { code: "name", name:"Nama Role"}
  ];

  const getData = (pageNumber, roleNameSearch) => {
    getRoles(
      //function untuk mengambil data
      (res) => {
        setRoles(
          res.data.map((item) =>
            tableDataHeaders.reduce((acc, header) => {
              acc[header.code] = item[header.code];
              return acc;
            }, {})
          )
        );
        setPagination(res.pagination);
      }, 
      //function untuk mengambil error
      (errMessage) => {
        setErrorMessage(errMessage);
        setRoles([]);
      },
      //object params
      {page: pageNumber, pageSize: 5, roleName: roleNameSearch}
    );
  };

  useEffect(() => {
    getData(1, "");
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    let roleNameSearchVal = e.target.roleNameSearch.value || null;
    setRoleNameSearch(roleNameSearchVal);
    getData(1, roleNameSearchVal);
  };

  const handleEdit = (id) => {
    getRoleById(
      (data) => {
          setRole(data);
          setTitle("Ubah Data Role");
          setShowModal(true)
      }, id);
  };

  const handleConfirm = (confirm) => {
    console.log(confirm);
    setShowModalConfirm(false);
    if (confirm) {
      delRole((message) => {
        setMessageAlert(message);
        setTitle("Pemberitahuan");
        setShowModalAlert(true);
      }, id);
    }
  };

  const handleDelete = (id) => {
    setId(id);
    setTitle("Hapus Role");
    setShowModalConfirm(true);
  }

  const handleCloseModal = () => {
    setShowModal(false);
    setShowModalConfirm(false);
    setShowModalAlert(false);
    setRole();
  };

  const handleShowAlert = (message) => {
    setMessageAlert(message);
    setShowModal(false);
    setShowModalAlert(true);
  }

  return (
    <>
      <div className="flex justify-between">
        <Button
          onClick={() => {
            setShowModal(true);
            setTitle("Tambah Role");
          }}
        >
          Tambah Role
        </Button>
        <form action="" onSubmit={handleSearch} className="flex gap-2">
          <InputSearch placeholder="Cari Role" name="roleNameSearch" />
          <Button type="submit">Search</Button>
        </form>
      </div>
      <div className="rounded-md border mt-4 shadow">
        <Table
          tableHeaders={tableDataHeaders}
          data={roles}
          messageErrorEmptyData={errorMessage}
          pagination={pagination}
          getDataByPagination={(pageNumber) =>
            getData(pageNumber, roleNameSearch)
          }
          actions={[
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
      <Modal 
        onClose={handleCloseModal} 
        visible={showModal} 
        title={title}
        form="form-upsert-role"
      >
        <FormUpsertRole data={role} showAlert={handleShowAlert} />
      </Modal>
      <Modal 
        onClose={handleCloseModal} 
        visible= {showModalConfirm}
        title={title}
        confirm={handleConfirm}
      >
        <p>Apakah Anda yakin ingin menghapus data ini?</p>
      </Modal>
      <Modal 
        onClose={()=>{
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

export default DataMasterRole;
