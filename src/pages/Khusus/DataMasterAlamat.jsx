import React, { useEffect, useState } from 'react';
import Button from '../../components/Button';
import InputSearch from '../../components/Input/InputSearch';
import Table from '../../components/Table';
import Modal from '../../components/Modal';
import FormUpsertAlamat from '../../components/Form/FormUpsertAlamat';

function DataMasterAlamat() {
  const [sectionNumber, setSectionNumber] = useState(0);
  const [sectionInfo, setSectionInfo] = useState([
    {
      name: "Provinsi",
      "table-header": ["Nama Provinsi", "Aksi"]
    },
    {
      name: "Kabupaten/Kota",
      "table-header": ["Nama Kabupaten/Kota", "Aksi"]
    },
    {
      name: "Kecamatan",
      "table-header": ["Nama Kabupaten/Kota", "Aksi"]
    },
    {
      name: "Kelurahan/Desa",
      "table-header": ["Nama Kabupaten/Kota", "Kode Pos", "Aksi"]
    },
  ]);
  const [sectionState, setSectionState] = useState([0, 0, 0]);
  const [sectionDto, setSectionDto] = useState();
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 10,
    totalPages: 3,
  });
  useEffect(() => {
    if (sectionNumber === 0) {
      // Ambil data provinsi
      setSectionDto([
        {
          id: 1,
          name: "Provinsi 1"
        },
        {
          id: 2,
          name: "Provinsi 2"
        },
      ]);
      setPagination({
        pageNumber: pagination.pageNumber,
        pageSize: pagination.pageSize,
        totalPages: pagination.totalPages,
      });
    }
  }, [pagination]);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target.bankNameSearch.value || null;
    // setBankNameSearch(searchValue);
    // getData(1, searchValue);
  };

  const [showModal, setShowModal] = useState(false);
  const [showModalInfo, setShowModalInfo] = useState(false);
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [showModalAlert, setShowModalAlert] = useState(false);
  const [title, setTitle] = useState("");
  const handleEdit = (id) => {
    // getBankById((data) => {
    //   setBank(data);
    // }, id);
    setTitle("Edit Provinsi");
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

  const handleCloseModal = () =>
    {
      setShowModal(false);
      setShowModalInfo(false);
      setShowModalConfirm(false);
      setShowModalAlert(false);
    };

  return (
    <>
      <div className="flex justify-between">
        <Button
          onClick={() => {
            setShowModal(true);
            setTitle(`Tambah ${sectionInfo[sectionNumber].name}`);
          }}
        >
          {`Tambah ${sectionInfo[sectionNumber].name}`}
        </Button>
        <form action="" onSubmit={handleSearch} className="flex gap-2">
          <InputSearch placeholder={`Cari ${sectionInfo[sectionNumber].name}`} name="search" />
          <Button type="submit">Search</Button>
        </form>
      </div>

      {
        !sectionDto ?
          null
          :
          <div className="rounded-md border mt-4 shadow">
            <Table
              tableHeaders={sectionInfo[sectionNumber]['table-header']}
              data={sectionDto}
              pagination={pagination}
              getDataByPagination={(pageNumber) => setPagination(
                {
                  pageNumber: pageNumber,
                  pageSize: pagination.pageSize,
                  totalPages: pagination.totalPages,
                }
              )}
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
                  function: handleConfirm,
                },
              ]}
            />
          </div>
      }
      <Modal
        onClose={handleCloseModal}
        visible={showModal}
        title={title}
        form="form-upsert-alamat"
      >
        <FormUpsertAlamat data={sectionState} />
      </Modal>
      <Modal onClose={handleCloseModal} visible={showModalInfo} title={title}>
      </Modal>
      <Modal
        onClose={handleCloseModal}
        visible={showModalConfirm}
        title={title}
        confirm={handleConfirm}
      >
        <p>Apakah anda yakin ingin menghapus data ini?</p>
      </Modal>
      <Modal onClose={handleCloseModal} visible={showModalAlert} title={title}>
        Data Provinsi Berhasil Dihapus
      </Modal>
    </>
  );
}

export default DataMasterAlamat;
