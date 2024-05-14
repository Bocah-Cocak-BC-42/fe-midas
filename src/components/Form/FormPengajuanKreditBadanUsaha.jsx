import { useState } from "react";
import Button from "../Button";
import Input from "../Input/Input";
import Select from "../Input/Select";
// import { useForm } from "react-hook-form";

function FormPengajuanKreditBadanUsaha({ page }) {
  const [totalOwner, setTotalOwner] = useState(2);
  const [totalAset, setTotalAset] = useState(1);
  const [defaultValues, setDefaultValues] = useState({
    npwp: "",
    companyName: "",
    companyType: "",
    placeOfEstasblishment: "",
    establishRegistrationNumber: "",
    nib: "",
    date: "",
    email: "",
    noTelpBadanUsaha: "",
    alamat: "",
    provinsi: "",
    kabupaten: "",
    kelurahan: "",
    kodePos: "",
    dataPemilik: [
      {
        nik: "",
        nip: "",
        fullname: "",
        jabatan: "",
        noTelp: "",
      },
      {
        nik: "",
        nip: "",
        fullname: "",
        jabatan: "",
        noTelp: "",
      },
    ],
    dataAset: [
      {
        namaAset: "",
        nilaiAset: "",
      },
    ],
    kantorCabang: "",
    nominal: "",
    jangkaWaktu: "",
    aktaFile: "",
    nibFile: "",
    npwpFile: "",
    ktpFile: "",
    susunanPengurusFile: "",
    laporanFile: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(defaultValues);
  };

  const onChangeInput = (value, name) => {
    setDefaultValues({ ...defaultValues, [name]: value });
  };
  const onChangeInputPemilik = (value, name, i) => {
    let defVal = { ...defaultValues };
    let dataPemilik = [...defVal.dataPemilik];
    dataPemilik[i][name] = value;
  };

  const onChangeInputAset = (value, name, i) => {
    let defVal = { ...defaultValues };
    let dataAset = [...defVal.dataAset];
    dataAset[i][name] = value;
    // setValue(name, value);
  };

  const handlePlusOwner = () => {
    setTotalOwner(totalOwner + 1);

    let dataPemilik = defaultValues.dataPemilik;
    dataPemilik.push({
      nik: "",
      nip: "",
      fullname: "",
      jabatan: "",
      noTelp: "",
    });
    setDefaultValues({ ...defaultValues, dataPemilik });
  };

  const handlePlusAset = () => {
    setTotalAset(totalAset + 1);

    let dataAset = defaultValues.dataAset;
    dataAset.push({
      namaAset: "",
      nilaiAset: "",
    });
    setDefaultValues({ ...defaultValues, dataAset });
  };

  const handleMinOwner = () => {
    setTotalOwner(totalOwner - 1);

    let dataPemilik = defaultValues.dataPemilik;
    dataPemilik.pop();
    setDefaultValues({ ...defaultValues, dataPemilik });
  };
  const handleMinAset = () => {
    setTotalAset(totalAset - 1);

    let dataAset = defaultValues.assets;
    dataAset.pop();
    setDefaultValues({ ...defaultValues, dataAset });
  };

  return (
    <>
      <form id="formPengajuanKreditBadanUsaha" onSubmit={onSubmit}>
        <div className={`${page !== 1 && "hidden"}`}>
          <div className="flex flex-col gap-2 p-2 mb-4 border-2 rounded-lg shadow-lg">
            <Input
              placeholder="NPWP Badan Usaha"
              // defaultValue={watch("npwp")}
              name="npwp"
              onChange={(e) => onChangeInput(e.target.value, "npwp")}
              // required
              grow
            >
              NPWP
            </Input>
            <Input
              placeholder="Nama Badan Usaha"
              // defaultValue={watch("nama")}
              name="companyName"
              onChange={(e) => onChangeInput(e.target.value, "companyName")}
              // required
              grow
            >
              Nama
            </Input>
            <Select
              name="companyType"
              handleChange={(val) => onChangeInput(val, "companyType")}
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
            <Input
              placeholder="Tempat Pendirian Badan Usaha"
              // defaultValue={watch("placeOfEstasblishment")}
              name="placeOfEstasblishment"
              onChange={(e) => onChangeInput(e.target.value, "placeOfEstasblishment")}
              // required
              grow
            >
              Tempat Pendirian
            </Input>
            <Input
              placeholder="No. Akta Pendirian Badan Usaha"
              onChange={(e) => onChangeInput(e.target.value, "establishRegistrationNumber")}
              name="establishRegistrationNumber"
              // required
              grow
            >
              No. Akta Pendirian
            </Input>
            <Input
              type="date"
              // value={date}
              placeholder="DD/MM/YY"
              onChange={(e) => onChangeInput(e.target.value, "date")}
              grow
            >
              Tanggal Akta Pendirian
            </Input>
            <Input
              placeholder="Nomor Induk Berusaha"
              // defaultValue={watch("nib")}
              name="nib"
              onChange={(e) => onChangeInput(e.target.value, "nib")}
              // required
              grow
            >
              NIB
            </Input>
            <Input
              placeholder="Email Badan Usaha"
              // defaultValue={watch("email")}
              name="email"
              onChange={(e) => onChangeInput(e.target.value, "email")}
              // required
              grow
              // message={errors.email?.message}
            >
              Email
            </Input>

            <Input
              placeholder="Nomor Telepon Badan Usaha"
              // defaultValue={watch("noTelpBadanUsaha")}
              name="noTelpBadanUsaha"
              onChange={(e) =>
                onChangeInput(e.target.value, "noTelpBadanUsaha")
              }
              // required
              grow
            >
              No. Telp
            </Input>
            <Input
              placeholder="Alamat Badan Usaha"
              // defaultValue={watch("alamat")}
              name="alamat"
              onChange={(e) => onChangeInput(e.target.value, "alamat")}
              grow
            >
              Alamat Badan Usaha
            </Input>
            <Select
              // defaultValue={watch("provinsi")}
              // onChange={(e) => onChangeInput(e.target.value, "provinsi")}
              name="provinsi"
              handleChange={(val) => onChangeInput(val, "provinsi")}
              options={[
                { id: "", name: "Pilih Provinsi Badan Usaha" },
                { id: 1, name: "Nusa Tenggara Barat" },
                { id: 2, name: "Bali" },
                { id: 3, name: "Jawa Barat" },
              ]}
              grow
            >
              Provinsi Badan Usaha
            </Select>
            <Select
              // defaultValue={watch("kabupaten")}
              // onChange={(e) => onChangeInput(e.target.value, "kabupaten")}
              name="kabupaten"
              handleChange={(val) => onChangeInput(val, "kabupaten")}
              options={[
                { id: "", name: "Pilih Kabupaten/Kota Badan Usaha" },
                { id: 1, name: "Lombok Barat" },
                { id: 2, name: "Lombok Timur" },
                { id: 3, name: "Lombok Tengah" },
              ]}
              grow
            >
              Kabupaten/Kota Badan Usaha
            </Select>
            <Select
              // defaultValue={watch("kelurahan")}
              // onChange={(e) => onChangeInput(e.target.value, "kelurahan")}
              name="kelurahan"
              handleChange={(val) => onChangeInput(val, "kelurahan")}
              options={[
                { id: "", name: "Pilih Kelurahan Badan Usaha" },
                { id: 1, name: "Turida" },
                { id: 2, name: "Lombok Timur" },
                { id: 3, name: "Lombok Tengah" },
              ]}
              grow
            >
              Kabupaten/Kota Badan Usaha
            </Select>
            <Input
              placeholder="Kode Pos Badan Usaha"
              // defaultValue={watch("kodePos")}
              name="kodePos"
              onChange={(e) => onChangeInput(e.target.value, "kodePos")}
              grow
            >
              Kode Pos Badan Usaha
            </Input>
          </div>
        </div>

        <div className={`${page !== 2 && "hidden"}`}>
          <h1 className="text-red-600">
            *Note: Jika terdapat lebih dari dua pemilik/pengurus badan usaha
            anda dapat menambahkannya dengan klik tombol +
          </h1>
          <h1 className="text-red-600">
            *Note: Jika terdapat hanya satu pemilik/pengurus badan usaha. Anda
            dapat mengisi satu form saja.
          </h1>
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
                // defaultValue={watch(`dataPemilik.${i}.nik`)}
                onChange={(e) => onChangeInputPemilik(e.target.value, `nik`, i)}
                // name={`nik${i}`}
                grow
              >
                NIK
              </Input>
              <Input
                placeholder="NIP Pemilik / Pengurus Badan Usaha"
                // defaultValue={watch(`dataPemilik.${i}.nip`)}
                onChange={(e) => onChangeInputPemilik(e.target.value, `nip`, i)}
                name={`nip${i}`}
                grow
              >
                NIP
              </Input>
              <Input
                placeholder="Nama Lengkap Pemilik / Pengurus Badan Usaha"
                // defaultValue={watch(`dataPemilik.${i}.fullname`)}
                onChange={(e) =>
                  onChangeInputPemilik(e.target.value, `fullname`, i)
                }
                name={`fullname${i}`}
                grow
              >
                Nama Lengkap
              </Input>
              <Input
                placeholder="Jabatan Dalam Badan Usaha"
                // defaultValue={watch(`dataPemilik.${i}.jabatan`)}
                onChange={(e) =>
                  onChangeInputPemilik(e.target.value, `jabatan`, i)
                }
                name={`jabatan${i}`}
                grow
              >
                Jabatan Dalam Badan Usaha
              </Input>
              <Input
                placeholder="Nomor Telepon Badan Usaha"
                // defaultValue={watch(`dataPemilik.${i}.noTelp`)}
                onChange={(e) =>
                  onChangeInputPemilik(e.target.value, `noTelp`, i)
                }
                name={`noTelp${i}`}
                grow
              >
                Nomor Telepon Badan Usaha
              </Input>
            </div>
          ))}

          <div className="flex justify-end gap-2 mb-4">
            <Button onClick={handlePlusOwner}>+</Button>
            {totalOwner > 2 && (
              <Button onClick={handleMinOwner} variant="danger">
                -
              </Button>
            )}
          </div>
        </div>

        <div className={`${page !== 3 && "hidden"}`}>
          <h1 className="text-red-600">
            *Note: Jika terdapat lebih dari satu aset perusahaan. Anda dapat
            menambahkannya dengan klik tombol +
          </h1>
          <h1 className="text-red-600">
            *Note: Jika terdapat hanya satu aset perusahaan. Anda dapat mengisi
            satu form saja.
          </h1>
          {[...Array(totalAset)].map((x, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 p-2 mb-4 border-2 rounded-lg shadow-lg"
            >
              <h1 className="text-lg font-semibold">Aset Perusahaan {i + 1}</h1>
              <Input
                placeholder="Nama Aset Perusahaan"
                // defaultValue={watch(`namaAset${i}`)}
                onChange={(e) =>
                  onChangeInputAset(e.target.value, `namaAset`, i)
                }
                name={`namaAset${i}`}
                grow
              >
                Aset Perusahaan*
              </Input>
              <Input
                placeholder="Nilai Aset Perusahaan"
                type="number"
                // value={"number"}
                // defaultValue={watch(`nilaiAset${i}`)}
                onChange={(e) =>
                  onChangeInputAset(e.target.value, `nilaiAset`, i)
                }
                name={`nilaiAset${i}`}
                grow
              >
                Nilai Aset*
              </Input>
            </div>
          ))}

          <div className="flex justify-end gap-2 mb-4">
            <Button onClick={handlePlusAset}>+</Button>
            {totalAset > 1 && (
              <Button onClick={handleMinAset} variant="danger">
                -
              </Button>
            )}
          </div>
        </div>

        <div className={`${page !== 4 && "hidden"}`}>
          <div className="flex flex-col gap-2 p-2 mb-4 border-2 rounded-lg shadow-lg">
            <Select
              // defaultValue={watch("kantorCabang")}
              // onChange={(e) => onChangeInput(e.target.value, "kantorCabang")}
              name="kantorCabang"
              handleChange={(val) => onChangeInput(val, "kantorCabang")}
              options={[
                { id: "", name: "Pilih Kantor Cabang Pengajuan Anda" },
                { id: 1, name: "Turida" },
                { id: 2, name: "Lombok Timur" },
                { id: 3, name: "Lombok Tengah" },
              ]}
              grow
            >
              Kantor Cabang Pengajuan*
            </Select>
            <Input
              type="number"
              placeholder="Nominal Pengajuan Anda"
              // defaultValue={watch("nominal")}
              onChange={(e) => onChangeInput(e.target.value, "nominal")}
              name="nominal"
              grow
            >
              Nominal Pengajuan*
            </Input>
            <Input
              placeholder="Jangka Waktu Pengajuan Anda"
              // defaultValue={watch("jangkaWaktu")}
              onChange={(e) => onChangeInput(e.target.value, "jangkaWaktu")}
              name="jangkaWaktu"
              grow
            >
              Jangka Waktu Pengajuan*
            </Input>
            <Input
              type="file"
              placeholder="Akta Pendirian"
              // defaultValue={watch("akta")}
              onChange={(e) => onChangeInput(e.target.value, "aktaFile")}
              name="akta"
              grow
            >
              Akta Pendirian*
            </Input>
            <Input
              type="file"
              placeholder="Nomor Induk Berusaha"
              // defaultValue={watch("nib")}
              onChange={(e) => onChangeInput(e.target.value, "nibFile")}
              name="nib"
              grow
            >
              Nomor Induk Berusaha*
            </Input>
            <Input
              type="file"
              placeholder="NPWP Perusahaan"
              // defaultValue={watch("npwpPerusahaan")}
              onChange={(e) => onChangeInput(e.target.value, "npwpFile")}
              name="npwpPerusahaan"
              grow
            >
              NPWP Perusahaan*
            </Input>
            <Input
              type="file"
              placeholder="Kartu Tanda Penduduk"
              // defaultValue={watch("ktp")}
              onChange={(e) => onChangeInput(e.target.value, "ktpFile")}
              name="ktp"
              grow
            >
              Kartu Tanda Penduduk*
            </Input>
            <Input
              type="file"
              placeholder="Susunan Pengurus"
              // defaultValue={watch("susunanPengurus")}
              onChange={(e) =>
                onChangeInput(e.target.value, "susunanPengurusFile")
              }
              name="susunanPengurus"
              grow
            >
              Susunan Pengurus*
            </Input>
            <Input
              type="file"
              placeholder="Laporan Keuangan Terbaru"
              // defaultValue={watch("laporan")}
              onChange={(e) => onChangeInput(e.target.value, "laporanFile")}
              name="laporan"
              grow
            >
              Laporan Keuangan Terbaru*
            </Input>
          </div>
        </div>
      </form>
    </>
  );
}

export default FormPengajuanKreditBadanUsaha;
