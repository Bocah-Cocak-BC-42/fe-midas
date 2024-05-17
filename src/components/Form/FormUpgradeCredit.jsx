import React, { useState } from 'react';
import { ApproveUpgrade, postDoc, postUpgradeCredit } from '../../services/upgrade-credit';
import Button from '../Button';
import Download from '../Download';
import Input from '../Input/Input';
import Island from '../Island';

function FormUpgradeCredit(props) {
  const { data, dataNasabah, showAlert } = props;
  const [messageValidationField, setMessageValidationField] = useState({});

  const handleSubmit = e => {
    e.preventDefault();

      const penghasilanPerBulan = e.currentTarget["penghasilan-perbulan"].value || "";
      const omsetUsahaTahunan = e.currentTarget["omset-usaha-tahunan"].value || "";
      const profitUsahaTahunan = e.currentTarget["profit-usaha-tahunan"].value || "";
      const laporanKeuangan = e.currentTarget["laporan-keuangan"].files[0];
      postDoc(
        (res) => {
          postUpgradeCredit(
            (resMessage) => {
              showAlert(resMessage);
            },
            (errors) => {
              setMessageValidationField(errors);
            },
            {
              monthlyIncome: parseInt(penghasilanPerBulan),
              annualBusinessGross: parseInt(omsetUsahaTahunan),
              profitBusinessGross: parseInt(profitUsahaTahunan),
              financialStatementFileId: res.data.fileId,
              notes: ""
            }
          );
        },
        (errors) => setMessageValidationField(errors),
        {
          File: laporanKeuangan,
          FileCategory: "LaporanKeuangan",
        }
      );
  };

  const handleNegativeNumber = (num) => {


    return num
  };

  return (
    <Island>
      <div className="m-4 p-4">
        <form
          className="flex flex-col gap-4"
          onSubmit={e => handleSubmit(e)}
        >
          <Input
            type="number"
            placeholder="Masukkan nominal penghasilan per bulan"
            name="penghasilan-perbulan"
            message={messageValidationField?.Name}
            defaultValue={dataNasabah?.monthlyIncome}
            onChange={() => { }}
            pattern="[0-9]*"
            required
            grow
          >Penghasilan Perbulan*</Input>
          <Input
            type="number"
            placeholder="Masukkan omset usaha per tahun"
            name="omset-usaha-tahunan"
            message={messageValidationField?.Name}
            defaultValue={dataNasabah?.annualBusinessGross}
            onChange={() => { }}
            pattern="[0-9]*"
            required
            grow
          >Omset Tahunan*</Input>
          <Input
            type="number"
            placeholder="Masukkan profit usaha per tahun"
            name="profit-usaha-tahunan"
            message={messageValidationField?.Name}
            defaultValue={dataNasabah?.profitBusinessGross}
            onChange={() => { }}
            pattern="[0-9]*"
            required
            grow
          >Profit Tahunan*</Input>

            <Input
              type="file"
              accept="application/pdf"
              placeholder="Masukkan laporan keuangan terbaru"
              name="laporan-keuangan"
              message={messageValidationField?.Name}
              defaultValue={dataNasabah?.financialStatementFile}
              required
              grow
            >Laporan Keuangan*</Input>
          
            <div className="self-end">
              <Button type="submit">Ajukan</Button>
            </div>
        </form>
      </div>
    </Island>
  )
}

export default FormUpgradeCredit
