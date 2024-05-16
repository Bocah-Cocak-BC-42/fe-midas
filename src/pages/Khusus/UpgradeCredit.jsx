import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/Button';
import FormUpgradeCredit from '../../components/Form/FormUpgradeCredit';
import TextArea from '../../components/Input/TextArea';
import Modal from '../../components/Modal';
import { RejectUpgrade, getDoc, getUpgradeById } from '../../services/upgrade-credit';

function UpgradeCredit() {
  const [user, setUser] = useState("");
  const { id } = useParams();
  const [dataUpgrade, setDataCredit] = useState({});
  const [pathFile, setPathFile] = useState("");

  useEffect(() => {
    setUser(JSON.parse(Cookies.get("user")))
    if (id) {
      getUpgradeById(
        (res) => {
          getDoc(
            (res) => {
              setPathFile(res.path);
            },
            res.financialStatementFile
          )
          setDataCredit(res);
        },
        id
      );
    }
  }, []);

  const navigate = useNavigate();
  const [showModalTolak, setShowModalTolak] = useState(false);
  const [showModalAlert, setShowModalAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState("");

  const handleShowAlert = (message) => {
    setMessageAlert(message);
    setShowModalAlert(true);
  };

  const handleCloseModal = () => {
    setShowModalAlert(false);
    setShowModalTolak(false);
  };

  const handleTolak = () => {
    setShowModalTolak(true);
  }

  const handleSubmitTolak = (e) => {
    e.preventDefault();
    setShowModalTolak(false);

    const catatanPenolakan = e.currentTarget["catatan-penolakan"].value || "";

    RejectUpgrade(
      (messageAlert) => {
        console.log(messageAlert);
      }, { creditUpgradeId: dataUpgrade.id, notes: catatanPenolakan });
  }

  return (
    <>
      <div>
        <div>
          <Button
            icon="arrow-left"
            variant="danger"
            onClick={() => navigate(`/${user.role.toLowerCase()}/dashboard`)}
          >
            Kembali
          </Button>
        </div>
        <div className="my-4">
          <h1 className="text-2xl font-bold">{user.role === "Nasabah" ? "Upgrade Credit" : "Pengajuan Upgrade Credit"}</h1>
          <h2 className='text-lg mt-2'>{dataUpgrade?.fullName}</h2>
        </div>
        <FormUpgradeCredit data={user} dataNasabah={dataUpgrade} pathFile={pathFile} showAlert={handleShowAlert} showTolak={handleTolak} />
      </div>

      <Modal
        onClose={() => handleCloseModal()}
        visible={showModalAlert}
        title="Pemberitahuan"
      >
        {messageAlert}
      </Modal>

      <Modal
        onClose={() => handleCloseModal()}
        visible={showModalTolak}
        title="Catatan Penolakan"
        form="form-catatan-penolakan"
      >
        <form
          id='form-catatan-penolakan'
          onSubmit={handleSubmitTolak}>
          <TextArea placeholder="Masukkan Catatan Penolakan"
            name="catatan-penolakan"
            required
            rows="10"
            cols="50"
            noresize
          >
            Note
          </TextArea>
        </form>
      </Modal>
    </>
  )
}

export default UpgradeCredit
