import React from 'react'
import { ApproveUpgrade } from '../../services/upgrade-credit';
import Island from '../Island';
import Input from '../Input/Input';
import Download from '../Download';
import Button from '../Button';

function FormVerifyUpgradeCredit(props) {
    const {data, user, pathFile, showTolak} = props

    let rupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR"
        }).format(number).replace(",00", "");
      };

    const handleSubmit = e => {
        e.preventDefault();
        ApproveUpgrade(
            (messageAlert) => {
              console.log(messageAlert);
            }, { creditUpgradeId: data.id });
    } 
  return (
    <Island>
        <div className='m-4 p-4'>
            <form className='flex flex-col gap-4' onSubmit={e => handleSubmit(e)}>
            <div className="flex items-center gap-2">
                <label className="w-[150px]">
                    Penghasilan Bulanan
                </label>
                <span>{rupiah(data.monthlyIncome)}</span>
            </div>
            <div className="flex items-center gap-2">
                <label className="w-[150px]">
                    Omset Tahunan
                </label>
                <span>{rupiah(data.annualBusinessGross)}</span>
            </div>
            <div className="flex items-center gap-2">
                <label className="w-[150px]">
                    Profit Tahunan
                </label>
                <span>{rupiah(data.profitBusinessGross)}</span>
            </div>
            

            <Download link={pathFile} name="Laporan Keuangan" />

            {user.role == "Supervisor" ? 
            <Input
                type="number"
                defaultValue = {data.skorKredit}
                grow
                disabled
            >
            Skor Kredit
            </Input>
            : null}

            <div className="flex gap-2 self-end">
                    <Button type="submit">Setuju</Button>
                    <Button variant="danger" onClick={showTolak}>Tolak</Button>
                    </div>
            </form>
        </div>
    </Island>
  )
}

export default FormVerifyUpgradeCredit
