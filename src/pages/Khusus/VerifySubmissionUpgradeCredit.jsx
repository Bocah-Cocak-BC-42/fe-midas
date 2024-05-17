import Cookies from 'js-cookie';
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getDoc, getUpgradeById, RejectUpgrade } from '../../services/upgrade-credit';
import TextArea from '../../components/Input/TextArea';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import FormVerifyUpgradeCredit from '../../components/Form/FormVerifyUpgradeCredit';

function VerifySubmissionUpgradeCredit() {
  const { id } = useParams();
  const [user, setUser] = useState("");
  const [dataUpgrade, setDataCredit] = useState({});
  const [pathFile, setPathFile] = useState("");
  const navigate = useNavigate();
  const [showModalTolak, setShowModalTolak] = useState(false);

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

  const handleCloseModal = () => {
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
            onClick={() => navigate(`/${user.role.toLowerCase()}/verifikasi-penarikan`)}
          >
            Kembali
          </Button>
        </div>

        <div className="my-4">
          <h1 className="text-2xl font-bold">Verifikasi Pengajuan Upgrade Credit</h1>
          <h2 className='text-lg mt-2'>{dataUpgrade.fullName} ( {dataUpgrade.creditUpgradeNumber} )</h2>
        </div>
        <FormVerifyUpgradeCredit data={dataUpgrade} user={user} pathFile={pathFile} showTolak={handleTolak} />
    </div>

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

export default VerifySubmissionUpgradeCredit
