import Button from "../../components/Button";
import Table from "../../components/Table";
import TableActions from "../../components/TableActions";


function DataKaryawanKantorCabang(){ 
    const dataJson = [
        {
            id: 1,
            namaLengkap: "Gusto",
            nip: "201280121029",
            jabatan: "Manager",
            tanggalPendaftaran: "29-12-2023"
        },
        {
            id: 2,
            namaLengkap: "Kevin Orlando",
            nip: "3212801281021",
            jabatan: "Supervisor",
            tanggalPendaftaran: "12-10-2020"
        },
        {
            id: 3, 
            namaLengkap: "Paulina",
            nip: "31381201891212",
            jabatan: "Admin",
            tanggalPendaftaran: "09-10-2021"
        }
    ];
    return(
        <>
            <div className="m-4">
                <div>
                    <Button icon="arrow-left" variant="danger">
                        Kembali
                    </Button>
                </div>
                <div className="mt-2">
                    <p className="text-base">KCA Sudirman</p>
                    <h3 className="text-3xl">Karyawan</h3>
                </div>
                <div className="mt-2">
                    <Button>Tambah Karyawan</Button>
                </div>
                <div className="rounded-md border mt-4 shadow">
                    <Table 
                        tableHeaders={["Nama Lengkap","NIP","Jabatan","Tanggal Daftar", "Aksi"]}
                        data={dataJson}
                        pagination={{ pageNumber: 1, totalPages: 1}}
                        getDataByPagination={(pageNumber) => {
                            console.log(pageNumber);
                        }}
                        action={
                            <TableActions>
                                <Button variant="info">Detail</Button>
                                <Button variant="warning">Edit</Button>
                                <Button variant="danger">Delete</Button>
                            </TableActions>
                        }
                    />
                </div>
            </div>
        </>
    )
}

export default DataKaryawanKantorCabang;