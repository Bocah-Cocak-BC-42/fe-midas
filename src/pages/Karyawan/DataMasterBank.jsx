import { useEffect, useState } from "react";
import Button from "../../components/Button";
import FormUpsertBank from "../../components/Form/FormUpsertBank";
import Modal from "../../components/Modal";
import Table from "../../components/Table";
import TableActions from "../../components/TableActions";

function DataMasterBank() {
  const [banks, setBanks] = useState([]);
  const [bank, setBank] = useState();
  const [pagination, setPagination] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [id, setId] = useState(0);

  const getData = (pageNumber) => {
    // getBanks((data) => {
    //   setBanks(data.listData);
    //   setPagination(data.pagination);
    // }, pageNumber);
    setBanks([
      {
        id: 1,
        name: "Mandiri",
      },
      {
        id: 2,
        name: "BCA",
      },
      {
        id: 3,
        name: "BRI",
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
    setTitle("Edit Bank");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setBank();
  };

  return (
    <>
      <Button
        onClick={() => {
          setShowModal(true);
          setTitle("Tambah Bank");
        }}
      >
        Tambah Bank
      </Button>
      <div className="rounded-md border mt-4 shadow">
        <Table
          tableHeaders={["Nama Bank", "Aksi"]}
          data={banks}
          pagination={pagination}
          getDataByPagination={(pageNumber) => {
            console.log(pageNumber);
          }}
          action={<TableActions>
            <Button variant="warning">Edit</Button>
            <Button variant="info">Edit</Button>
            <Button variant="danger">Edit</Button>
          </TableActions>}
        />
      </div>
      <Modal onClose={handleCloseModal} visible={showModal} title={title}>
        <FormUpsertBank
          title={"Tambah Bank"}
          data={bank}
          id={id}
          onClose={handleCloseModal}
        />
      </Modal>
    </>
  );
}

export default DataMasterBank;
