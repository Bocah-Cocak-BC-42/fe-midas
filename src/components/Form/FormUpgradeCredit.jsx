import React, { useEffect, useState } from 'react';
import { getDoc, postDoc, postUpgradeCredit, putUpgradeCredit } from '../../services/upgrade-credit';
import Button from '../Button';
import Download from '../Download';
import Input from '../Input/Input';
import Island from '../Island';

function FormUpgradeCredit(props) {
  const { data, showAlert } = props;
  const [messageValidationField, setMessageValidationField] = useState("");

  const [pathFile, setPathFile] = useState(null);
  useEffect(() => {
    if (data.dtoSubmission.financialStatementFile) {
      getDoc(
        (res) => setPathFile(res.path),
        data.dtoSubmission.financialStatementFile
      );
    }
  }, []);

  const handleSubmit = e => {
    e.preventDefault();

    const penghasilanPerBulan = e.currentTarget["penghasilan-perbulan"].value || "";
    const omsetUsahaTahunan = e.currentTarget["omset-usaha-tahunan"].value || "";
    const profitUsahaTahunan = e.currentTarget["profit-usaha-tahunan"].value || "";
    const laporanKeuangan = e.currentTarget["laporan-keuangan"].files[0];
    postDoc(
      (res) => {
        if (!data.dtoSubmission.id) {
          postUpgradeCredit(
            (resMessage) => showAlert(resMessage),
            (errors) => setMessageValidationField(errors),
            {
              monthlyIncome: parseInt(penghasilanPerBulan),
              annualBusinessGross: parseInt(omsetUsahaTahunan),
              profitBusinessGross: parseInt(profitUsahaTahunan),
              financialStatementFileId: res.data.fileId,
              notes: ""
            }
          );

        } else {
          putUpgradeCredit(
            (resMessage) => showAlert(resMessage),
            data.dtoSubmission.id,
            {
              monthlyIncome: parseInt(penghasilanPerBulan),
              annualBusinessGross: parseInt(omsetUsahaTahunan),
              profitBusinessGross: parseInt(profitUsahaTahunan),
              financialStatementFileId: res.data.fileId,
              notes: ""
            },
            (errors) => setMessageValidationField(errors)
          );
        }
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
          {
            !data.dtoSubmission.notes && !messageValidationField ?
              null
              :
              <span className={"p-2 w-fit bg-[#D37676] text-white rounded-md"}>{data.dtoSubmission.notes || messageValidationField}</span>
          }
          <Input
            type="number"
            placeholder="Masukkan nominal penghasilan per bulan"
            name="penghasilan-perbulan"
            defaultValue={data.dtoSubmission.monthlyIncome}
            onChange={() => handleNegativeNumber()}
            pattern="[0-9]*"
            required
            grow
          >Penghasilan Perbulan*</Input>
          <Input
            type="number"
            placeholder="Masukkan omset usaha per tahun"
            name="omset-usaha-tahunan"
            defaultValue={data.dtoSubmission.annualBusinessGross}
            onChange={() => handleNegativeNumber()}
            pattern="[0-9]*"
            required
            grow
          >Omset Tahunan*</Input>
          <Input
            type="number"
            placeholder="Masukkan profit usaha per tahun"
            name="profit-usaha-tahunan"
            defaultValue={data.dtoSubmission.profitBusinessGross}
            onChange={() => handleNegativeNumber()}
            pattern="[0-9]*"
            required
            grow
          >Profit Tahunan*</Input>

          <Input
            type="file"
            accept="application/pdf"
            placeholder="Masukkan laporan keuangan terbaru"
            name="laporan-keuangan"
            required
            grow
          >Laporan Keuangan*</Input>

          {
            !data.dtoSubmission.financialStatementFile ?
              null
              :
              <Download link={pathFile} name="Laporan Keuangan Sebelumnya" />
          }

          <div className="self-end">
            <Button type="submit">Ajukan</Button>
          </div>
        </form>
      </div>
    </Island>
  )
}

export default FormUpgradeCredit
