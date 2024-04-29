import React, { useEffect, useState } from 'react';
import Button from '../../components/Button';
import InputSearch from '../../components/Input/InputSearch';
import Table from '../../components/Table';

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
  const [sectionDto, setSectionDto] = useState<any>();
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
  const [title, setTitle] = useState("");
  const handleEdit = (id) => {
    // getBankById((data) => {
    //   setBank(data);
    // }, id);
    setTitle("Edit Bank");
    setShowModal(true);
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
                  function: handleEdit,
                },
              ]}
            />
          </div>
      }
    </>
  )
}

export default DataMasterAlamat
