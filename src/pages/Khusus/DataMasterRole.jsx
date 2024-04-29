import { useEffect, useState } from "react";
import Button from "../../components/Button";
import FormUpsertRole from "../../components/Form/FormUpsertRole";
import Modal from "../../components/Modal";
import Table from "../../components/Table";
import InputSearch from "../../components/Input/InputSearch";

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
  // const [id, setId] = useState(0);

  const getData = (pageNumber, roleNameSearch) => {
    console.log(pageNumber, roleNameSearch);
    // getBanks((data) => {
    //   setBanks(data.listData);
    //   setPagination(data.pagination);
    // }, pageNumber);
    setRoles([
      {
        id: 1,
        name: "Mantri",
      },
      {
        id: 2,
        name: "Manager",
      },
      {
        id: 3,
        name: "Supervisor",
      },
    ]);
    setPagination({
      pageNumber: 1,
      pageSize: 10,
      totalData: 3,
    });
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
    // getBankById((data) => {
    //   setBank(data);
    // }, id);
    console.log(id);
    // setId(id);
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

  const handleCloseModal = () => {
    setShowModal(false);
    setShowModalInfo(false);
    setShowModalConfirm(false);
    setShowModalAlert(false);
    setRole();
  };

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
      <Button
        variant="info"
        onClick={() => {
          setShowModalInfo(true);
          setTitle("Informasi Role");
        }}
      >
        Show Info
      </Button>
      <Button
        variant="danger"
        onClick={() => {
          setShowModalConfirm(true);
          setTitle("Konfirmasi");
        }}
      >
        Delete
      </Button>

      <div className="rounded-md border mt-4 shadow">
        <Table
          tableHeaders={["Nama Role", "Aksi"]}
          data={roles}
          pagination={pagination}
          getDataByPagination={(pageNumber) => {
            console.log(pageNumber);
          }}
          actions={[
            {
              name: "Detail",
              variant: "info",
              function: handleEdit,
            },
            {
              name: "Edit",
              variant: "warning",
              function: handleEdit,
            },
            {
              name: "Delete",
              variant: "danger",
              function: handleEdit,
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
        <FormUpsertRole data={role} />
      </Modal>
      <Modal 
        onClose={handleCloseModal} 
        visible= {showModalConfirm}
        title={title}
        confirm={handleConfirm}
      >
        <p>Apakah Anda yakin ingin menghapus data ini?</p>
      </Modal>
      <Modal onClose={handleCloseModal} visible={showModalAlert} title={title}>
        Data berhasil dihapus
      </Modal>
    </>
  );
}

export default DataMasterRole;
