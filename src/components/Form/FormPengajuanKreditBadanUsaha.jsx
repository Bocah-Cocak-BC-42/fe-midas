import { useState } from "react";
import Button from "../Button";
import Input from "../Input/Input";
import Select from "../Input/Select";

function FormPengajuanKreditBadanUsaha({ page }) {
  const [totalOwner, setTotalOwner] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();

    let npwpVal = e.target.npwp.value || null;
    let namaVal = e.target.nama.value || null;
    let badanUsahaVal = e.target.badanUsaha.value || null;
    let nikVal = e.target.nik1.value || null;
    let nipVal = e.target.nip1.value || null;
    let fullnameVal = e.target.fullname1.value || null;

    console.log(npwpVal);
    console.log(namaVal);
    console.log(badanUsahaVal);
    console.log(nikVal);
    console.log(nipVal);
    console.log(fullnameVal);
  };

  return (
    <>
      <form id="formPengajuanKreditBadanUsaha" onSubmit={handleSubmit}>
        <div className={`${page !== 1 && "hidden"}`}>
          <div className="flex flex-col gap-2 p-2 mb-4 border-2 rounded-lg shadow-lg">
            <Input
              placeholder="NPWP Badan Usaha"
              name="npwp"
              // required
              grow
            >
              NPWP
            </Input>
            <Input
              placeholder="Nama Badan Usaha"
              name="nama"
              // required
              grow
            >
              Nama
            </Input>
            <Select
              name="badanUsaha"
              handleChange={() => {}}
              options={[
                { id: "", name: "Pilih Jenis Badan Usaha" },
                { id: 1, name: "Badan Usaha 1" },
                { id: 2, name: "Badan Usaha 2" },
                { id: 3, name: "Badan Usaha 3" },
              ]}
              grow
            >
              Jenis Badan Usaha
            </Select>
          </div>
        </div>

        <div className={`${page !== 2 && "hidden"}`}>
          {[...Array(totalOwner)].map((x, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 p-2 mb-4 border-2 rounded-lg shadow-lg"
            >
              <h1 className="text-lg font-semibold">
                Pemilik / Pengurus {i + 1} Badan Usaha
              </h1>
              <Input
                placeholder="NIK Pemilik / Pengurus Badan Usaha"
                name={`nik${i}`}
                grow
              >
                NIK
              </Input>
              <Input
                placeholder="NIP Pemilik / Pengurus Badan Usaha"
                name={`nip${i}`}
                grow
              >
                NIP
              </Input>
              <Input
                placeholder="Nama Lengkap Pemilik / Pengurus Badan Usaha"
                name={`fullname${i}`}
                grow
              >
                Nama Lengkap
              </Input>
            </div>
          ))}

          <div className="flex justify-end gap-2 mb-4">
            <Button onClick={() => setTotalOwner(totalOwner + 1)}>+</Button>
            {totalOwner > 1 && (
              <Button
                onClick={() => setTotalOwner(totalOwner - 1)}
                variant="danger"
              >
                -
              </Button>
            )}
          </div>
        </div>

        <div className={`${page !== 3 && "hidden"}`}>
          <div>badan usaha 3</div>
        </div>

        <div className={`${page !== 4 && "hidden"}`}>
          <div>badan usaha 4</div>
        </div>
      </form>
    </>
  );
}

export default FormPengajuanKreditBadanUsaha;
