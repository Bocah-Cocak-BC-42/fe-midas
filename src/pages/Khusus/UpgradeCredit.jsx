import React from 'react'
import Button from '../../components/Button'
import FormUpgradeCredit from '../../components/Form/FormUpgradeCredit'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function UpgradeCredit() {
  const navigate = useNavigate();
  const user = JSON.parse(Cookies.get("user") ?? null);

  return (
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
        <h1 className="text-2xl font-bold">Upgrade Credit</h1>
      </div>
      <FormUpgradeCredit />
    </div>
  )
}

export default UpgradeCredit
