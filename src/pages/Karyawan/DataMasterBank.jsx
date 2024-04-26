import Button from "../../components/Button";
import Table from "../../components/Table";

function DataMasterBank() {
  const dataJson = [
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
  ];

  return (
    <>
      <Button>Tambah Bank</Button>
      <Button variant="warning">Edit</Button>
      <Button variant="info">Edit</Button>
      <Button variant="danger">Edit</Button>
      <div className="rounded-md border mt-4 shadow">
        <Table
          tableHeaders={["Nama Bank", "Aksi"]}
          data={dataJson}
          pagination={{ pageNumber: 1, totalPages: 1 }}
          getDataByPagination={(pageNumber) => {
            console.log(pageNumber);
          }}
          action={["Edit", "Delete", "Detail"]}
        />
      </div>
    </>
  );
}

export default DataMasterBank;
