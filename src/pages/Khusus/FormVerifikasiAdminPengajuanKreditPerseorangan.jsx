import { useState } from "react";
import Button from "../../components/Button";
import FormattingTable from "../../components/FormattingTable";
import Modal from "../../components/Modal";
import FormNoteVerifikasi from "../../components/Form/FormNoteVerifikasi";

function FormVerifikasiAdminPengajuanKreditPerseorangan({}) {
    const [data, setData] = useState([]);
    const [errorMessage, setErrorMessage] = useState("gagal memuat data");
    const [showModal, setShowModal] = useState(false);
    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const [title, setTitle] = useState("");

    const dataDiri = [
        {code:"NIK", value:""},
        {code:"Nama Lengkap", value:""},
        {code:"Alamat Rumah", value:""},
        {code:"Provinsi", value:""},
        {code:"Kabupaten/Kota", value:""},
        {code:"Kecamatan", value:""},
        {code:"Kelurahan/Desa", value:""},
        {code:"Kode Pos", value:""}
    ]

    const berkasDiri = [
        {code:"Surat Domisili", value:""},
        {code:"Foto KTP", value:""},
        {code:"Foto Selfie KTP", value:""},
        {code:"Foto KK", value:""},
        {code:"Kontak Darurat", value:""},
        {code:"Nama Lengkap", value:""},
        {code:"Hubungan", value:""},
        {code:"Nomor Telepon", value:""}
    ]

    const dataUsaha = [
        {code:"Sektor Usaha", value:""},
        {code:"Nama Usaha", value:""},
        {code:"No. Telepon Usaha", value:""},
        {code:"Lama Usaha", value:""},
        {code:"Status Tempat", value:""},
        {code:"Jumlah Karyawan", value:""},
        {code:"Alamat Usaha", value:""},
        {code:"Provinsi Usaha", value:""},
        {coda:"Kabupaten/kota", value:""},
        {code:"Kecamatan", value:""},
        {code:"Kelurahan/Desa", value:""},
        {code:"Kode Pos Usaha", value:""},
        {code:"Surat Keterangan Usaha", value:""}
    ]

    const pengajuan = [
        {code:"Kantor Cabang Pengajuan", value:""},
        {code:"Nominal Pengajuan", value:""},
        {code:"Jangka Waktu", value:""},
    ]

    const handleConfirm = (confirm) => {
        console.log(confirm);
        setShowModalConfirm(false);
        // if(confirm) {
        //     rejectForm((message) => {
        //         serMessageAlert()
        //     }, id);
        // }
    }

    const handleCloseModal = () => {
        setShowModal(false);
        setShowModalConfirm(false);
    }

    const handleReject = () => {
        setTitle("Tolak Pengajuan Kredit")
        setShowModal(true)
    }

    const handleApprove = (data) => {
        setTitle("Setujui Pengajuan Kredit");
        setShowModalConfirm(true);
    }
    return (
        <>
            <div className="flex" >
                <div className="w-1/2">
                    <div>
                        <hr className="my-8 border-t border-gray-300" />
                        <div className="flex flex-row items-center space-x-7">
                            <div className={` bg-[#FFD95A] h-14 w-14 flex justify-center items-center text-white rounded-full`}
                            >1</div>
                            <p
                                className={`text-center text-[#C07F00]`}
                            >
                                Data Diri
                            </p>
                        </div>
                        <div>
                            <FormattingTable
                                data = {dataDiri}
                                messageErrorEmptyData={errorMessage}
                            />
                        </div>
                    </div>
                    <div>
                        <hr className="my-8 border-t border-gray-300" />
                        <div className="flex flex-row items-center space-x-7">
                            <div className={` bg-[#FFD95A] h-14 w-14 flex justify-center items-center text-white rounded-full`}
                            >3</div>
                            <p
                                className={`text-center text-[#C07F00]`}
                            >
                                Data Usaha
                            </p>
                        </div>
                        <div>
                            <FormattingTable
                                data = {dataUsaha}
                                messageErrorEmptyData={errorMessage}
                            />
                        </div>
                            
                    </div>
                </div>
                <div className="w-1/2">
                    <div>
                        <hr className="my-8 border-t border-gray-300" />
                        <div className="flex flex-row items-center space-x-7">
                            <div className={` bg-[#FFD95A] h-14 w-14 flex justify-center items-center text-white rounded-full`}
                            >2</div>
                            <p
                                className={`text-center text-[#C07F00]`}
                            >
                                Berkas Diri
                            </p>
                        </div>
                        <div>
                            <FormattingTable
                                data = {berkasDiri}
                                messageErrorEmptyData={errorMessage}
                            />
                        </div>

                    </div>
                    <div>
                        <hr className="my-8 border-t border-gray-300" />
                        <div className="flex flex-row items-center space-x-7">
                            <div className={` bg-[#FFD95A] h-14 w-14 flex justify-center items-center text-white rounded-full`}
                            >4</div>
                            <p
                                className={`text-center text-[#C07F00]`}
                            >
                                Pengajuan
                            </p>
                        </div>
                        <div>
                            <FormattingTable
                                data = {pengajuan}
                                messageErrorEmptyData={errorMessage}
                            />
                        </div>
                    </div>

                </div>
            </div>

            <div className="my-8 flex justify-end space-x-5">
                <Button
                    variant="danger"
                    onClick={() => {
                        handleReject(data);
                    }}
                >
                    Tolak
                </Button>
                <Button
                    variant="success"
                    onClick={()=> {
                        handleApprove(data);
                    }}
                >
                    Setujui
                </Button>
            </div>

            <Modal
                onClose={handleCloseModal}
                visible={showModal}
                title={title}
                form="form-note-verikasi"
            >
                <FormNoteVerifikasi data={data}/>
            </Modal>

            <Modal
                onClose={handleCloseModal}
                visible={showModalConfirm}
                title={title}
                confirm={handleConfirm}
            >
                <p>Apakah Anda yakin ingin menyetujui pengajuan kredit ini?</p>
            </Modal>
        </>
    )
}

export default FormVerifikasiAdminPengajuanKreditPerseorangan;