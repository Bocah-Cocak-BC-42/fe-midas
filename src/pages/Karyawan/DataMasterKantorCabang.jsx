import Button from "../../components/Button";
import Table from "../../components/Table";

function DaftarKantorCabang() {
    const dataJson = [
        {
            id : 1, 
            kodeKantorCabang : "CA001",
            namaKantorCabang: "KCA Sudirman",
            provinsi: "Jakarta",
            kota: "Jakarta Selatan",
        },
        {
            id: 2,
            kodeKantorCabang: "CA002",
            namaKantorCabang: "KCA Thamrin",
            provinsi: "Jakarta",
            kota: "Jakarta Pusat"
        },
        {
            id:3,
            kodeKantorCabang: "CA003",
            namaKantorCabang: "KCA Margonda",
            provinsi: "Jawa Barat",
            kota: "Depok"
        },
        {
            id: 4,
            kodeKantorCabang: "CA004",
            namaKantorCabang: "KCA Bandung",
            provinsi: "Jawa Barat",
            kota: "Bandung"
        },
        {
            id: 5,
            kodeKantorCabang: "CA005",
            namaKantorCabang: "KCA Jayapura",
            provinsi: "Jayapura",
            kota: "Jayapura"
        }
    ];
    return(
        <>
            <Button>Tambah Cabang</Button>
            <div className="rounded-md border mt-4 shadow">
                <Table 
                    tableHeaders={["Kode Cabang", "Nama Cabang", "Provinsi", "Kota", "Aksi"]}
                    data={dataJson}
                    pagination={{ pageNumber: 1, totalPages: 1}}
                    getDataByPagination={(pageNumber) => {
                        console.log(pageNumber);
                    }}
                    action={["Edit", "Delete", "Detile"]}
                />
            </div>
        </>
    )
}

export default DaftarKantorCabang;