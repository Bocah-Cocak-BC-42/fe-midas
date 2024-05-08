import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Table from "../../components/Table";
import InputSearch from "../../components/Input/InputSearch";
import Modal from "../../components/Modal";
import { Link, useNavigate } from "react-router-dom";
import { get, getById } from "../../services/config.service";
import { deleteKantorCabang, getKantorCabang } from "../../services/data-master-kantor-cabang";

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
    const [messageAlert, setMessageAlert] = useState("");
    const [errorMessage, setErrorMessage] = useState("Gagal Memuat Data Kantor Cabang");
    const [id, setId] = useState("");
    const navigate = useNavigate();
    const tableDataHeaders = [
        { code: "id", name: "ID"},
        { code: "code", name: "Code"},
        { code: "name", name: "Nama Kantor Cabang"},
        { code: "province", name: "Provinsi"},
        { code: "city", name: "Kabupaten/Kota"}
    ]
    const getData = (pageNumber, pencarianNamaCabang, pencarianProvinsi, pecarianKota) => {
        getKantorCabang(
            (res) => {
                setCabangCabang(
                    res.data.map((item) => 
                        tableDataHeaders.reduce((acc, header) => {
                            acc[header.code] = item[header.code];
                            return acc;
                        }, {})
                    ) 
                );
                setPagination(res.pagination);
            },
            (errMessage) => {
                setErrorMessage(errMessage);
                setCabangCabang([]);
            },
            {page: pageNumber, pageSize: 5, officeName: pencarianNamaCabang, province: pencarianProvinsi, city: pecarianKota }
        );
    }

        useEffect(() => {
            getData(1, "", "", "");
        }, []);

        const handleSearch = (e) => {
            e.preventDefault();
            let pencarianNamaCabangVal = e.target.pencarianNamaCabang.value || null;
            console.log(pencarianNamaCabang)
            setPencarianNamaCabang(pencarianNamaCabangVal);
            let pencarianProvinsiVal = e.target.pencarianProvinsi.value || null;
            setPencarianProvinsi(pencarianProvinsiVal);
            console.log(pencarianProvinsiVal);
            let pencarianKotaVal = e.target.pencarianKota.value || null;
            setPencarianKota(pencarianKotaVal);
            getData(1, pencarianNamaCabangVal,pencarianProvinsiVal,pencarianKotaVal);
            
        }
        const handleDelete = (id) =>{
            setId(id);
            console.log(id);
            setJudul("Hapus Kantor Cabang")
            setConfirmModal(true);
        }
        const handleConfirm = (confirm) =>{
            setConfirmModal(true);
            if(confirm){
                deleteKantorCabang((message) => {
                    setMessageAlert(message)
                    setJudul("Pemberitahuan");
                    setAlertModal(true);
                }, id);
            }
        };

        const handleCloseModal = () =>{
            setAlertModal(false);
            setShowModal(false);
            setConfirmModal(false);
            cabang();
        }
        
        const handleEdit = (data) =>{
            navigate(`/admin/data-master/kantor-cabang/edit/${data.id}`)
        }

        const handleDetail = (data) =>{
            navigate(`/admin/data-master/kantor-cabang/karyawan/${data.id}`);
        }
    return(
        <>
            <div className="m-1">
                <div className="flex justify-betwen">
                    <form action="" onSubmit={handleSearch} className="flex gap-2">
                        <InputSearch placeholder="Cari Nama Kantor Cabang" name="pencarianNamaCabang"/>
                        <InputSearch placeholder="Provinsi Kantor Cabangg" name="pencarianProvinsi" />
                        <InputSearch placeholder="Kabupaten/Kota Kantor Cabang" name="pencarianKota"/>
                        <Button type="submit">Search</Button>
                    </form>
                </div>
                <div className="mt-2">
                    <Link to={"/admin/data-master/kantor-cabang/tambah"}>
                        <Button>Tambah Cabang</Button>
                    </Link>
                </div>
                <div className="rounded-md border mt-4 shadow">
                    <Table 
                        tableHeaders={tableDataHeaders}
                        data={cabangCabang}
                        messageErrorEmptyData={errorMessage}
                        pagination={pagination}
                        getDataByPagination={(pageNumber) => {
                            getData(pageNumber, pencarianNamaCabang, pencarianProvinsi, pecarianKota)
                        }}
                        actions={[
                            {
                                name: "Edit",
                                variant: "warning",
                                function: handleEdit
                            },
                            {
                                name: "Detail",
                                variant: "info",
                                function: handleDetail
                            },
                            {
                                name: "Delete",
                                variant: "danger",
                                function:(id) =>handleDelete(id)
                            }
                        ]}
                    />
                </div>
                <Modal
                    onClose={handleCloseModal}
                    visible={showConfirmModal}
                    title={showJudul}
                    confirm={handleConfirm}
                >
                    <p>Apakah anda yakin akan menghapus data ini?</p>
                </Modal>
                <Modal onClose={() => {
                        handleCloseModal();
                        location.reload();
                        }}
                        visible={showAlertModal} 
                        title={showJudul}>
                    {messageAlert}
                </Modal>
            </div>
        </>
    )
}

export default DaftarKantorCabang;