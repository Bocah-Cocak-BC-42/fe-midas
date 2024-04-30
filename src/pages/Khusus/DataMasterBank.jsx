import { useEffect, useState } from "react";
import Button from "../../components/Button";
import FormUpsertBank from "../../components/Form/FormUpsertBank";
import Modal from "../../components/Modal";
import Table from "../../components/Table";
import InputSearch from "../../components/Input/InputSearch";
import { getBanks } from "../../services/data-master-bank.service";

function DataMasterBank() {
  const [banks, setBanks] = useState([]);
  const [bank, setBank] = useState();
  const [pagination, setPagination] = useState({});
  const [showModal, setShowModal] = useState(false);
  // const [showModalInfo, setShowModalInfo] = useState(false);
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [showModalAlert, setShowModalAlert] = useState(false);
  const [title, setTitle] = useState("");
  const [bankNameSearch, setBankNameSearch] = useState("");
  const [messageAlert, setMessageAlert] = useState("");
  // const [id, setId] = useState(0);

  const getData = (pageNumber, bankNameSearch) => {
    console.log(pageNumber, bankNameSearch);
    getBanks(
      //function untuk mengambil data
      (res) => {
        console.log(res);
        setBanks(res.data);
        setPagination(res.pagination);
      },
      //object params
      { page: pageNumber, pageSize: 3, bankNameSearch: bankNameSearch }
    );
    // setBanks([
    //   {
    //     id: 1,
    //     name: "Mandiri",
    //   },
    //   {
    //     id: 2,
    //     name: "BCA",
    //   },
    //   {
    //     id: 3,
    //     name: "BRI",
    //   },
    // ]);
    // setPagination({
    //   pageNumber: 1,
    //   pageSize: 10,
    //   totalPages: 3,
    // });
  };

  useEffect(() => {
    getData(1, "");
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    let bankNameSearchVal = e.target.bankNameSearch.value || null;
    setBankNameSearch(bankNameSearchVal);
    getData(1, bankNameSearchVal);
  };

  const handleEdit = (id) => {
    // getBankById((data) => {
    //   setBank(data);
    // }, id);
    console.log(id);
    // setId(id);
    setTitle("Edit Bank");
    setShowModal(true);
  };

  const handleDelete = (id) => {
    // setId(id);
    console.log(id);
    setTitle("Hapus Bank");
    setShowModalConfirm(true);
  };

  const handleConfirm = (confirm) => {
    console.log(confirm);
    setShowModalConfirm(false);
    if (confirm) {
      setTitle("Pemberitahuan");
      setShowModalAlert(true);
    }
  };

  const handleShowAlert = (message) => {
    setMessageAlert(message);
    setShowModal(false);
    setShowModalAlert(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    // setShowModalInfo(false);
    setShowModalConfirm(false);
    setShowModalAlert(false);
    setBank();
  };

  return (
    <>
      <div className="flex justify-between">
        <Button
          onClick={() => {
            setShowModal(true);
            setTitle("Tambah Bank");
          }}
        >
          Tambah Bank
        </Button>
        <form action="" onSubmit={handleSearch} className="flex gap-2">
          <InputSearch placeholder="Cari Bank" name="bankNameSearch" />
          <Button type="submit">Search</Button>
        </form>
      </div>

      <div className="rounded-md border mt-4 shadow">
        <Table
          tableHeaders={["Nama Bank", "Aksi"]}
          data={banks}
          pagination={pagination}
          getDataByPagination={(pageNumber) =>
            getData(pageNumber, bankNameSearch)
          }
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
        <FormUpsertBank data={bank} showAlert={handleShowAlert} />
      </Modal>
      {/* <Modal onClose={handleCloseModal} visible={showModalInfo} title={title}>
        <ul>
          <li>Mandiri</li>
          <li>Sumatera Utara</li>
        </ul>
      </Modal> */}
      <Modal
        onClose={handleCloseModal}
        visible={showModalConfirm}
        title={title}
        confirm={handleConfirm}
      >
        <p>Apakah anda yakin ingin menghapus data ini?</p>
      </Modal>
      <Modal
        onClose={handleCloseModal}
        visible={showModalAlert}
        title="Pemberitahuan"
      >
        {messageAlert}
      </Modal>
    </>
  );
}

export default DataMasterBank;
