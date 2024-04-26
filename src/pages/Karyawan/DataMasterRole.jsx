import { useEffect, useState } from "react";
import Button from "../../components/Button";
import FormUpsertRole from "../../components/Form/FormUpsertRole";
import Modal from "../../components/Modal";
import Table from "../../components/Table";
import TableActions from "../../components/TableActions";

function DataMasterRole() {
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState();
  const [pagination, setPagination] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [id, setId] = useState(0);

  const getData = (pageNumber) => {
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
    getData(1);
  }, []);

  const handleEdit = (id) => {
    // getBankById((data) => {
    //   setBank(data);
    // }, id);
    setId(id);
    setTitle("Edit Role");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setRole();
  };

  return (
    <>
      <Button
        onClick={() => {
          setShowModal(true);
          setTitle("Tambah Role");
        }}
      >
        Tambah Role
      </Button>
      <div className="rounded-md border mt-4 shadow">
        <Table
          tableHeaders={["Nama Role", "Aksi"]}
          data={roles}
          pagination={pagination}
          getDataByPagination={(pageNumber) => {
            console.log(pageNumber);
          }}
          action={<TableActions>
              <Button variant="warning">Edit</Button>
              <Button variant="info">Detail</Button>
              <Button variant="danger">Delete</Button>
          </TableActions>

          }
        />
      </div>
      <Modal onClose={handleCloseModal} visible={showModal} title={title}>
        <FormUpsertRole
          title={"Tambah Role"}
          data={role}
          id={id}
          onClose={handleCloseModal}
        />
      </Modal>
    </>
  );
}

export default DataMasterRole;
