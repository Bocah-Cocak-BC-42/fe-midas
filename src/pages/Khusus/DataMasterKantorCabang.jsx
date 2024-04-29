import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Table from "../../components/Table";
import TableActions from "../../components/TableActions";
import InputSearch from "../../components/Input/InputSearch";

function DaftarKantorCabang() {
    const [cabangCabang, setCabangCabang] = useState([]);
    const [cabang, setCabang] = useState();
    const [pagination, setPagination] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [showAlertModal, setAlertModal] = useState(false);
    const [showConfirmModal, setConfirmModal] = useState(false);
    const [showJudul, setJudul] = useState("");
    const [pencarianNamaCabang, setPencarianNamaCabang] = useState("");
    const [pencarianProvinsi, setPencarianProvinsi] = useState("");
    const [pecarianKota, setPencarianKota] = useState("");

    const getData = (pageNumber, pencarianNamaCabang, pencarianProvinsi, pecarianKota) => {
        console.log(pageNumber, pencarianNamaCabang, pencarianProvinsi, pecarianKota);

        setCabangCabang([
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
        ]);
        setPagination({
            pageNumber: 1,
            pageSize: 10,
            totalPages: 3,
        });
    }

        useEffect(() => {
            getData(1, "");
        }, []);

        const handleSearch = (e) => {
            e.preventDefault();
            let pencarianNamaCabangVal = e.target.pencarianNamaCabang.value || null;
            setPencarianNamaCabang(pencarianNamaCabangVal);
            let pencarianProvinsiVal = e.target.pencarianProvinsi || null;
            setPencarianProvinsi(pencarianProvinsiVal);
            let pencarianKotaVal = e.target.pencarianKotaVal.value || null;
            setPencarianKota(pencarianKotaVal);
            getData(1, pencarianNamaCabangVal,pencarianProvinsiVal,pencarianKotaVal);
            
        }

        const handleConfirm = (confirm) =>{
            setConfirmModal(false);
            if(confirm){
                setJudul("Pemberitahuan");
                setAlertModal(true);
            }
        };

        const handleCloseModal = () =>{
            setAlertModal(false);
            setShowModal(false);
            setConfirmModal(false);
            cabang();
        }
    
    return(
        <>
            <div className="m-3">
                <div className="flex justify-betwen">
                    <form action="" onSubmit={handleSearch} className="flex gap-2">
                        <InputSearch placeholder="Cari Nama Kantor Cabang" name="pencarianNamaCabang"/>
                        <InputSearch placeholder="Provinsi Kantor Cabangg" name="pencarianProvinsi" />
                        <InputSearch placeholder="Kabupaten/Kota Kantor Cabang" name="pencarianKota"/>
                        <Button type="submit">Search</Button>
                    </form>
                </div>
                <div className="mt-2">
                    <Button>Tambah Cabang</Button>
                </div>
                <div className="rounded-md border mt-4 shadow">
                    <Table 
                        tableHeaders={["Kode Cabang", "Nama Cabang", "Provinsi", "Kota", "Aksi"]}
                        data={cabangCabang}
                        pagination={pagination}
                        getDataByPagination={(pageNumber) => {
                            console.log(pageNumber);
                        }}
                        action={
                            <TableActions className="right-4">
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

export default DaftarKantorCabang;