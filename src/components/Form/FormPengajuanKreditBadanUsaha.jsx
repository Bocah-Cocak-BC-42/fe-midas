import { useEffect, useState } from "react";
import Button from "../Button";
import Input from "../Input/Input";
import Select from "../Input/Select";
import { postCompanyCredit } from "../../services/company-credit.service";
import {
  getAllCity,
  getAllProvince,
  getAllSubDistrict,
  getAllVillage,
} from "../../services/data-master-alamat.service";
import Modal from "../Modal";
import { getAllKantorCabang } from "../../services/data-master-kantor-cabang";
// import { useForm } from "react-hook-form";

function FormPengajuanKreditBadanUsaha(props) {
  const { page, userDetail } = props;
  const [totalOwner, setTotalOwner] = useState(2);
  const [totalAset, setTotalAset] = useState(1);
  const [messageErrorsField, setMessageErrorsField] = useState({});
  const [messageErrorAlert, setMessageErrorAlert] = useState("");
  const [showModalAlert, setShowModalAlert] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [subdistricts, setSubdistricts] = useState([]);
  const [villages, setVillages] = useState([]);
  const [postalCode, setPostalCode] = useState("");
  const [branchOffices, setBranchOffices] = useState([]);

  const [defaultValues, setDefaultValues] = useState({
    npwp: "",
    companyName: "",
    companyType: "",
    placeOfEstasblishment: "",
    establishRegistrationNumber: "",
    companyRegistrationNumber: "",
    establishRegistrationDate: "1111-11-11",
    email: "",
    phoneNumber: "",
    address: "",
    provinceId: "",
    cityId: "",
    villageId: "",
    postalCode: "",
    businessOwnerDetails: [
      {
        identityNumber: userDetail.identityNumber,
        employeeIdentityNumber: "",
        fullName: userDetail.fullName,
        position: "",
        phoneNumber: "",
      },
      {
        identityNumber: "",
        employeeIdentityNumber: "",
        fullName: "",
        position: "",
        phoneNumber: "",
      },
    ],
    companyAssets: [
      {
        name: "",
        value: 0,
      },
    ],
    branchOfficeId: "",
    applicationAmount: 0,
    applicationPeriod: 0,
    establishRegistrationNumberFile: "",
    companyRegistrationNumberFile: "",
    npwpfile: "",
    identityNumberFile: "",
    boardOfManagementFile: "",
    financialStatementFile: "",
  });

  function getSelectListProvince() {
    getAllProvince(
      null,
      (res) => {
        let selectListProvince = [
          ...[{ id: "", name: "Pilih Provinsi" }],
          ...res.data,
        ];
        setProvinces(selectListProvince);
        setCities([{ id: "", name: "Pilih Kabupaten/Kota" }]);
        setSubdistricts([{ id: "", name: "Pilih Kecamatan" }]);
        setVillages([{ id: "", name: "Pilih Kelurahan" }]);
      },
      () => {
        setCities([{ id: "", name: "Pilih Kabupaten/Kota" }]);
        setSubdistricts([{ id: "", name: "Pilih Kecamatan" }]);
        setVillages([{ id: "", name: "Pilih Kelurahan" }]);
      }
    );
  }

  function getSelectListCities(provinceId) {
    getAllCity(
      provinceId,
      (res) => {
        let selectListCities = [
          ...[{ id: "", name: "Pilih Kabupaten/Kota" }],
          ...res.data,
        ];
        setCities(selectListCities);
        // setCities(cities.concat(res.data));
      },
      () => {
        setCities([{ id: "", name: "Pilih Kabupaten/Kota" }]);
        setSubdistricts([{ id: "", name: "Pilih Kecamatan" }]);
        setVillages([{ id: "", name: "Pilih Kelurahan" }]);
      }
    );
  }
  function getSelectListSubDistricts(cityId) {
    getAllSubDistrict(
      cityId,
      (res) => {
        let selectListSubDistricts = [
          ...[{ id: "", name: "Pilih Kecamatan" }],
          ...res.data,
        ];
        setSubdistricts(selectListSubDistricts);
        // setSubdistricts(subdistricts.concat(res.data));
      },
      () => {
        setSubdistricts([{ id: "", name: "Pilih Kecamatan" }]);
        setVillages([{ id: "", name: "Pilih Kelurahan" }]);
      }
    );
  }
  function getSelectListVillages(subdistrictId) {
    getAllVillage(
      subdistrictId,
      (res) => {
        let selectListVillages = [
          ...[{ id: "", name: "Pilih Kelurahan" }],
          ...res.data,
        ];
        setVillages(selectListVillages);
        // setVillages(villages.concat(res.data));
      },
      () => {
        setVillages([{ id: "", name: "Pilih Kelurahan" }]);
      }
    );
  }

  const handlePostalCode = (villageId) => {
    let postalCode = villages
      .filter((item) => item.id === villageId)
      .map((item) => item.postalCode);

    setPostalCode(postalCode);
  };

  const getSelectListBranchOffice = () => {
    getAllKantorCabang(
      (res) => {
        let selectListBranchOffice = [
          ...[{ id: "", name: "Pilih Kantor Cabang" }],
          ...res.data,
        ];
        setBranchOffices(selectListBranchOffice);
      },
      () => {
        setBranchOffices([{ id: "", name: "Pilih Kantor Cabang" }]);
      }
    );
  };

  useEffect(() => {
    defaultValues.businessOwnerDetails[0].identityNumber =
      userDetail?.identityNumber;
    defaultValues.businessOwnerDetails[0].fullName = userDetail?.fullName;
    getSelectListProvince();
    getSelectListBranchOffice();
  }, [userDetail]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(defaultValues);

    postCompanyCredit(
      (data) => {
        console.log(data);
      },
      (errors) => {
        if (defaultValues.establishRegistrationDate === "1111-11-11") {
          errors.EstablishRegistrationDate = "Tanggal Tidak boleh kosong";
        }
        if (defaultValues.email === "") {
          errors.Email = "Email Tidak boleh kosong";
        }
        console.log(errors);
        if (typeof errors == "object") {
          setMessageErrorsField(errors);
        } else if (typeof errors == "string") {
          setMessageErrorAlert(errors);
          setShowModalAlert(true);
        }
        // setMessageErrorsField(errors);
      },
      defaultValues
    );
  };

  const onChangeInput = (value, name) => {
    setDefaultValues({ ...defaultValues, [name]: value });
  };
  const onChangeInputPemilik = (value, name, i) => {
    let defVal = { ...defaultValues };
    let businessOwnerDetails = [...defVal.businessOwnerDetails];
    businessOwnerDetails[i][name] = value;
  };

  const onChangeInputAset = (value, name, i) => {
    let defVal = { ...defaultValues };
    let companyAssets = [...defVal.companyAssets];
    companyAssets[i][name] = value;
    // setValue(name, value);
  };

  const handlePlusOwner = () => {
    setTotalOwner(totalOwner + 1);

    let businessOwnerDetails = defaultValues.businessOwnerDetails;
    businessOwnerDetails.push({
      identityNumber: "",
      employeeIdentityNumber: "",
      fullName: "",
      position: "",
      phoneNumber: "",
    });
    setDefaultValues({ ...defaultValues, businessOwnerDetails });
  };

  const handlePlusAset = () => {
    setTotalAset(totalAset + 1);

    let companyAssets = defaultValues.companyAssets;
    companyAssets.push({
      name: "",
      value: "",
    });
    setDefaultValues({ ...defaultValues, companyAssets });
  };

  const handleMinOwner = () => {
    setTotalOwner(totalOwner - 1);

    let businessOwnerDetails = defaultValues.businessOwnerDetails;
    businessOwnerDetails.pop();
    setDefaultValues({ ...defaultValues, businessOwnerDetails });
  };
  const handleMinAset = () => {
    setTotalAset(totalAset - 1);

    let companyAssets = defaultValues.assets;
    companyAssets.pop();
    setDefaultValues({ ...defaultValues, companyAssets });
  };

  return (
    <>
      <form id="formPengajuanKreditBadanUsaha" onSubmit={handleSubmit}>
        <div className={`${page !== 1 && "hidden"}`}>
          <div className="flex flex-col gap-2 p-2 mb-4 border-2 rounded-lg shadow-lg">
            <Input
              placeholder="NPWP Badan Usaha"
              // defaultValue={watch("npwp")}
              name="npwp"
              onChange={(e) => onChangeInput(e.target.value, "npwp")}
              // required
              message={messageErrorsField.Npwp}
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
              message={messageErrorsField.CompanyName}
              grow
            >
              Nama
            </Input>
            <Select
              name="companyType"
              handleChange={(val) => onChangeInput(val, "companyType")}
              message={messageErrorsField.CompanyType}
              options={[
                { id: "", name: "Pilih Jenis Badan Usaha" },
                { id: "PT", name: "Perseroan Terbatas (PT)" },
                { id: "CV", name: "Commanditaire Vennootschap (CV)" },
                { id: "KO", name: "Koperasi" },
                { id: "KUD", name: "Koperasi Unit Desa (KUD)" },
                { id: "PD", name: "Perusahaan Dagang (PD)" },
              ]}
              grow
            >
              Jenis Badan Usaha
            </Select>
            <Input
              placeholder="Tempat Pendirian Badan Usaha"
              // defaultValue={watch("placeOfEstasblishment")}
              name="placeOfEstasblishment"
              onChange={(e) =>
                onChangeInput(e.target.value, "placeOfEstasblishment")
              }
              message={messageErrorsField.PlaceOfEstasblishment}
              // required
              grow
            >
              Tempat Pendirian
            </Input>
            <Input
              placeholder="No. Akta Pendirian Badan Usaha"
              onChange={(e) =>
                onChangeInput(e.target.value, "establishRegistrationNumber")
              }
              name="establishRegistrationNumber"
              // required
              message={messageErrorsField.EstablishRegistrationNumber}
              grow
            >
              No. Akta Pendirian
            </Input>
            <Input
              type="date"
              // value={date}
              placeholder="DD/MM/YY"
              onChange={(e) => {
                let dateVal = e.target.value;
                if (e.target.value == "") {
                  dateVal = "1111-11-11";
                }
                onChangeInput(dateVal, "establishRegistrationDate");
              }}
              name="establishRegistrationDate"
              message={messageErrorsField.EstablishRegistrationDate}
              // required
              grow
            >
              Tanggal Akta Pendirian
            </Input>
            <Input
              placeholder="Nomor Induk Berusaha"
              // defaultValue={watch("nib")}
              name="companyRegistrationNumber"
              onChange={(e) =>
                onChangeInput(e.target.value, "companyRegistrationNumber")
              }
              // required
              message={messageErrorsField.CompanyRegistrationNumber}
              grow
            >
              NIB
            </Input>
            <Input
              placeholder="Email Badan Usaha"
              type="text"
              // defaultValue={watch("email")}
              name="email"
              onChange={(e) => onChangeInput(e.target.value, "email")}
              // required
              message={messageErrorsField.Email}
              grow
              // message={errors.email?.message}
            >
              Email
            </Input>

            <Input
              placeholder="Nomor Telepon Badan Usaha"
              // defaultValue={watch("phoneNumber")}
              name="phoneNumber"
              onChange={(e) => onChangeInput(e.target.value, "phoneNumber")}
              // required
              message={messageErrorsField.PhoneNumber}
              grow
            >
              No. Telp
            </Input>
            <Input
              placeholder="Alamat Badan Usaha"
              // defaultValue={watch("alamat")}
              name="address"
              onChange={(e) => onChangeInput(e.target.value, "address")}
              message={messageErrorsField.Address}
              grow
            >
              Alamat Badan Usaha
            </Input>
            <Select
              // defaultValue={watch("provinsi")}
              // onChange={(e) => onChangeInput(e.target.value, "provinsi")}
              name="provinceId"
              handleChange={(val) => {
                onChangeInput(val, "provinceId");
                getSelectListCities(val);
                setCities([{ id: "", name: "Pilih Kabupaten/Kota" }]);
                setSubdistricts([{ id: "", name: "Pilih Kecamatan" }]);
                setVillages([{ id: "", name: "Pilih Kelurahan" }]);
              }}
              message={messageErrorsField.ProvinceId}
              options={provinces}
              grow
            >
              Provinsi Badan Usaha
            </Select>
            <Select
              name="cityId"
              handleChange={(val) => {
                onChangeInput(val, "cityId");
                getSelectListSubDistricts(val);
                setSubdistricts([{ id: "", name: "Pilih Kecamatan" }]);
                setVillages([{ id: "", name: "Pilih Kelurahan" }]);
              }}
              message={messageErrorsField.CityId}
              options={cities}
              grow
            >
              Kabupaten/Kota Badan Usaha
            </Select>
            <Select
              name="subdistrictId"
              handleChange={(val) => {
                onChangeInput(val, "subdistrictId");
                getSelectListVillages(val);
                setVillages([{ id: "", name: "Pilih Kelurahan" }]);
              }}
              message={messageErrorsField.SubdistrictId}
              options={subdistricts}
              grow
            >
              Kecamatan Badan Usaha
            </Select>
            <Select
              // defaultValue={watch("vilageId")}
              // onChange={(e) => onChangeInput(e.target.value, "vilageId")}
              name="villageId"
              handleChange={(val) => {
                onChangeInput(val, "villageId");
                handlePostalCode(val);
              }}
              message={messageErrorsField.VillageId}
              options={villages}
              grow
            >
              Kelurahan Badan Usaha
            </Select>
            <Input
              placeholder="Kode Pos Badan Usaha"
              defaultValue={postalCode}
              name="postalCode"
              onChange={(e) => onChangeInput(e.target.value, "postalCode")}
              message={messageErrorsField.PostalCode}
              disabled
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
                defaultValue={
                  defaultValues?.businessOwnerDetails[i]?.identityNumber
                }
                // defaultValue={i === 0 ? userDetail?.identityNumber : ""}
                disabled={
                  defaultValues?.businessOwnerDetails[i]?.identityNumber
                    ? true
                    : false
                }
                onChange={(e) =>
                  onChangeInputPemilik(e.target.value, `identityNumber`, i)
                }
                name={`identityNumber${i}`}
                message={
                  messageErrorsField[
                    `BusinessOwnerDetails[${i}].IdentityNumber`
                  ]
                }
                grow
              >
                NIK
              </Input>
              <Input
                placeholder="NIP Pemilik / Pengurus Badan Usaha"
                // defaultValue={watch(`businessOwnerDetails.${i}.nip`)}
                onChange={(e) =>
                  onChangeInputPemilik(
                    e.target.value,
                    `employeeIdentityNumber`,
                    i
                  )
                }
                name={`employeeIdentityNumber${i}`}
                message={
                  messageErrorsField[
                    `BusinessOwnerDetails[${i}].EmployeeIdentityNumber`
                  ]
                }
                grow
              >
                NIP
              </Input>
              <Input
                placeholder="Nama Lengkap Pemilik / Pengurus Badan Usaha"
                defaultValue={defaultValues?.businessOwnerDetails[i]?.fullName}
                // defaultValue={i === 0 ? userDetail?.fullName : ""}
                disabled={
                  defaultValues?.businessOwnerDetails[i]?.fullName
                    ? true
                    : false
                }
                onChange={(e) =>
                  onChangeInputPemilik(e.target.value, `fullName`, i)
                }
                name={`fullName${i}`}
                message={
                  messageErrorsField[`BusinessOwnerDetails[${i}].FullName`]
                }
                grow
              >
                Nama Lengkap
              </Input>
              <Input
                placeholder="Jabatan Dalam Badan Usaha"
                // defaultValue={watch(`businessOwnerDetails.${i}.jabatan`)}
                onChange={(e) =>
                  onChangeInputPemilik(e.target.value, `position`, i)
                }
                name={`position${i}`}
                message={
                  messageErrorsField[`BusinessOwnerDetails[${i}].Position`]
                }
                grow
              >
                Jabatan Dalam Badan Usaha
              </Input>
              <Input
                placeholder="Nomor Telepon Badan Usaha"
                // defaultValue={watch(`businessOwnerDetails.${i}.phoneNumber`)}
                onChange={(e) =>
                  onChangeInputPemilik(e.target.value, `phoneNumber`, i)
                }
                name={`phoneNumber${i}`}
                message={
                  messageErrorsField[`BusinessOwnerDetails[${i}].PhoneNumber`]
                }
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
                // defaultValue={watch(`name${i}`)}
                onChange={(e) => onChangeInputAset(e.target.value, `name`, i)}
                name={`name${i}`}
                message={messageErrorsField[`CompanyAssets[${i}].Name`]}
                grow
              >
                Aset Perusahaan*
              </Input>
              <Input
                placeholder="Nilai Aset Perusahaan"
                type="number"
                // value={"number"}
                // defaultValue={watch(`value${i}`)}
                onChange={(e) => onChangeInputAset(e.target.value, `value`, i)}
                name={`value${i}`}
                message={messageErrorsField[`CompanyAssets[${i}].Value`]}
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
              // defaultValue={watch("branchOfficeId")}
              // onChange={(e) => onChangeInput(e.target.value, "branchOfficeId")}
              name="branchOfficeId"
              handleChange={(val) => onChangeInput(val, "branchOfficeId")}
              message={messageErrorsField.BranchOfficeId}
              options={branchOffices}
              grow
            >
              Kantor Cabang Pengajuan*
            </Select>
            <Input
              type="number"
              placeholder="Nominal Pengajuan Anda"
              // defaultValue={watch("applicationAmount")}
              onChange={(e) =>
                onChangeInput(e.target.value, "applicationAmount")
              }
              name="applicationAmount"
              message={messageErrorsField.ApplicationAmount}
              grow
            >
              Nominal Pengajuan*
            </Input>
            <Input
              placeholder="Jangka Waktu Pengajuan Anda"
              // defaultValue={watch("applicationPeriod")}
              onChange={(e) =>
                onChangeInput(e.target.value, "applicationPeriod")
              }
              name="applicationPeriod"
              message={messageErrorsField.ApplicationPeriod}
              // required
              grow
            >
              Jangka Waktu Pengajuan*
            </Input>
            <Input
              type="file"
              placeholder="Akta Pendirian"
              // defaultValue={watch("akta")}
              onChange={(e) =>
                onChangeInput(e.target.value, "establishRegistrationNumberFile")
              }
              name="establishRegistrationNumberFile"
              message={messageErrorsField.EstablishRegistrationNumberFile}
              grow
            >
              Akta Pendirian*
            </Input>
            <Input
              type="file"
              placeholder="Nomor Induk Berusaha"
              // defaultValue={watch("nib")}
              onChange={(e) =>
                onChangeInput(e.target.value, "companyRegistrationNumberFile")
              }
              name="companyRegistrationNumberFile"
              message={messageErrorsField.CompanyRegistrationNumberFile}
              grow
            >
              Nomor Induk Berusaha*
            </Input>
            <Input
              type="file"
              placeholder="NPWP Perusahaan"
              // defaultValue={watch("npwpPerusahaan")}
              onChange={(e) => onChangeInput(e.target.value, "npwpfile")}
              name="npwpfile"
              message={messageErrorsField.NPWPFile}
              grow
            >
              NPWP Perusahaan*
            </Input>
            <Input
              type="file"
              placeholder="Kartu Tanda Penduduk"
              // defaultValue={watch("ktp")}
              onChange={(e) =>
                onChangeInput(e.target.value, "identityNumberFile")
              }
              name="identityNumberFile"
              message={messageErrorsField.IdentityNumberFile}
              grow
            >
              Kartu Tanda Penduduk*
            </Input>
            <Input
              type="file"
              placeholder="Susunan Pengurus"
              // defaultValue={watch("susunanPengurus")}
              onChange={(e) =>
                onChangeInput(e.target.value, "boardOfManagementFile")
              }
              name="boardOfManagementFile"
              message={messageErrorsField.BoardOfManagementFile}
              grow
            >
              Susunan Pengurus*
            </Input>
            <Input
              type="file"
              placeholder="Laporan Keuangan Terbaru"
              // defaultValue={watch("laporan")}
              onChange={(e) =>
                onChangeInput(e.target.value, "financialStatementFile")
              }
              name="financialStatementFile"
              message={messageErrorsField.FinancialStatementFile}
              grow
            >
              Laporan Keuangan Terbaru*
            </Input>
          </div>
        </div>
      </form>
      <Modal
        onClose={() => {
          setShowModalAlert(false);
          // location.reload();
        }}
        visible={showModalAlert}
        title="Pemberitahuan"
      >
        {messageErrorAlert}
      </Modal>
    </>
  );
}

export default FormPengajuanKreditBadanUsaha;
