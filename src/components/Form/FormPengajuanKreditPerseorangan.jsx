import { useEffect, useState } from "react";
import Joi from "joi";
import { joiResolver } from '@hookForm/resolvers/joi';
import { useForm, useFieldArray } from 'react-hook-form';
import Input from "../../components/Input/Input";
import Select from "../../components/Input/Select";
import Cookies from "js-cookie";
import { GetCurrentLogin } from "../../services/authentication.service";

const schema = Joi.object({
    familyCardNumber: Joi.string().required().pattern(/^[0-9]+$/).min(16).messages({
        'string.empty' : 'Nomor KK tidak boleh kosong',
        'string.pattern.base': 'Nomor KK tidak boleh mengandung huruf',
        'string.min': 'Nomor KK minimal 16 angka'
    }),
    address: Joi.string().required().min(20).max(200).messages({
        'string.empty': "Alamat tidak boleh kosong",
        'string.min' : 'Alamat minimal 20 huruf',
        'string.max' : 'Alamat maximal 200 huruf'
    }),
    villageId: Joi.string().required().messages({
        'string.empty' : 'Kode Pos tidak boleh kosong'
    }),
    businessSectorId: Joi.string().required().messages({
        'string.empty' : 'Sektor Usaha tidak boleh kosong'
    }),
    businessAddress: Joi.string().required().min(20).max(200).messages({
        'string.empty': "Alamat Usaha tidak boleh kosong",
        'string.min' : 'Alamat Usaha minimal 20 huruf',
        'string.max' : 'Alamat Usaha maximal 200 huruf'
    }),
    businessPhoneNumber: Joi.string().required().pattern(/^[0-9]+$/).min(10).max(13).messages({
        'string.empty': 'No Telefon Usaha tidak boleh kosong',
        'string.min' : 'No Telefon Usaha minimal 10 angka',
        'string.max': 'No Telefon Usaha maximal 18 angka',
        'string.pattern.base': 'No Telfon Usaha tidak boleh mengandung huruf'
    }),
    businessPeriod: Joi.string().required().pattern(/^[0-9]+$/).messages({
        'string.empty' : 'Lama Usaha tidak boleh kosong',
        'string.pattern.base': 'Lama usaha tidak boleh mengandung huruf'
    }),
    businessPlaceStatus: Joi.string().required().messages({
        'string.empty': 'Status Usaha tidak boleh kosong'
    }),
    totalEmployee: Joi.string().required().pattern(/^[0-9]+$/).messages({
        'string.empty' : 'Lama Usaha tidak boleh kosong',
        'string.pattern.base': 'Lama usaha tidak boleh mengandung huruf'
    }),
    businessVillage: Joi.string().required().messages({
        'string.empty': 'Kelurahan / Desa Usaha tidak boleh kosong'
    }),
    branchOfficeId: Joi.string().required().messages({
        'string.empty': 'Kantor Cbaang tidak boleh kosong'
    }),
    applicationAmount: Joi.string().required().pattern(/^[0-9]+$/).min(1000000).messages({
        'string.empty' : 'Nominal Pengajuan tidak boleh kosong',
        'string.min' : 'Nominal Pengajuan minimal 1.000.000',
        'string.pattern.base': 'Nominal Pengajuan tidak boleh mengandung huruf'
    }),
    applicationPeriod: Joi.string().required().pattern(/^[0-9]+$/).messages({
        'string.empty': 'Jangka Waktu tidak boleh kosong',
        'string.pattern.base': 'Jangka Waktu tidak boleh mengandung huruf'
    }),
    domicileFile: Joi.string().required().messages({
        'string.empty': 'Surat Domisili tidak boleh kosong'
    }),
    identityCardFile: Joi.string().required().messages({
        'string.empty': 'Foto KTP tidak boleh kosong'
    }),
    identityCardSelfieFile: Joi.string().required().messages({
        'string.empty': 'Foto Selfie KTP tidak boleh kosong'
    }),
    familyCardFile: Joi.string().required().messages({
        'string.empty': 'Foto KK tidak boleh kosong'
    }),
    businessCertificateFile: Joi.string().required().messages({
        'string.empty': 'Surat Keterangan Usaha tidak boleh kosong'
    }),
    emergencyContacts : Joi.array().items(
        Joi.object({
            phoneNumber: Joi.string().required().min(10).max(13).pattern(/^[0-9]+$/).messages({
                'string.empty': 'No Telefon tidak boleh kosong',
                'string.min' : 'No Telefon minimal 10 angka',
                'string.max': 'No Telefon maximal 18 angka',
                'string.pattern.base': 'No Telfon tidak boleh mengandung huruf'
            }),
            name: Joi.string().required().pattern(/^[A-Za-z]+$/).messages({
                'string.empty' : 'Nama Lengkap tidak boleh kosong',
                'string.pattern.base': 'Nama Lengkap tidak boleh mengandung angka'
            }),
            relative: Joi.string().required().messages({
                'string.empty': 'Hubungan tidak boleh kosong'
            })
        })
    ).min(2).required().messages({
        'array.empty': "Kontak Darurat tidak boleh kosong",
        'array.min': 'Kontak Darurat minimal 2'
    })
});


function FormPengajuanKreditPerseorangan({page}) {
    const [totalContact, setTotalContact] = useState(1);

    const [detailUser, setDetailUser] = useState([{}])
    const [provinces, setProvinces] = useState([{id:"", name:"Pilih Provinsi"}]);
    const [cities, setCities] = useState([{id:"", name:"Pilih Kabupaten/Kota"}]);
    const [subdistrics, setSubdistricts] = useState([{id:"", name:"Pilih Kecamatan"}]);
    const [villages, setVillages] = useState([{id:"", name:"Pilih Desa"}]);
    const [status, setStatus] = useState([{id: "", name: "Pilih hubungan Kontak Darurat"}]);
    const [usaha, setUsaha] = useState([{id: "", name: "Pilih Sektor Usaha Anda"}])
    const [statusTempat, setStatusTempat] = useState([{id: "", name: "Pilih Status Tempat Usaha Anda"}])
    const [provinsiUsaha, setProvinsiUsaha] = useState([{id: "", name: "Pilih Provinsi Usaha Anda"}])
    const [kabupatenUsaha, setKabupatenUsaha] = useState([{id: "", name: "Pilih Kabupaten / Kota Usaha Anda"}])
    const [kecamatanUsaha, setKecamatanUsaha] = useState([{id: "", name: "Pilih Kelurahan Usaha Anda"}])
    const [kelurahanUsaha, setKelurahanUsaha] = useState([{id: "", name: "Pilih Kelurahan Usaha Anda"}])
    const [cabangUsaha, setCabangUsaha] = useState([{id: "", name: "Pilih Kantor Cabang Pengajuan Anda"}])

    const { register, setValue, watch, handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            familyCardNumber : '',
            address : '',
            villageId : '',
            businessSectorId : '',
            businessAddress : '',
            businessPhoneNumber : '',
            businessPeriod: '',
            businessPlaceStatus : '',
            totalEmployee : '',
            businessVillage : '',
            branchOfficeId : '',
            applicationAmount : '',
            applicationPeriod : '',
            domicileFile: '',
            identityCardFile : '',
            identityCardSelfieFile : '',
            familyCardFile : '',
            businessCertificateFile : '',
            emergencyContacts: [{
                phoneNumber: '',
                name: '',
                relative: ''
            }]
        },
        resolver: joiResolver(schema)
    })

    const { fields, append, remove } = useFieldArray({
        name: 'emergencyContacts',
        control
    })

    const onChangeInput = (value, name) => {
        setValue(name, value);
    }

    const onSubmit = (form) => {
        console.log('click');
    }

    useEffect(() => {
        const user = JSON.parse(Cookies.get('user') ?? null);
        GetCurrentLogin(
            (res) => {
                setDetailUser(res.data);
            },
            null,
            { id : user.userId}
        );
    }, [])

    return (
        <div>
            <form 
                id="formPengajuanKreditPerseorangan"
                onSubmit={handleSubmit(onSubmit)}>
                <div className={`${page !== 1 && "hidden"}`}>
                    <div className="my-5 mx-10">
                        <strong>Berkas Diri</strong>
                    </div>
                    <div className="mx-10 my-4">
                        <Input
                            type="text"
                            grow
                            disabled
                            defaultValue={detailUser.email}>
                            Email *
                        </Input>
                    </div>
                    <div className="mx-10 my-4">
                        <Input
                            type="text"
                            grow
                            disabled
                            defaultValue={detailUser.fullName}>
                            Nama Lengkap *
                        </Input>
                    </div>
                    <div className="mx-10 my-4">
                        <Input
                            type="text"
                            grow
                            defaultValue={watch('familyCardNumber')}
                            onChange={(e) => onChangeInput(e.target.value, 'familyCardNumber')}>
                            Nomor KK *
                        </Input>
                        <span className='text-red-600'>{errors.familyCardNumber?.message}</span>
                    </div>

                    <div className="mx-10 my-4">
                        <Input
                            type="text"
                            grow
                            defaultValue={watch('address')}
                            onChange={(e) => onChangeInput(e.target.value, 'address')}>
                            Alamat Rumah *
                        </Input>
                        <span className='text-red-600'>{errors.address?.message}</span>
                    </div>
                    <div className="mx-10 my-4">
                        <Select
                            grow
                            options={provinces}>
                            Provinsi *
                        </Select>
                    </div>
                    <div className="mx-10 my-4">
                        <Select
                            grow
                            options={cities}>
                            Kabupaten/Kota *
                        </Select>
                    </div>
                    <div className="mx-10 my-4">
                        <Select
                            grow
                            options={subdistrics}>
                            Kecamatan *
                        </Select>
                    </div>
                    <div className="mx-10 my-4">
                        <Select
                            grow
                            options={villages}>
                            Kel/Desa *
                        </Select>
                    </div>
                    <div className="mx-10 my-4">
                        <Input
                            type="text"
                            grow
                            defaultValue={watch('villageId')}
                            onChange={(e) => onChangeInput(e.target.value, 'villageId')}>
                            Kode Pos *
                        </Input>
                        <span className='text-red-600'>{errors.villageId?.message}</span>
                    </div>
                </div>

                <div className={`${page !== 2 && "hidden"}`}>
                    <div className="my-5 mx-10">
                        <strong>Berkas Diri & Kontak Darurat</strong>
                    </div>
                    <div className="mx-10 my-4">
                        <Input
                            type="file"
                            grow
                            defaultValue={watch('domicileFile')}
                            onChange={(e) => onChangeInput(e.target.value, 'domicileFile')}>
                            Surat Domisili *
                        </Input>
                        <span className='text-red-600'>{errors.domicileFile?.message}</span>
                    </div>
                    <div className="mx-10 my-4">
                        <Input
                            type="file"
                            grow
                            defaultValue={watch('familyCardFile')}
                            onChange={(e) => onChangeInput(e.target.value, 'familyCardFile')}>
                            Foto KTP *
                        </Input>
                        <span className='text-red-600'>{errors.familyCardFile?.message}</span>
                    </div>
                    <div className="mx-10 my-4">
                        <Input
                            type="file"
                            grow
                            defaultValue={watch('identityCardSelfieFile')}
                            onChange={(e) => onChangeInput(e.target.value, 'identityCardSelfieFile')}>
                            Foto Selfie KTP *
                        </Input>
                        <span className='text-red-600'>{errors.identityCardSelfieFile?.message}</span>
                    </div>
                    <div className="mx-10 my-4">
                        <Input
                            type="file"
                            grow
                            defaultValue={watch('familyCardFile')}
                            onChange={(e) => onChangeInput(e.target.value, 'familyCardFile')}>
                            Foto KK *
                        </Input>
                        <span className='text-red-600'>{errors.familyCardFile?.message}</span>
                    </div>
                    <div className="mx-10 my-4">
                        <div className="m-5">
                            <strong>Kontak Darurat</strong>
                            <div>
                                <span>*Minimal 2 Kontak Darurat</span>
                            </div>
                        </div>
                        <div>
                        {fields.map((field, index) => {
                            return (
                                <div className="border-2 my-3" key={field.id}> 
                                    <div className="mx-10 my-4">
                                        <Input
                                            type="text"
                                            grow
                                            register={{...register(`emergencyContacts.${index}.name`, {required: 'Nama Lengkap tidak boleh kosong'})}}>
                                            Nama Lengkap *
                                        </Input>
                                        <span className='text-red-600'>{errors.emergencyContacts?.[index]?.name?.message}</span>
                                    </div>
                                    <div className="mx-10 my-4">
                                        <Select
                                            options={status}
                                            grow
                                            register={{...register(`emergencyContacts.${index}.relative`)}}>
                                            Hubungan *
                                        </Select>
                                        <span className='text-red-600'>{errors.emergencyContacts?.[index]?.relative?.message}</span>
                                    </div>
                                    <div className="mx-10 my-4">
                                        <Input
                                            type="text"
                                            grow
                                            register={{...register(`emergencyContacts.${index}.phoneNumber`)}}>
                                            No Telefon *
                                        </Input>
                                        <span className='text-red-600'>{errors.emergencyContacts?.[index]?.phoneNumber?.message}</span>
                                    </div>
                                    
                                {index >= 0 && (
                                    <div className="flex justify-end my-3 mx-10">
                                        <button className="w-1/5 h-7 align bg-red-400 rounded-md text-white" type="button" onClick={() => remove(index)}>
                                            Remove
                                        </button>
                                    </div>
                                )}
                                </div>
                                
                            )
                        })}
                        <span>{errors.emergencyContacts?.message}</span>
                        </div>
                        <button className="w-1/5 h-7 align bg-blue-400 rounded-md text-white" type="button" onClick={() => append({})}>Add</button>
                    </div>
                </div>

                <div className={`${page !== 3 && "hidden"}`}>
                    <div className="my-5 mx-10">
                        <strong>Data Usaha</strong>
                    </div>
                    <div className="mx-10 my-4">
                        <Select
                            options={usaha}
                            grow
                            defaultValue={watch('businessSectorId')}
                            onChange={(e) => onChangeInput(e.target.value, 'businessSectorId')}>
                            Sektor Usaha *
                        </Select>
                        <span className='text-red-600'>{errors.businessSectorId?.message}</span>
                    </div>
                    <div className="mx-10 my-4">
                        <Input
                            type="text"
                            grow>
                            Nama Usaha *
                        </Input>
                    </div>
                    <div className="mx-10 my-4">
                        <Input
                            type="text"
                            grow
                            defaultValue={watch('businessPhoneNumber')}
                            onChange={(e) => onChangeInput(e.target.value, 'businessPhoneNumber')}>
                            No. Telp Usaha *
                        </Input>
                        <span className='text-red-600'>{errors.businessPhoneNumber?.message}</span>
                    </div>
                    <div className="mx-10 my-4">
                        <Input
                            type="text"
                            grow
                            defaultValue={watch('businessPeriod')}
                            onChange={(e) => onChangeInput(e.target.value, 'businessPeriod')}>
                            Lama Usaha *
                        </Input>
                        <span className='text-red-600'>{errors.businessPeriod?.message}</span>
                    </div>
                    <div className="mx-10 my-4">
                        <Select
                            options={statusTempat}
                            grow
                            defaultValue={watch('businessPlaceStatus')}
                            onChange={(e) => onChangeInput(e.target.value, 'businessPlaceStatus')}>
                            Status Tempat *
                        </Select>
                        <span className='text-red-600'>{errors.businessPlaceStatus?.message}</span>
                    </div>
                    <div className="mx-10 my-4">
                        <Input
                            type="number"
                            grow
                            defaultValue={watch('totalEmployee')}
                            onChange={(e) => onChangeInput(e.target.value, 'totalEmployee')}>
                            Jumlah Karyawan *
                        </Input>
                        <span className='text-red-600'>{errors.totalEmployee?.message}</span>
                    </div>
                    <div className="mx-10 my-4">
                        <Input
                            type="number"
                            grow
                            defaultValue={watch('businessAddress')}
                            onChange={(e) => onChangeInput(e.target.value, 'businessAddress')}>
                            Alamat Usaha *
                        </Input>
                    </div>
                    <div className="mx-10 my-4">
                        <Select
                            options={provinsiUsaha}
                            grow>
                            Provinsi Usaha *
                        </Select>
                    </div>
                    <div className="mx-10 my-4">
                        <Select
                            options={kabupatenUsaha}
                            grow>
                            Kabupaten / Kota *
                        </Select>
                    </div>
                </div>

                <div className={`${page !== 4 && "hidden"}`}>
                    <div className="my-5 mx-10">
                        <strong>Data Usaha 2</strong>
                    </div>
                    <div className="mx-10 my-4">
                        <Select
                            options={kecamatanUsaha}
                            grow>
                            Kecamatan *
                        </Select>
                    </div>
                    <div className="mx-10 my-4">
                        <Select
                            options={kelurahanUsaha}
                            grow
                            defaultValue={watch('businessVillage')}
                            onChange={(e) => onChangeInput(e.target.value, 'businessVillage')}>
                            Kel / Desa *
                        </Select>
                        <span className='text-red-600'>{errors.businessVillage?.message}</span>
                    </div>
                    <div className="mx-10 my-4">
                        <Input
                            type="number"
                            grow>
                            Kode Pos Usaha *
                        </Input>
                    </div>
                    <div className="mx-10 my-4">
                        <Input
                            type="file"
                            grow>
                            Surat Keterangan Usaha *
                        </Input>
                    </div>
                </div>

                <div className={`${page !== 5 && "hidden"}`}>
                    <div className="my-5 mx-10">
                        <strong>Pengajuan</strong>
                    </div>
                    <div className="mx-10 my-4">
                        <Select
                            options={cabangUsaha}
                            grow
                            defaultValue={watch('branchOfficeId')}
                            onChange={(e) => onChangeInput(e.target.value, 'branchOfficeId')}>
                            Pilih Kantor Cabang Pengajuan Anda *
                        </Select>
                        <span className='text-red-600'>{errors.branchOfficeId?.message}</span>
                    </div>
                    <div className="mx-10 my-4">
                        <Input
                            type="text"
                            grow
                            defaultValue={watch('applicationAmount')}
                            onChange={(e) => onChangeInput(e.target.value, 'applicationAmount')}>
                            Nominal Pengajuan *
                        </Input>
                        <span className='text-red-600'>{errors.applicationAmount?.message}</span>
                    </div>
                    <div className="mx-10 my-4">
                        <Input
                            type="number"
                            grow
                            defaultValue={watch('applicationPeriod')}
                            onChange={(e) => onChangeInput(e.target.value, 'applicationPeriod')}>
                            Jangka Waktu *
                        </Input>
                        <span className='text-red-600'>{errors.applicationPeriod?.message}</span>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default FormPengajuanKreditPerseorangan