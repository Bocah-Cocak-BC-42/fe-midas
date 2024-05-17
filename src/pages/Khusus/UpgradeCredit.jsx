import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import FormUpgradeCredit from '../../components/Form/FormUpgradeCredit';
import Modal from '../../components/Modal';

function UpgradeCredit() {
  const searchParams = new URLSearchParams(window.location.search);
  const [user, setUser] = useState("");

  useEffect(() => { setUser(JSON.parse(Cookies.get("user"))) }, []);

  const navigate = useNavigate();
  const [showModalAlert, setShowModalAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState("");

  const handleShowAlert = (message) => {
    setMessageAlert(message);
    setShowModalAlert(true);
  };

  const handleCloseModal = () => {
    setShowModalAlert(false);
    navigate(`/nasabah/dashboard`);
  };

  return (
    <>
      <div>
        <div>
          <Button
            icon="arrow-left"
            variant="danger"
            onClick={() => navigate(`/nasabah/dashboard`)}
          >
            Kembali
          </Button>
        </div>
        <div className="my-4">
          <h1 className="text-2xl font-bold">Pengajuan Upgrade Credit</h1>
        </div>
        <FormUpgradeCredit data={{
          user: user,
          dtoSubmission: {
            id: searchParams.get("id"),
            monthlyIncome: searchParams.get("monthlyIncome"),
            annualBusinessGross: searchParams.get("annualBusinessGross"),
            profitBusinessGross: searchParams.get("profitBusinessGross"),
            financialStatementFile: searchParams.get("financialStatementFile"),
            notes: searchParams.get("notes"),
          }
        }} showAlert={handleShowAlert} />
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
