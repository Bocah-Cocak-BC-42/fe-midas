import React from 'react'
import Button from '../Button'
import Input from '../Input/Input'
import Island from '../Island'

function FormUpgradeCredit() {
  return (
    <Island>
      <div className="m-4 p-4">
        <form
          className="flex flex-col gap-4"
          onSubmit={() => { }}
        >
          <Input
            type="number"
            placeholder="Masukkan nominal penghasilan per bulan"
            name="penghasilan-perbulan"
            required
            grow
          >Penghasilan Perbulan*</Input>
          <Input
            type="number"
            placeholder="Masukkan omset usaha per tahun"
            name="omset-usaha-tahunan"
            required
            grow
          >Omset Tahunan*</Input>
          <Input
            type="number"
            placeholder="Masukkan profit usaha per tahun"
            name="profit-usaha-tahunan"
            required
            grow
          >Profit Tahunan*</Input>
          <Input
            type="file"
            accept="application/pdf,image/png,image/jpeg"
            placeholder="Masukkan laporan keuangan terbaru"
            name="laporan-keuangan"
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
