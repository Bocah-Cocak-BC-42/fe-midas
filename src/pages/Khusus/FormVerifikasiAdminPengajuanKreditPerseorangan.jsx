import { useState } from "react";
import Button from "../../components/Button";
import FormattingTable from "../../components/FormattingTable";
import Modal from "../../components/Modal";
import FormNoteVerifikasi from "../../components/Form/FormNoteVerifikasi";
import { patchNote } from "../../services/verification.service";

function FormVerifikasiAdminPengajuanKreditPerseorangan({}) {
    const [data, setData] = useState([]);
    const [errorMessage, setErrorMessage] = useState("gagal memuat data");
    const [showModal, setShowModal] = useState(false);
    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const [title, setTitle] = useState("");
    const [id, setId] = useState("");

    const dataDummy = [
        {
            id : 1,
            fullName: "string string",
            province: "Jakarta",
        
            familyCardNumber: "1111111111111111",
            address: "string",
            villageId: "59a370b6-0db0-4f5e-8d2a-d5835b38d242",
            businessSectorId: "ba4289cb-c761-470f-a1b1-03c4e391ca64",
            businessAddress: "string",
            businessPhoneNumber: "84938274857",
            businessPeriod: 1,
            businessPlaceStatus: "Kontrak",
            totalEmployee: 1,
            businessVillage: "59a370b6-0db0-4f5e-8d2a-d5835b38d242",
            branchOfficeId: "8b5894c1-0076-4da0-8cbf-d1727dd5b2b8",
            applicationAmount: 1000000,
            applicationPeriod: 1,
            domicileFile: "2754ff9b-2567-4bf3-aaa5-c7cbe3396737",
            identityCardFile: "2754ff9b-2567-4bf3-aaa5-c7cbe3396737",
            identityCardSelfieFile: "2754ff9b-2567-4bf3-aaa5-c7cbe3396737",
            familyCardFile: "2754ff9b-2567-4bf3-aaa5-c7cbe3396737",
            businessCertificateFile: "2754ff9b-2567-4bf3-aaa5-c7cbe3396737",
            emergencyContacts: [
              {
                phoneNumber: "890427945",
                name: "WbEMlmeuDJ fIapInovmdKFKzelR",
                relative: "Ayah"
              },
              {
                phoneNumber: "8433250584",
                name: "WbEMlmeuDJ fIapInovmdKFKzelR",
                relative: "Ibu"
              }
            ]
        }
    ]

    console.log(dataDummy[0].emergencyContacts)

    const dataDiri = [
        {code:"Id", value:dataDummy.id},
        {code:"NIK", value:dataDummy.familyCardNumber},
        {code:"Nama Lengkap", value:dataDummy.fullName},
        {code:"Alamat Rumah", value:dataDummy.address},
        {code:"Provinsi", value:dataDummy.province},
        {code:"Kabupaten/Kota", value:"Jakarta Barat"},
        {code:"Kecamatan", value:"Grogol"},
        {code:"Kelurahan/Desa", value:"Tanjung Duren"},
        {code:"Kode Pos", value:"13980"}
    ]

    const berkasDiri = [
        {code:"Surat Domisili", value:dataDummy.domicileFile},
        {code:"Foto KTP", value:dataDummy.identityCardFile},
        {code:"Foto Selfie KTP", value:dataDummy.identityCardSelfieFile},
        {code:"Foto KK", value:dataDummy.familyCardFile},
        {code:"Kontak Darurat", value:""},
        {code:"Nama Lengkap", value:dataDummy[0].emergencyContacts[0].name},
        {code:"Hubungan", value:dataDummy[0].emergencyContacts[0].relative},
        {code:"Nomor Telepon", value:dataDummy[0].emergencyContacts[0].phoneNumber}
    ]

    const dataUsaha = [
        {code:"Sektor Usaha", value:dataDummy.businessSectorId},
        {code:"Nama Usaha", value:dataDummy.businessSectorId},
        {code:"No. Telepon Usaha", value:dataDummy.businessPhoneNumber},
        {code:"Lama Usaha", value:dataDummy.businessPeriod},
        {code:"Status Tempat", value:dataDummy.businessPlaceStatus},
        {code:"Jumlah Karyawan", value:dataDummy.totalEmployee},
        {code:"Alamat Usaha", value:dataDummy.businessAddress},
        {code:"Provinsi Usaha", value:dataDummy.businessVillage},
        {coda:"Kabupaten/kota", value:""},
        {code:"Kecamatan", value:""},
        {code:"Kelurahan/Desa", value:""},
        {code:"Kode Pos Usaha", value:""},
        {code:"Surat Keterangan Usaha", value:dataDummy.businessCertificateFile}
    ]

    const pengajuan = [
        {code:"Kantor Cabang Pengajuan", value:dataDummy.branchOfficeId},
        {code:"Nominal Pengajuan", value:dataDummy.applicationAmount},
        {code:"Jangka Waktu", value:dataDummy.applicationPeriod},
    ]

    const handleConfirm = (confirm) => {
        console.log(confirm);
        setShowModalConfirm(false);
        if(confirm) {
            patchNote((message) => {
                serMessageAlert(message);
                setTitle("Pemberitahuan");
            }, id);
        }
    }

    const handleCloseModal = () => {
        setShowModal(false);
        setShowModalConfirm(false);
    }

    const handleReject = (id) => {
        setTitle("Tolak Pengajuan Kredit")
        setShowModal(true)
    }

    const handleApprove = (id) => {
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
                        handleReject(dataDummy.id);
                    }}
                >
                    Tolak
                </Button>
                <Button
                    variant="success"
                    onClick={()=> {
                        handleApprove(dataDummy.id);
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