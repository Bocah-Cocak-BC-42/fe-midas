import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import FormUpgradeCredit from '../../components/Form/FormUpgradeCredit';

function UpgradeCredit() {
  const [userRole, setUserRole] = useState("");
  useEffect(() => setUserRole(JSON.parse(Cookies.get("user"))), []);
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <Button
          icon="arrow-left"
          variant="danger"
          onClick={() => navigate(`/${userRole.toLowerCase()}/dashboard`)}
        >
          Kembali
        </Button>
      </div>
      <div className="my-4">
        <h1 className="text-2xl font-bold">Upgrade Credit</h1>
      </div>
      <FormUpgradeCredit />
    </div>
  )
}

export default UpgradeCredit
