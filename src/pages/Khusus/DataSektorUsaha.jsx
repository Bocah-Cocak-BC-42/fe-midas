import { useEffect, useState } from "react"
import Button from "../../components/Button"
import Table from "../../components/Table"
import InputSearch from "../../components/Input/InputSearch";
import { getSektorUsaha, getSektorById, deleteSektor } from "../../services/data-master-sektor-usaha.js";
import Modal from "../../components/Modal.jsx";
import FormUpsertSektorUsaha from "../../components/Form/FormUpsertSektorUsaha.jsx";

const tableDataHeaders = [
  { code: "id", name: "ID" },
  { code: "name", name: "Nama Sektor Usaha"}
]

function DataSektorUsaha() {

  const [sektors, setSektors] = useState([]);
  const [sektor, setSektor] = useState();
  const [pagination, setPagination] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [sektorUsahaSearch, setSektorUsahaSearch] = useState("");
  const [showModalAlert, setShowModalAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    let sektorUsahaSearchVal = e.target.sektorUsahaSearch.value || null;
    setSektorUsahaSearch(sektorUsahaSearchVal);
    getData(1, sektorUsahaSearchVal);
  }

  const handleEdit = (id) => {
    getSektorById(id, ((data) => {
      setSektor(data.data);
    }));

    setTitle("Edit Sektor Usaha");
    setShowModal(true);
  }

  const handleDelete = (id) => {
    setTitle("Hapus Sektor Usaha?");
    setDeleteId(id);
    setShowModalConfirm(true);
  }

  const handleShowAlert = (message) => {
    setMessageAlert(message);
    setShowModal(false);
    setShowModalAlert(true);
  }

  const handleCloseModal = () => {
    setShowModal(false);
    setShowModalConfirm(false);
    setShowModalAlert(false);
    setSektor();
  }

  const handleConfirm = (confirm) => {
    setShowModalConfirm(false);
    if(confirm)
    {
      deleteSektor(deleteId, ((message) => {
        setMessageAlert(message);
        setShowModalAlert(true);
      }));
    }
  }

  const getData = (pageNumber, sektorUsahaSearch) => {
    getSektorUsaha((data) => {
      setSektors(
        data.data.map((item) => 
          tableDataHeaders.reduce((acc, header) => {
            acc[header.code] = item[header.code];
            return acc;
          }, {})
        )
      ); 
      setPagination(data.pagination);
    },
    (errorMessage) => {
      setErrorMessage(errorMessage);
      setSektors([]);
    },
    { page: pageNumber, pageSize: 5, name: sektorUsahaSearch}
  )};

  useEffect(() => {
    getData(1, "");
  },[]);

  return (
    <>
      <div className="flex justify-between">
        <Button
          onClick={() => {
            setShowModal(true);
            setTitle("Tambah Sektor Usaha");
          }}
        >
          Tambah Sektor Usaha
        </Button>
        <form action="" onSubmit={handleSearch} className="flex gap-2">
          <InputSearch placeholder="Cari Sektor Usaha" name="sektorUsahaSearch" />
          <Button type="submit">Search</Button>
        </form>
      </div>
      <div className="rounded-md border mt-4 shadow">
        <Table
          tableHeaders={tableDataHeaders}
          data={sektors}
          messageErrorEmptyData={errorMessage}
          pagination={pagination}
          getDataByPagination={(pageNumber) => 
            getData(pageNumber, sektorUsahaSearch)
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
              function: (id) => handleDelete(id)
            }
          ]}>
        </Table>
      </div>
      <Modal
        onClose={handleCloseModal}
        visible={showModalConfirm}
        title={title}
        confirm={handleConfirm}
        >
          Apakah anda yakin ingin menghapus Sektor Usaha ini?
      </Modal>
      <Modal
        onClose={handleCloseModal}
        visible={showModal}
        title={title}
        form="form-upsert-sektor-usaha"
      >
        <FormUpsertSektorUsaha data={sektor} showAlert={handleShowAlert} />
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
  )
}

export default DataSektorUsaha