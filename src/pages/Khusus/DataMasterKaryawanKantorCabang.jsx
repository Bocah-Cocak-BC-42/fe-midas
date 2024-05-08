import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Table from "../../components/Table";
import InputSearch from "../../components/Input/InputSearch";
import Modal from "../../components/Modal";
import { Link, useParams } from "react-router-dom";
import FormUpsertKaryawanCabang from "../../components/Form/FormUpsertKaryawanCabang";
import { getKantorCabangById } from "../../services/data-master-kantor-cabang";


function DataKaryawanKantorCabang(){ 
    const [karyawanCabang, setKaryawanCabang] = useState([]);
    const [namaCabang, setNamaCabang] = useState()
    const { id } = useParams();
    const [karyawan, setKaryawan] = useState();
    const [pagination, setPagination] = useState({});
    const [showModalAlert, setModalAlert] = useState(false);
    const [showConfirmModal, setConfirmModal] = useState(false);
    const [showModal, setShowModal] = useState(false)
    const [showJudluModal, setJudulModal] = useState("");
    const [pencarianNamaKaryawan, setPencarianNamaKaryawan] = useState("");
    const [pecarianNIP, setPencarianNIP] = useState("");
    const [pencarianJabatan, setPencarianJabatan] = useState("");
    // const { idCabang, namaCabang } = useParams();
    // console.log(idCabang, namaCabang)
    const tableHeaders = [
        { code: "id", name: "ID" },
        { code: "fullName", name: "Nama Lengkap" },
        { code: "identityNumber", name: "NIP" },
        { code: "roleName", name: "Jabatan" },

    ]

    function getKaryawanCabang(pageNumber, pencarianNamaKaryawan, pencarianNIP, pencarianJabatan){
        console.log(id);
        getKantorCabangById(
            (res) => {
                setNamaCabang(
                    res.name
                )
                setKaryawanCabang(
                    res.employees.map((item) => 
                        tableHeaders.reduce((acc, header) => {
                            acc[header.code] = item[header.code];
                            return acc;
                        }, {})
                    )
                )
            }, id
        )
    }

    useEffect(() => {
        // getDataKaryawan(1, "", "", "");
        getKaryawanCabang(1, "", "", "")
    }, []);

    const handleSearch = (e) =>{
        e.preventDefault();
        let pencarianNamaKaryawanVal = e.target.pencarianNamaKaryawan.value || null;
        setPencarianNamaKaryawan(pencarianNamaKaryawanVal);
        let pencarianNIPVal = e.target.pencarianNIP.value || null;
        setPencarianNIP(pencarianNIPVal);
        let pencarianJabatanVal = e.target.pencarianJabatan.value || null;
        setPencarianJabatan(pencarianJabatanVal);
    }

    const handleDelete = (id) =>{
        console.log(id);
        setJudulModal("Delete Data Karyawan")
        setConfirmModal(true);
    }

    const handlConfirm = (confirm) =>{
        setConfirmModal(true);
        if(confirm){
            setJudulModal("Pemberitahuan");
            setModalAlert(true)
        }
    }

    const handleCloseModal = () =>{
        setModalAlert(false);
        setConfirmModal(false);
        setShowModal(false)
        karyawan();
    }
    return(
        <>
            <div>
                <div>
                    <Link to="../../"relative="path">
                        <Button icon="arrow-left" variant="danger">
                            Kembali
                        </Button>
                    </Link>
                </div>
                <div className="mt-2">
                    <h3 className="text-xl font-bold">{namaCabang}</h3>
                    <h1 className="text-2xl font-bold">Karyawan</h1>
                </div>
                <div className="mt-4 flex justify-betwen">
                    <form action="" onSubmit={handleSearch} className="flex gap-4">
                        <InputSearch placeholder="Cari berdasarkan Nama" name="pencarianNamaKaryawan"/>
                        <InputSearch placeholder="Cari Berdasrkan NIP" name="pencarianNIP"/>
                        <InputSearch placeholder="Cari Berdasrkan Jabatan" name="pencarianJabatan" />
                        <Button type="submit">Search</Button>
                    </form>
                </div>
                <div className="mt-2">
                    <Button
                        onClick={()=> {
                           setShowModal(true);
                           setJudulModal("Tambah Karyawan Kantor Cabang") 
                        }}
                    >Tambah Karyawan</Button>
                </div>
                <div className="rounded-md border mt-4 shadow">
                    <Table 
                        tableHeaders={tableHeaders}
                        data={karyawanCabang}
                        pagination={pagination}
                        getDataByPagination={(pageNumber) => {
                            console.log(pageNumber);
                        }}
                        actions={[
                            {
                                name: "Detile",
                                variant: "info"
                            }
                        ]}
                    />
                </div>
                <Modal onClose={handleCloseModal} visible={showConfirmModal} title={showJudluModal} confirm={handlConfirm}>
                    <p>Apakah anda yakin akan menghapus data ini?</p>
                </Modal>
                <Modal onClose={handleCloseModal} visible={showModalAlert} title={showJudluModal}>
                    <p>Data Karyawan Berhasil dihapus</p>
                </Modal>
                <Modal onClose={handleCloseModal} visible={showModal} title={showJudluModal} form="form-upsert-karyawan-cabang">
                    <FormUpsertKaryawanCabang data={karyawan}/>
                </Modal>
            </div>
        </>
    )
}

export default DataKaryawanKantorCabang;