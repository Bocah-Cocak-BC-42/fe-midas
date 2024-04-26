import Button from "../../components/Button";
import Table from "../../components/Table";

function DataMasterRole() {
    const dataJson = [
        {
            id : 1,
            name : "Manager",
        },
        {
            id : 2,
            name: "Supervisor",
        },
        {
            id : 3,
            name : "Mantri"
        }
    ];

    return (
        <>
            <Button>Tambah Role</Button>
            <Button variant="warning">Edit</Button>
            <Button variant="info">Search Role ...</Button>
            <Button variant="danger">Search</Button> 
            <div classname="rounded-md border mt-4 shadow">
                <Table
                    tableHeaders = {["Nama Role", "Aksi"]}
                    data = {dataJson}
                    pagination ={{pageNumber: 1, totalPages: 1}}
                    getDataByPagination = {(pageNumber) => {
                        console.log(pageNumber);
                    }}
                    action = {["Edit","Delete", "Detail"]}
                />
            </div>
        </>
    );
}
export default DataMasterRole;