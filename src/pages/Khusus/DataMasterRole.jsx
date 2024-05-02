import { useEffect, useState } from "react";
import Button from "../../components/Button";
import FormUpsertRole from "../../components/Form/FormUpsertRole";
import Modal from "../../components/Modal";
import Table from "../../components/Table";
import InputSearch from "../../components/Input/InputSearch";
import { getRoles, getRoleById } from "../../services/data-master-role.service";

function DataMasterRole() {
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState();
  const [pagination, setPagination] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showModalInfo, setShowModalInfo] = useState(false);
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [showModalAlert, setShowModalAlert] = useState(false);
  const [title, setTitle] = useState("");
  const [roleNameSearch, setRoleNameSearch] = useState("");
  const [messageAlert, setMessageAlert] = useState("");
  // const [id, setId] = useState(0);

  const getData = (pageNumber, roleNameSearch) => {
    console.log(pageNumber, roleNameSearch);
    getRoles(
      (res) => {
        console.log(res);
        setRoles(res.data);
        setPagination(res.pagination);
      }, 
      {page: pageNumber, pageSize: 3, roleName: roleNameSearch}
    );
    // setRoles([
    //   {
    //     id: 1,
    //     name: "Mantri",
    //   },
    //   {
    //     id: 2,
    //     name: "Manager",
    //   },
    //   {
    //     id: 3,
    //     name: "Supervisor",
    //   },
    // ]);
    // setPagination({
    //   pageNumber: 1,
    //   pageSize: 10,
    //   totalData: 3,
    // });
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
      (res) => {
          setRole(res.data);
      }, id);
    console.log(id);
    setId(id);
    setTitle("Edit Role");
    setShowModal(true);
  };

  const handleConfirm = (confirm) => {
    console.log(confirm);
    setShowModalConfirm(false);
    if (confirm) {
      setTitle("Pemberitahuan");
      setShowModalAlert(true);
    }
  };

  const handleInfo = (id) => {
    console.log(id);
    setShowModalInfo(true);
    setTitle("Informasi Role");
  }

  const handleDelete = (id) => {
    console.log(id);
    setTitle("Hapus Bank");
    setShowModalConfirm(true);
  }

  const handleCloseModal = () => {
    setShowModal(false);
    setShowModalInfo(false);
    setShowModalConfirm(false);
    setShowModalAlert(false);
    setRole();
  };

  const handleShowAlert = () => {
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
          tableHeaders={["Nama Role", "Aksi"]}
          data={roles}
          pagination={pagination}
          getDataByPagination={(pageNumber) =>
            getData(pageNumber, roleNameSearch)
          }
          actions={[
            {
              name: "Detail",
              variant: "info",
              function: handleInfo,
            },
            {
              name: "Edit",
              variant: "warning",
              function: (id) => handleEdit(id),
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
        form="form-upsert-bank"
      >
        <FormUpsertRole data={role} showAlert={handleShowAlert} />
      </Modal>
      <Modal 
        onClose={handleCloseModal} 
        visible={showModalInfo} 
        title={title}>
        <ul>
          <li>Mandiri</li>
          <li>Sumatera Utara</li>
        </ul>
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
