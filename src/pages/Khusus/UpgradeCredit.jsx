import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/Button';
import FormUpgradeCredit from '../../components/Form/FormUpgradeCredit';
import TextArea from '../../components/Input/TextArea';
import Modal from '../../components/Modal';

function UpgradeCredit() {
  const [user, setUser] = useState("");
  const { id } = useParams();
  const [dataUpgrade, setDataCredit] = useState({});

  useEffect(() => {
    setUser(JSON.parse(Cookies.get("user")))
  }, []);

  const navigate = useNavigate();
  const [showModalAlert, setShowModalAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState("");

  const handleShowAlert = (message) => {
    setMessageAlert(message);
    setShowModalAlert(true);
  };

  const handleCloseModal = () => {
    setShowModalAlert(false);
  };

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
        <FormUpgradeCredit data={user} showAlert={handleShowAlert} />
      </div>

      <Modal
        onClose={() => handleCloseModal()}
        visible={showModalAlert}
        title="Pemberitahuan"
      >
        {messageAlert}
      </Modal>
    </>
  )
}

export default UpgradeCredit
