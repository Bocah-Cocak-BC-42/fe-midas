import { useState } from "react";
import Button from "../Button";
import Input from "../Input/Input";
import Select from "../Input/Select";
import { useForm } from "react-hook-form";

function FormPengajuanKreditBadanUsaha({ page }) {
  const [totalOwner, setTotalOwner] = useState(1);
  const [totalAset, setTotalAset] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();

    let npwpVal = e.target.npwp.value || null;
    let namaVal = e.target.nama.value || null;
    let badanUsahaVal = e.target.badanUsaha.value || null;
    let nikVal = e.target.nik1.value || null;
    let nipVal = e.target.nip1.value || null;
    let fullnameVal = e.target.fullname1.value || null;
    let jabatanVal = e.target.value.jabatan.value || null;
    let noTelpVal = e.target.value.noTelpVal.value || null;

    console.log(npwpVal);
    console.log(namaVal);
    console.log(badanUsahaVal);
    console.log(nikVal);
    console.log(nipVal);
    console.log(fullnameVal);
    console.log(jabatanVal);
    console.log(noTelpVal);
  };
  const { setValue, watch, formState: { errors }} = useForm({
    defaultValues: {
      npwp: '',
      nama: '',
      jenisBadanUsaha: '',
      tempatPendirian:'',
      nib: '',
      email: '',
      noTelpBadanUsaha: '',
      alamat: '',
      provinsi: '',
      kabupaten: '',
      kelurahan: '',
      kodePos: '',

      
    }
  });
  const [date, setDate] = useState("");
  const onChangeInput = (value, name) => {
    setValue(name, value);
  }

  return (
    <>
      <form id="formPengajuanKreditBadanUsaha" onSubmit={handleSubmit}>
        <div className={`${page !== 1 && "hidden"}`}>
          <div className="flex flex-col gap-2 p-2 mb-4 border-2 rounded-lg shadow-lg">
            <Input
              placeholder="NPWP Badan Usaha"
              defaultValue={watch('npwp')}
              name="npwp"
              onChange = {(e) => onChangeInput(e.target.value, 'npwp')}
              // required
              grow
            >
              NPWP
            </Input>
            <Input
              placeholder="Nama Badan Usaha"
              defaultValue={watch('nama')}
              name="nama"
              onChange = {(e) => onChangeInput(e.target.value, 'nama')}
              // required
              grow
            >
              Nama
            </Input>
            <Select
              name="jenisBadanUsaha"
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
            <Input
              placeholder="Tempat Pendirian Badan Usaha"
              defaultValue={watch('tempatPendirian')}
              name="tempatPendirian"
              onChange = {(e) => onChangeInput(e.target.value, 'tempatPendirian')}
              // required
              grow
            >
              Tempat Pendirian
            </Input>
            <Input
              placeholder="No. Akta Pendirian Badan Usaha"
              name="noAktaPendirian"
              // required
              grow
            >
              No. Akta Pendirian
            </Input>
            <Input
              type="date"
              value={date}
              placeholder="DD/MM/YY"
              onChange={(e) => setDate(e.target.value)}
              grow
              >
                Tanggal Akta Pendirian
            </Input>
            <Input
            placeholder = "Nomor Induk Berusaha"
            defaultValue={watch('nib')}
            name="nib"
            onChange={(e) => onChangeInput(e.target.value, 'nib')}
            // required
            grow
            >
              NIB
            </Input>
            <Input
            placeholder="Email Badan Usaha"
            defaultValue = {watch('email')}
            name="email"
            onChange = {(e) => onChangeInput(e.target.value, 'email')}
            // required
            grow
            >
              Email
            </Input>
            <span className='text-red-600'>{errors.email?.message}</span>
            <Input
            placeholder="Nomor Telepon Badan Usaha"
            defaultValue = {watch('noTelpBadanUsaha')}
            name="noTelpBadanUsaha"
            onChange = {(e) => onChangeInput(e.target.value, 'noTelpBadanUsaha')}
            required
            grow
            >
              No. Telp
            </Input>
            <Input
            placeholder="Alamat Badan Usaha"
            defaultValue = {watch('alamat')}
            name="alamat"
            onChange = {(e) => onChangeInput(e.target.value, 'alamat')}
            grow
            >
              Alamat Badan Usaha
            </Input>
            <Select
              defaultValue = {watch('provinsi')}
              onChange = {(e) => onChangeInput(e.target.value, 'provinsi')}
              name="provinsi"
              handleChange={() => {}}
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
              defaultValue = {watch('kabupaten')}
              onChange = {(e) => onChangeInput(e.target.value, 'kabupaten')}
              name="kabupaten"
              handleChange={() => {}}
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
              defaultValue = {watch('kelurahan')}
              onChange = {(e) => onChangeInput(e.target.value, 'kelurahan')}
              name="keluharan"
              handleChange={() => {}}
              options={[
                { id: "", name: "Pilih Keluharan Badan Usaha" },
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
            defaultValue = {watch('kodePos')}
            name="kodePos"
            onChange = {(e) => onChangeInput(e.target.value, 'kodePos')}
            grow
            >
              Kode Pos Badan Usaha
            </Input>
          </div>
        </div>

        <div className={`${page !== 2 && "hidden"}`}>
          <h1 className="text-red-600">
            *Note: Jika terdapat lebih dari dua pemilik/pengurus badan usaha anda dapat menambahkannya dengan klik tombol +
          </h1>
          <h1 className="text-red-600">
            *Note: Jika terdapat hanya satu pemilik/pengurus badan usaha. Anda dapat mengisi satu form saja.
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
                defaultValue = {watch('nik')}
                onChange = {(e) => onChangeInput(e.target.value, 'nik')}
                name={`nik${i}`}
                grow
              >
                NIK
              </Input>
              <Input
                placeholder="NIP Pemilik / Pengurus Badan Usaha"
                defaultValue = {watch('nip')}
                onChange = {(e) => onChangeInput(e.target.value, 'nip')}
                name={`nip${i}`}
                grow
              >
                NIP
              </Input>
              <Input
                placeholder="Nama Lengkap Pemilik / Pengurus Badan Usaha"
                defaultValue = {watch('fullname')}
                onChange = {(e) => onChangeInput(e.target.value, 'fullname')}
                name={`fullname${i}`}
                grow
              >
                Nama Lengkap
              </Input>
              <Input
                placeholder="Jabatan Dalam Badan Usaha"
                defaultValue = {watch('jabatan')}
                onChange = {(e) => onChangeInput(e.target.value, 'jabatan')}
                name={`jabatan${i}`}
                grow
              >
                Jabatan Dalam Badan Usaha
              </Input>
              <Input
                placeholder="Nomor Telepon Badan Usaha"
                defaultValue = {watch('noTelp')}
                onChange = {(e) => onChangeInput(e.target.value, 'noTelp')}
                name={`noTelp${i}`}
                grow
              >
                Nomor Telepon Badan Usaha
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
        <h1 className="text-red-600">
            *Note: Jika terdapat lebih dari satu aset perusahaan. Anda dapat menambahkannya dengan klik tombol +
          </h1>
          <h1 className="text-red-600">
            *Note: Jika terdapat hanya satu aset perusahaan. Anda dapat mengisi satu form saja.
          </h1>
          {[...Array(totalAset)].map((x, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 p-2 mb-4 border-2 rounded-lg shadow-lg"
            >
              <h1 className="text-lg font-semibold">
                Aset Perusahaan {i + 1}
              </h1>
              <Input
                placeholder="Nama Aset Perusahaan"
                defaultValue = {watch('namaAset')}
                onChange = {(e) => onChangeInput(e.target.value, 'namaAset')}
                name={`namaAset${i}`}
                grow
              >
                Aset Perusahaan*
              </Input>
              <Input
                placeholder="Nilai Aset Perusahaan"
                type="number"
                value={"number"}
                defaultValue = {watch('nilaiAset')}
                onChange = {(e) => onChangeInput(e.target.value, 'nilaiAset')}
                name={`nilaiAset${i}`}
                grow
              >
                Nilai Aset*
              </Input>
            </div>
          ))}

          <div className="flex justify-end gap-2 mb-4">
            <Button onClick={() => setTotalAset(totalAset + 1)}>+</Button>
            {totalAset > 1 && (
              <Button
                onClick={() => setTotalAset(totalAset - 1)}
                variant="danger"
              >
                -
              </Button>
            )}
          </div>
        </div>

        <div className={`${page !== 4 && "hidden"}`}>
          {[...Array(totalOwner)].map((x, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 p-2 mb-4 border-2 rounded-lg shadow-lg"
            >
              <Select
              defaultValue = {watch('kantorCabang')}
              onChange = {(e) => onChangeInput(e.target.value, 'kantorCabang')}
              name="kantorCabang"
              handleChange={() => {}}
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
                defaultValue = {watch('nominal')}
                onChange = {(e) => onChangeInput(e.target.value, 'nominal')}
                name={`nominal${i}`}
                grow
              >
                Nominal Pengajuan*
              </Input>
              <Input
                placeholder="Jangka Waktu Pengajuan Anda"
                defaultValue = {watch('jangkaWaktu')}
                onChange = {(e) => onChangeInput(e.target.value, 'jangkaWaktu')}
                name={`jangkaWaktu${i}`}
                grow
              >
                Jangka Waktu Pengajuan*
              </Input>
              <Input
                type="file"
                placeholder="Akta Pendirian"
                defaultValue = {watch('akta')}
                onChange = {(e) => onChangeInput(e.target.value, 'akta')}
                name={`akta${i}`}
                grow
              >
                Akta Pendirian*
              </Input>
              <Input
                type="file"
                placeholder="Nomor Induk Berusaha"
                defaultValue = {watch('nib')}
                onChange = {(e) => onChangeInput(e.target.value, 'nib')}
                name={`nib${i}`}
                grow
              >
                Nomor Induk Berusaha*
              </Input>
              <Input
                type="file"
                placeholder="NPWP Perusahaan"
                defaultValue = {watch('npwpPerusahaan')}
                onChange = {(e) => onChangeInput(e.target.value, 'npwpPerusahaan')}
                name={`npwpPerusahaan${i}`}
                grow
              >
                NPWP Perusahaan*
              </Input>
              <Input
                type="file"
                placeholder="Kartu Tanda Penduduk"
                defaultValue = {watch('ktp')}
                onChange = {(e) => onChangeInput(e.target.value, 'ktp')}
                name={`ktp${i}`}
                grow
              >
                Kartu Tanda Penduduk*
              </Input>
              <Input
                type="file"
                placeholder="Susunan Pengurus"
                defaultValue = {watch('susunanPengurus')}
                onChange = {(e) => onChangeInput(e.target.value, 'susunanPengurus')}
                name={`susunanPengurus${i}`}
                grow
              >
                Susunan Pengurus*
              </Input>
              <Input
                type="file"
                placeholder="Laporan Keuangan Terbaru"
                defaultValue = {watch('laporan')}
                onChange = {(e) => onChangeInput(e.target.value, 'laporan')}
                name={`laporan${i}`}
                grow
              >
                Laporan Keuangan Terbaru*
              </Input>
            </div>
          ))}
        </div>
      </form>
    </>
  );
}

export default FormPengajuanKreditBadanUsaha;
