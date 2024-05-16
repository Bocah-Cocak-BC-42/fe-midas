import React from 'react'

function Submission({ data }) {
  return (
    <div className="flex flex-col gap-2">
      <span>Pengajuan Pertama</span>
      <div className="grid grid-cols-4 text-center">
        <span className="border-r">B0000001</span>
        <span className="border-x">04/04/2024</span>
        <span className="border-x">Pending</span>
        <span className="border-l">Edit</span>
      </div>
    </div>
  )
}

export default Submission
