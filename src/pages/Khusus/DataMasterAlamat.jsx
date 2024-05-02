import React, { useEffect, useState } from 'react';
import Button from '../../components/Button';
import FormUpsertAlamat from '../../components/Form/FormUpsertAlamat';
import InputSearch from '../../components/Input/InputSearch';
import Modal from '../../components/Modal';
import Table from '../../components/Table';
import { getCity, getProvince, getSubDistrict, getVillage } from '../../services/data-master-alamat.service';

function DataMasterAlamat() {
  const [sectionNumber, setSectionNumber] = useState(0);
  const [sectionInfo, _] = useState([
    {
      name: "Provinsi",
      "table-header": [
        {
          code: "name",
          name: "Nama Provinsi"
        },
      ]
    },
    {
      name: "Kabupaten/Kota",
      "table-header": [
        {
          code: "name",
          name: "Nama Kabupaten/Kota"
        },
      ]
    },
    {
      name: "Kecamatan",
      "table-header": [
        {
          code: "name",
          name: "Nama Kecamatan"
        },
      ]
    },
    {
      name: "Kelurahan/Desa",
      "table-header": [
        {
          code: "name",
          name: "Nama Kelurahan/Desa"
        },
        {
          code: "postalCode",
          name: "Kode Pos"
        },
      ]
    },
  ]);
  const [sectionState, setSectionState] = useState([
    {
      id: 0,
      name: ""
    },
    {
      id: 0,
      name: ""
    },
    {
      id: 0,
      name: ""
    },
    {
      id: 0,
      name: ""
    },
  ]);
  const [sectionDto, setSectionDto] = useState();
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 10,
    totalPage: 0,
  });
  const [searchVal, setSearchVal] = useState("");
  useEffect(() => {
    if (sectionNumber === 0) {
      getProvince(
        {
          pageNumber: pagination.pageNumber,
          pageSize: pagination.pageSize,
          name: searchVal
        },
        (dto) => {
          if (dto.status === "OK") {
            setSectionDto(dto.data);
            setPagination({
              pageNumber: dto.pagination.page,
              pageSize: dto.pagination.pageSize,
              totalPage: dto.pagination.totalPage
            });
          } else if (dto.status === "FAILED") console.log(dto.message);
          else if (dto.status === "NOTFOUND") console.log(dto.message);
        },
        (errMessage) => {
          setErrorMessage(errMessage);
          setSectionDto([]);
        },
      )

    } else if (sectionNumber === 1) {
      getCity(
        {
          pageNumber: pagination.pageNumber,
          pageSize: pagination.pageSize,
          provinceId: sectionState[0].id,
          name: searchVal
        },
        (dto) => {
          if (dto.status === "OK") {
            setSectionDto(dto.data);
            setPagination({
              pageNumber: dto.pagination.page,
              pageSize: dto.pagination.pageSize,
              totalPage: dto.pagination.totalPage
            });
          } else if (dto.status === "FAILED") console.log(dto.message);
          else if (dto.status === "NOTFOUND") console.log(dto.message);
        },
        (errMessage) => {
          setErrorMessage(errMessage);
          setSectionDto([]);
        },
      )

    } else if (sectionNumber === 2) {
      getSubDistrict(
        {
          pageNumber: pagination.pageNumber,
          pageSize: pagination.pageSize,
          cityId: sectionState[1].id,
          name: searchVal
        },
        (dto) => {
          if (dto.status === "OK") {
            setSectionDto(dto.data);
            setPagination({
              pageNumber: dto.pagination.page,
              pageSize: dto.pagination.pageSize,
              totalPage: dto.pagination.totalPage
            });
          } else if (dto.status === "FAILED") console.log(dto.message);
          else if (dto.status === "NOTFOUND") console.log(dto.message);
        },
        (errMessage) => {
          setErrorMessage(errMessage);
          setSectionDto([]);
        },
      )

    } else if (sectionNumber === 3) {
      getVillage(
        {
          pageNumber: pagination.pageNumber,
          pageSize: pagination.pageSize,
          subdistrictId: sectionState[2].id,
          name: searchVal
        },
        (dto) => {
          if (dto.status === "OK") {
            setSectionDto(dto.data);
            setPagination({
              pageNumber: dto.pagination.page,
              pageSize: dto.pagination.pageSize,
              totalPage: dto.pagination.totalPage
            });
          } else if (dto.status === "FAILED") console.log(dto.message);
          else if (dto.status === "NOTFOUND") console.log(dto.message);
        },
        (errMessage) => {
          setErrorMessage(errMessage);
          setSectionDto([]);
        },
      )
    }

  }, [
    pagination,
    sectionNumber
  ]);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target.search.value || "";
    setSearchVal(searchValue)
  };

  const [showModal, setShowModal] = useState(false);
  const [showModalInfo, setShowModalInfo] = useState(false);
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [showModalAlert, setShowModalAlert] = useState(false);
  const [title, setTitle] = useState("");
  const [messageAlert, setMessageAlert] = useState("");
  const [errorMessage, setErrorMessage] = useState("Cannot Get Data " + sectionInfo[sectionNumber].name);

  const handleDetail = (id) => {
    sectionState[sectionNumber].id = id;
    sectionState[sectionNumber].name = sectionDto[getIndex(id)].name;
    setSectionState(sectionState);
    setSectionNumber(sectionNumber + 1);
  };
  function getIndex(id) {
    let index = 0;
    const length = sectionDto.length;
    for (let i = 0; i < length; i++) {
      if (sectionDto[i].id === id) return index
    }
  }

  const handleEdit = (id) => {
    // getBankById((data) => {
    //   setBank(data);
    // }, id);
    setTitle("Edit Provinsi");
    setShowModal(true);
  };

  const handleDelete = (id) => {
    console.log(id);
    setTitle("Hapus Provinsi");
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

  const handleCloseModal = () => {
    setShowModal(false);
    setShowModalInfo(false);
    setShowModalConfirm(false);
    setShowModalAlert(false);
  };

  const handleDetailVillage = () => { };

  return (
    <>
      <h1 className="text-2xl font-bold">{sectionInfo[sectionNumber].name}</h1>
      <h3 className="mb-4 text-xl font-bold">{sectionState[sectionNumber].name}</h3>
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
              messageErrorEmptyData={errorMessage}
              pagination={pagination}
              getDataByPagination={(pageNumber) => setPagination(
                {
                  pageNumber: pageNumber,
                  pageSize: pagination.pageSize,
                  totalPage: pagination.totalPage,
                }
              )}
              actions={[
                {
                  name: "Detail",
                  variant: "info",
                  function: sectionNumber !== 3 ? handleDetail : handleDetailVillage,
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
      {/* <Modal onClose={handleCloseModal} visible={showModalInfo} title={title}>
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

export default DataMasterAlamat;
