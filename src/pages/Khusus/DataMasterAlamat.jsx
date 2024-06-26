import React, { useEffect, useState } from 'react';
import Button from '../../components/Button';
import FormUpsertCity from '../../components/Form/FormUpsertCity';
import FormUpsertProvince from '../../components/Form/FormUpsertProvince';
import FormUpsertSubdistrict from '../../components/Form/FormUpsertSubdistrict';
import FormUpsertVillage from '../../components/Form/FormUpsertVillage';
import InputSearch from '../../components/Input/InputSearch';
import Modal from '../../components/Modal';
import Table from '../../components/Table';
import {
  delCity,
  delProvince,
  delSubdistrict,
  delVillage,
  getCity,
  getProvince,
  getSubDistrict,
  getVillage
} from '../../services/data-master-alamat.service';

function DataMasterAlamat() {
  const [sectionNumber, setSectionNumber] = useState(0);
  const [sectionInfo, _] = useState([
    {
      name: "Provinsi",
      "table-header": [
        {
          code: "name",
          name: "Nama Provinsi"
        }
      ],
      form: "form-upsert-province"
    },
    {
      name: "Kabupaten/Kota",
      "table-header": [
        {
          code: "name",
          name: "Nama Kabupaten/Kota"
        },
      ],
      form: "form-upsert-city"
    },
    {
      name: "Kecamatan",
      "table-header": [
        {
          code: "name",
          name: "Nama Kecamatan"
        },
      ],
      form: "form-upsert-subdistrict"
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
      ],
      form: "form-upsert-village"
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
  const [pageNumber, setPageNumber] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    totalPage: 0,
  });
  const [searchVal, setSearchVal] = useState("");
  const [rerender, setRerender] = useState(false);
  useEffect(() => {
    if (sectionNumber === 0) {
      getProvince(
        {
          page: pageNumber,
          pageSize: pagination.pageSize,
          name: searchVal
        },
        (dto) => {
          if (dto.status === "OK") {
            setSectionDto(dto.data);
            setPagination(dto.pagination);
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
          page: pageNumber,
          pageSize: pagination.pageSize,
          provinceId: sectionState[0].id,
          name: searchVal
        },
        (dto) => {
          if (dto.status === "OK") {
            setSectionDto(dto.data);
            setPagination(dto.pagination);
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
          page: pageNumber,
          pageSize: pagination.pageSize,
          cityId: sectionState[1].id,
          name: searchVal
        },
        (dto) => {
          if (dto.status === "OK") {
            setSectionDto(dto.data);
            setPagination(dto.pagination);
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
          page: pageNumber,
          pageSize: pagination.pageSize,
          subdistrictId: sectionState[2].id,
          name: searchVal
        },
        (dto) => {
          if (dto.status === "OK") {
            setSectionDto(dto.data);
            setPagination(dto.pagination);
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
    pageNumber,
    sectionNumber,
    searchVal,
    rerender
  ]);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target.search.value || "";
    setSearchVal(searchValue)
  };

  const [showModal, setShowModal] = useState(false);
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [showModalAlert, setShowModalAlert] = useState(false);
  const [title, setTitle] = useState("");
  const [messageAlert, setMessageAlert] = useState("");
  const [errorMessage, setErrorMessage] = useState("Cannot Get Data " + sectionInfo[sectionNumber].name);
  const [id, setId] = useState("");
  const [formData, setFormData] = useState(null);

  const handleDetail = (rowData) => {
    sectionState[sectionNumber].id = rowData.id;
    sectionState[sectionNumber].name = sectionDto[getIndex(rowData.id)].name;
    setSectionState(sectionState);
    setSectionNumber(sectionNumber + 1);
    setSearchVal("");
  };
  function getIndex(id) {
    let index = 0;
    const length = sectionDto.length;
    for (let i = 0; i < length; i++) {
      if (sectionDto[i].id === id) return index
      index++;
    }
  }

  const handleEdit = (rowData) => setFormData(rowData);
  useEffect(() => {
    if (formData !== null) {
      setTitle("Edit " + sectionInfo[sectionNumber].name);
      setShowModal(true);
    }
  }, [formData]);

  const handleDelete = (rowData) => {
    setId(rowData.id);
    setTitle("Hapus Provinsi");
    setShowModalConfirm(true);
  };

  const handleConfirm = (confirm) => {
    setShowModalConfirm(false);
    if (confirm) {
      if (sectionNumber === 0) {
        delProvince((message) => {
          setMessageAlert(message);
          setTitle("Pemberitahuan");
          setShowModalAlert(true);
        }, id);

      } else if (sectionNumber === 1) {
        delCity((message) => {
          setMessageAlert(message);
          setTitle("Pemberitahuan");
          setShowModalAlert(true);
        }, id);

      } else if (sectionNumber === 2) {
        delSubdistrict((message) => {
          setMessageAlert(message);
          setTitle("Pemberitahuan");
          setShowModalAlert(true);
        }, id);

      } else if (sectionNumber === 3) {
        delVillage((message) => {
          setMessageAlert(message);
          setTitle("Pemberitahuan");
          setShowModalAlert(true);
        }, id);
      }
    }
  };

  const handleShowAlert = (message) => {
    setMessageAlert(message);
    setShowModal(false);
    setShowModalAlert(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowModalConfirm(false);
    setShowModalAlert(false);
    setFormData(null);
  };

  return (
    <>
      {
        sectionNumber <= 0 ?
          null
          :
          <div className="mb-4">
            <Button
              variant="danger"
              icon="arrow-left"
              onClick={() => {
                setSectionNumber(sectionNumber - 1);
              }}
            >Kembali</Button>
          </div>
      }
      <h1 className="font-bold">{sectionInfo[sectionNumber].name}</h1>
      {
        sectionNumber <= 0 ?
          null
          :
          <h3 className="text-2xl font-bold">{sectionState[sectionNumber - 1].name}</h3>
      }
      <div className="flex justify-between mt-4">
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
              getDataByPagination={(pageNumber) => setPageNumber(pageNumber)}
              actions={
                sectionNumber === 3 ?
                  [
                    {
                      name: "Edit",
                      variant: "warning",
                      function: (row) => handleEdit(row),
                    },
                    {
                      name: "Delete",
                      variant: "danger",
                      function: (row) => handleDelete(row),
                    },
                  ]
                  :
                  [
                    {
                      name: "Detail",
                      variant: "info",
                      function: (row) => handleDetail(row),
                    },
                    {
                      name: "Edit",
                      variant: "warning",
                      function: (row) => handleEdit(row),
                    },
                    {
                      name: "Delete",
                      variant: "danger",
                      function: (row) => handleDelete(row),
                    },
                  ]
              }
            />
          </div>
      }
      <Modal
        onClose={handleCloseModal}
        visible={showModal}
        title={title}
        form={sectionInfo[sectionNumber].form}
      >
        {
          sectionNumber === 0 ?
            <FormUpsertProvince data={formData} showAlert={handleShowAlert} />
            :
            null
        }
        {
          sectionNumber === 1 ?
            <FormUpsertCity data={formData ?? sectionState} showAlert={handleShowAlert} />
            :
            null
        }
        {
          sectionNumber === 2 ?
            <FormUpsertSubdistrict data={formData ?? sectionState} showAlert={handleShowAlert} />
            :
            null
        }
        {
          sectionNumber === 3 ?
            <FormUpsertVillage data={formData ?? sectionState} showAlert={handleShowAlert} />
            :
            null
        }
      </Modal>

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
          // location.reload();
          setRerender(!rerender);
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
