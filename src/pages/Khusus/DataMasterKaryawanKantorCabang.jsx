import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Table from "../../components/Table";
import InputSearch from "../../components/Input/InputSearch";
import Modal from "../../components/Modal";
import { Link, useParams } from "react-router-dom";
import FormUpsertKaryawanCabang from "../../components/Form/FormUpsertKaryawanCabang";
import { deleteEmployeeBranchOffice, getKantorCabangById } from "../../services/data-master-kantor-cabang";
import { getEmployees } from "../../services/user-management.service";


function DataKaryawanKantorCabang(){ 
    const [karyawanCabang, setKaryawanCabang] = useState([]);
    const [namaCabang, setNamaCabang] = useState()
    const { id } = useParams();
    const [karyawan, setKaryawan] = useState([]);
    const [pagination, setPagination] = useState({});
    const [showModalAlert, setShowModalAlert] = useState(false);
    const [showConfirmModal, setConfirmModal] = useState(false);
    const [showModal, setShowModal] = useState(false)
    const [showJudulModal, setJudulModal] = useState("");
    const [messageAlert, setMessageAlert] = useState("");
    const [idemployee, setIdKaryawan] = useState(""); 
    const [pencarianNamaKaryawan, setPencarianNamaKaryawan] = useState("");
    const [pecarianNIP, setPencarianNIP] = useState("");
    const [pencarianJabatan, setPencarianJabatan] = useState("");

    const tableHeaders = [
        { code: "id", name: "ID" },
        { code: "fullName", name: "Nama Lengkap" },
        { code: "identityNumber", name: "NIP" },
        { code: "roleName", name: "Jabatan" },

    ]

    function getKaryawanCabang(pageNumber, pencarianNamaKaryawan, pencarianJabatan){
        console.log(id);
        getKantorCabangById(
            (res) => {
                console.log(res);
                setNamaCabang(
                    res.data.name
                );
                setKaryawanCabang(
                    res.data.employees.map((item) => 
                        tableHeaders.reduce((acc, header) => {
                            acc[header.code] = item[header.code];
                            return acc;
                        }, {})
                    )
                );
                setPagination(res.pagination);
            }, 
            id,
            {page: pageNumber, pageSize: 5, fullName: pencarianNamaKaryawan, role: pencarianJabatan}

        )
    }

    useEffect(() => {
        getKaryawanCabang(1, "", "", "")
        getEmployees(
            (res) => {
                setKaryawan(
                    karyawan.concat(res.data)
                )
            }
        )
    }, []);

    const handleSearch = (e) =>{
        e.preventDefault();
        let pencarianNamaKaryawanVal = e.target.pencarianNamaKaryawan.value || null;
        setPencarianNamaKaryawan(pencarianNamaKaryawanVal);
        let pencarianJabatanVal = e.target.pencarianJabatan.value || null;
        setPencarianJabatan(pencarianJabatanVal);
        getKaryawanCabang(1, pencarianNamaKaryawanVal, pencarianJabatanVal)
    }

    const handleDelete = (data) =>{
        setIdKaryawan(data.id)
        setJudulModal("Delete Data Karyawan")
        setConfirmModal(true);
    }

  
    const handlConfirm = (confirm) => {
        setConfirmModal(true);
        if (confirm) {
            deleteEmployeeBranchOffice((message) => {
                setMessageAlert(message)
                setJudulModal("Pemberitahuan");
                setShowModalAlert(true)
            }, idemployee);
        }
    }

    const handleCloseModal = () =>{
        setShowModalAlert(false);
        setConfirmModal(false);
        setShowModal(false)
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
                                name: "Delete",
                                variant: "danger",
                                function: (idKaryawan) => handleDelete(idKaryawan)
                            }
                        ]}
                    />
                </div>
                <Modal onClose={handleCloseModal} visible={showConfirmModal} title={showJudulModal} confirm={handlConfirm}>
                    <p>Apakah anda yakin akan menghapus data ini?</p>
                </Modal>
                <Modal onClose={ ()=> {
                    handleCloseModal();
                    getKaryawanCabang(1, "", "", "")
                    }} 
                    visible={showModalAlert} title={showJudulModal}>
                    {messageAlert}
                </Modal>
                <Modal onClose={() => {
                    handleCloseModal()
                    getKaryawanCabang(1, "", "", "")
                }
                } visible={showModal} title={showJudulModal} form="form-upsert-karyawan-cabang">
                    <FormUpsertKaryawanCabang data={karyawan} id={id} showAlert={(val)=> {setMessageAlert(val);
                        setShowModalAlert(true);
                        setShowModal(false)
                        location.reload()
                    }} />
                </Modal>
            </div>
        </>
    )
}

export default DataKaryawanKantorCabang;