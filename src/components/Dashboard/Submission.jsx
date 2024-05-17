import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';

function Submission({ data, index }) {
  const navigate = useNavigate();

  const searchParams = new URLSearchParams();
  searchParams.append("id", data.id);
  searchParams.append("monthlyIncome", data.monthlyIncome);
  searchParams.append("annualBusinessGross", data.annualBusinessGross);
  searchParams.append("profitBusinessGross", data.profitBusinessGross);
  searchParams.append("financialStatementFile", data.financialStatementFile);
  searchParams.append("notes", data.notes);

  return (
    <div className="flex flex-col gap-2">
      <span>Pengajuan ke-{index + 1}</span>
      <div className="grid grid-cols-4 text-center">
        <span className="border-r">{data.creditUpgradeNumber}</span>
        <span className="border-x">{data.createdAt.split('T')[0]}</span>
        <span className="border-x">{data.status}</span>
        <div className="">
          {
            data.status !== "Rejected" ?
              <button
                className="bg-gray-200 rounded-md p-1 px-2 text-white"
                disabled={true}
              >Edit</button>
              :
              <Button
                variant="warning"
                onClick={() => navigate("/nasabah/upgradecredit?" + searchParams.toString())}
                disabled={true}
              >Edit</Button>
          }
        </div>
      </div>
    </div>
  )
}

export default Submission
