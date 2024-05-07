import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input/Input";
import Select from "../../components/Input/Select";
import { useEffect, useState } from "react";
import { getAllCity, getAllProvince, getAllSubDistrict, getAllVillage } from "../../services/data-master-alamat.service";
import { getKantorCabangById, postKantorCabang, putKantorCabang } from "../../services/data-master-kantor-cabang";
import Modal from "../../components/Modal";

function UpsertKantorCabang(props){
    const navigate = useNavigate();
    const { id } = useParams();
    const [disabled, setDisabled] = useState(true);
    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [subdistrics, setSubdistricts] = useState([]);
    const [villages, setVillages] = useState([]);
    const [form, setForm] = useState({
        id: null,
        code: "",
        officeName: "",
        address: "",
        provinceId: "",
        cityId: "",
        subdistrictId: "",
        villageId: "",
        postalCode: ""
    })
    const [messageValidationFieldm, setMessageValidationField] = useState({});
    const [showModalAlert, setShowModalAlert] = useState(false);
    const [messageConfirm, setMessageConfirm] = useState("");
    
    function getKantorCabang(id){
        console.log(id)
        getKantorCabangById(
            (data)=>{
                setForm(
                {...form, 
                    officeName:data.name,
                    code:data.code,
                    address:data.address,
                    provinceId:data.province,
                    cityId:data.city,
                    subdistrictId:data.subDistrict,
                    villageId:data.village,
                    postalCode:data.postalCode
                })
                console.log(data)
                getDataCity(data.province)
                getDataSubdistrict(data.city)
                getDataVillage(data.subDistrict)
                } ,id)
    };

    function getDataProvinsi() {
        getAllProvince(null, (res) => {
            setProvinces(res.data);
        }, (err)=>{setCities([])})
    }
    useEffect(() => {
        getDataProvinsi();
        if(id){
            getKantorCabang(id)
        }
    }, []);

    function getDataCity(idProvince) {
        getAllCity(idProvince, (res) =>{
            setCities(res.data);
        },(err)=>{
            setCities([]); 
            setSubdistricts([]); 
            setVillages([])})
        }
        
        function getDataSubdistrict(idCity) {
            getAllSubDistrict(idCity, (res) =>{
                setSubdistricts(res.data);
                console.log(subdistrics);
            },(err)=>{
            setSubdistricts([])
            setVillages([])})
    }

    function getDataVillage(idSubdistrict) {
        getAllVillage(idSubdistrict, (res) =>{
            setVillages(res.data);
            console.log(villages);
        },(err)=>{ setVillages([]);})
    }

    useEffect(() =>{
        setDisabled(false)
    }, [])

    const setProvince = (e) =>{
        console.log(e);
        setForm({...form, provinceId:e})
        getDataCity(e)
    }

    const setCity = (e) =>{
        console.log(e);
        setForm({...form, cityId:e})
        getDataSubdistrict(e)
    }

    const setSubdistrict = (e) =>{
        console.log(e)
        setForm({...form, subdistrictId:e})
        getDataVillage(e)
    }

    const setVillage = (e) =>{
        console.log(e)
        setForm({...form, villageId:e,postalCode: villages.find(x => x.id === e).postalCode})
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        if(!id){
            postKantorCabang(
                (ressMessage) => {
                    setMessageConfirm(ressMessage);
                    setShowModalAlert(true);
                },
                (errors) => {
                    setMessageValidationField(errors);
                },
                form
            )
        } else{
            putKantorCabang(
                (ressMessage) => {
                    setMessageConfirm(ressMessage);
                    setShowModalAlert(true);
                },id, {...form, id:id},
                (errors) => {
                    setMessageValidationField(errors);
                }
            );
        }
    }

    return(
        <>
            <div className="mt-2">
                <div>
                    <Link to={id?"../../":"../"}relative="path">
                        <Button icon="arrow-left" variant="danger">
                            Kembali
                        </Button>
                    </Link>
                </div>
                
                <div>
                    <h1 className="text-2xl font-bold">{id?"Edit":"Tambah"} Kantor Cabang</h1>
                </div>

                <div className="rounded-md border mt-4 shadow">
                    <form
                        id="form-upsert-kantor-cabang"
                        className="flex flex-col gap-4 p-5 shadow-xl"
                    >
                        <div>
                            <Input 
                                placeholder="Masukan Nama Kantor Cabang"
                                name="officeName"
                                required
                                grow
                                defaultValue={form.officeName}
                                message={messageValidationFieldm?.OfficeName}
                                onChange={(e) => setForm({...form, officeName:e.target.value})}
                            >
                                Nama Cabang
                            </Input>
                        </div>

                        <div>
                            <Input
                                placeholder="Kode Kantor Cabang"
                                name="code"
                                required
                                grow
                                defaultValue={form.code}
                                message={messageValidationFieldm?.Code}
                                onChange={(e) => setForm({...form, code: e.target.value})}
                            >
                                Kode Kantor Cabang
                            </Input>
                        </div>

                        <div>
                            <Input
                                placeholder="Alamat"
                                name="address"
                                required
                                grow
                                defaultValue={form.address}
                                message={messageValidationFieldm?.Address}
                                onChange={(e) => setForm({...form, address: e.target.value})}
                            >
                                Alamat Kantor Cabang
                            </Input>
                        </div>

                        <div>
                            <Select
                                // name="provinceId"
                                grow
                                options={provinces}
                                value={form.provinceId}
                                required
                                handleChange={(e) => setProvince(e)}
                            >
                                Provinsi
                            </Select>
                        </div>

                        <div>
                            <Select
                                // name="cityId"
                                grow
                                options={cities}
                                value={form.cityId}
                                setDisabled={disabled}
                                required
                                handleChange={(e) => setCity(e)}
                            >
                                Kabupaten/Kota
                            </Select>
                        </div>

                        <div>
                            <Select
                                name="subdistrictId"
                                grow
                                options={subdistrics}
                                value={form.subdistrictId}
                                setDisabled={disabled}
                                required
                                handleChange={(e) => setSubdistrict(e)}
                            >
                                Kecamatan
                            </Select>
                        </div>

                        <div>
                            <Select
                            name="villageId"
                            grow
                            disabled={disabled}
                            options={villages}
                            value={form.villageId}
                            message={messageValidationFieldm?.VillageId}
                            handleChange={(e) => setVillage(e)}
                            >
                                Desa
                            </Select>
                        </div>

                        <div>
                            <Input name="postalCode" disabled={true} defaultValue={form.postalCode}>
                                Postal Code
                            </Input>
                        </div>

                        <div className="self-end">
                            <Button type="sumbit" onClick={(e)=>handleSubmit(e)}>
                                {id?"Edit":"Tambah"}
                            </Button>
                        </div>
                    </form>
                </div>

                <Modal
                onClose={()=>{setShowModalAlert(false);
                navigate(id?"../..":"..", {relative:"path"})
            }}
                visible={showModalAlert}
                title={"Pemberitahuan"}
                >
                    {messageConfirm}
                </Modal>
            </div>
        </>
    )
}

export default UpsertKantorCabang;