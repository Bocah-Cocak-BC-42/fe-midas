import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';

function Submission({ data, index }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-2">
      <span>Pengajuan ke-{index + 1}</span>
      <div className="grid grid-cols-[auto_auto_auto_auto] text-center">
        <span className="border-r">{data.creditUpgradeNumber}</span>
        <span className="border-x">{data.createdAt.split('T')[0]}</span>
        <span className="border-x">{data.status}</span>
        <div className="">
          <Button
            variant="warning"
            onClick={() => navigate("/nasabah/upgradecredit/" + data.creditUpgradeNumber)}
          >Edit</Button>
        </div>
      </div>
    </div>
  )
}

export default Submission
