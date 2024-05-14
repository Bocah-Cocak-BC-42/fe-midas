import React, { useState } from 'react';
import { postDoc, postUpgradeCredit } from '../../services/upgrade-credit';
import Button from '../Button';
import Input from '../Input/Input';
import Island from '../Island';

function FormUpgradeCredit(props) {
  const { data, showAlert } = props;
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
            required
            grow
          >Penghasilan Perbulan*</Input>
          <Input
            type="number"
            placeholder="Masukkan omset usaha per tahun"
            name="omset-usaha-tahunan"
            message={messageValidationField?.Name}
            required
            grow
          >Omset Tahunan*</Input>
          <Input
            type="number"
            placeholder="Masukkan profit usaha per tahun"
            name="profit-usaha-tahunan"
            message={messageValidationField?.Name}
            required
            grow
          >Profit Tahunan*</Input>
          <Input
            type="file"
            accept="application/pdf,image/png,image/jpeg"
            placeholder="Masukkan laporan keuangan terbaru"
            name="laporan-keuangan"
            message={messageValidationField?.Name}
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
