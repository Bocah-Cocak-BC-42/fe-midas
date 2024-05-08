import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import Joi from "joi";
import { joiResolver } from '@hookForm/resolvers/joi';
import { postRegister } from '../../services/register.service';
import Button from '../Button';
import { Link } from 'react-router-dom';

const schemaFirstRegis = Joi.object({
  email: Joi.string().required().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"]}
  }).messages({
    'string.empty': 'Email tidak boleh kosong',
    'string.email': 'Format Email salah'
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password tidak boleh kosong'
  }),
  confirm: Joi.any().equal(Joi.ref('password')).required().messages({
    'any.empty': 'Confirm Password tidak boleh kosong'
  }).options({
    messages : {
      'any.only': 'Confirm Password tidak sama'
    }
  }),
  identityNumber: Joi.string().pattern(/^[0-9]+$/).length(16).required().messages({
    'string.empty': 'No Induk tidak boleh kosong',
    'string.pattern.base': 'No Induk tidak boleh mengandung huruf',
    'string.length': 'No Induk harus 16 angka'
  }),
  fullName: Joi.string().required().messages({
    'string.empty': 'Nama Lengkap tidak boleh kosong'
  }),
  nickName: Joi.string().required().messages({
    'string.empty': 'Nama Panggilan tidak boleh kosong'
  }),
  gender: Joi.string().required()
    .valid('M', 'F')
    .messages({
      'string.empty': 'Nama Panggilan tidak boleh kosong',
      'any.only': 'Gender hanya boleh Perempuan atau Laki-Laki'
  }),
  birthPlace: Joi.string().required().messages({
    'string.empty': 'Tempat Lahir tidak boleh kosong'
  }),
  birthDate: Joi.date().required().messages({
    'date.base': "Tanggal Lahir tidak boleh kosong"
  }),
  phoneNumber: Joi.string()
    .pattern(/^[0-9]+$/)
    .min(10)
    .max(13)
    .required().messages({
      'string.empty': 'No Telefon tidak boleh kosong',
      'string.min': 'No Telfon minimal 10 huruf',
      'string.max': 'No Telfon maximal 13 huruf',
      'string.pattern.base': 'No Telfon tidak boleh mengandung huruf',
  }),
})

function FormInsertRegister( props ) {

  const { sentMessage } = props;

  const { setValue, watch, handleSubmit, formState: { errors }} = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirm: '',
      fullName: '',
      nickName: '',
      identityNumber: '',
      gender: '',
      birthPlace: '',
      birthDate: '',
      phoneNumber: ''
    },
    resolver: joiResolver(schemaFirstRegis)
  });

  const onChangeInput = (value, name) => {
    setValue(name, value);
  }

  const formatBirthDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };

  const onSubmit = (form) => {
    const sentData = {
      email: form.email,
      password: form.password,
      fullName: form.fullName,
      nickName: form.nickName,
      identityNumber: form.identityNumber,
      gender: form.gender,
      birthPlace: form.birthPlace,
      birthDate: formatBirthDate(form.birthDate),
      phoneNumber: form.phoneNumber
    }

		console.log(sentData);

    try {
      postRegister(
        (resMessage) => {
					sentMessage(resMessage);
        },
				sentData
      );
    } catch(error)
    {
      console.log(error);
    }
    
  }

  return (
		<form className='my-3 gap-3' onSubmit={handleSubmit(onSubmit)}>
			<div>
				Form Registrasi
				<input 
					value={watch('email')} 
					className='w-full p-1 my-1 border-2 border-slate-300 rounded-md' 
					placeholder='Email'
					onChange={(e) => onChangeInput(e.target.value, 'email')}/>
				<span className='text-red-600'>{errors.email?.message}</span>

				<input
					type='password'
					value={watch('password')}
					className='w-full p-1 my-1 border-2 border-slate-300 rounded-md' 
					placeholder='Password'
					onChange={(e) => onChangeInput(e.target.value, 'password')}/>
				<span className='text-red-600'>{errors.password?.message}</span>

				<input
					type='password'
					value={watch('confirm')}
					className='w-full p-1 my-1 border-2 border-slate-300 rounded-md' 
					placeholder='Confirm Password'
					onChange={(e) => onChangeInput(e.target.value, 'confirm')}/>
				<span className='text-red-600'>{errors.confirm?.message}</span>
				<div className='mb-5'></div>
			</div>
			<div className='mb-5'>
				Form Data Diri
				<input 
					value={watch('identityNumber')} 
					className='w-full p-1 my-1 border-2 border-slate-300 rounded-md' 
					placeholder='No Induk Kependudukan'
					onChange={(e) => onChangeInput(e.target.value, 'identityNumber')}/>
				<span className='text-red-600'>{errors.identityNumber?.message}</span>

				<input 
					value={watch('fullName')} 
					className='w-full p-1 my-1 border-2 border-slate-300 rounded-md' 
					placeholder='Nama Lengkap'
					onChange={(e) => onChangeInput(e.target.value, 'fullName')}/>
				<span className='text-red-600'>{errors.fullName?.message}</span>

				<input 
					value={watch('nickName')} 
					className='w-full p-1 my-1 border-2 border-slate-300 rounded-md' 
					placeholder='Nama Panggilan'
					onChange={(e) => onChangeInput(e.target.value, 'nickName')}/>
				<span className='text-red-600'>{errors.nickName?.message}</span>

				<select
					value={watch('gender')}
					onChange={(e) => onChangeInput(e.target.value, 'gender')}
					className='w-full p-1 my-1 border-2 border-slate-300 rounded-md'>
						<option value="">Pilih Jenis Kelamin</option>
						<option value="F">Perempuan</option>
						<option value="M">Laki - Laki</option>
				</select>
				<span className='text-red-600'>{errors.gender?.message}</span>

				<input 
					value={watch('birthPlace')} 
					className='w-full p-1 my-1 border-2 border-slate-300 rounded-md' 
					placeholder='Tempat Lahir'
					onChange={(e) => onChangeInput(e.target.value, 'birthPlace')}/>
				<span className='text-red-600'>{errors.birthPlace?.message}</span>

				<input type="date"
					value={watch('birthDate')}
					className='w-full p-1 my-1 border-2 border-slate-300 rounded-md'
					placeholder='Tanggal Lahir'
					onChange={(e) => onChangeInput(e.target.value, 'birthDate')}
				/>
				<span className='text-red-600'>{errors.birthDate?.message}</span>

				<input 
					value={watch('phoneNumber')} 
					className='w-full p-1 my-1 border-2 border-slate-300 rounded-md' 
					placeholder='No Telfon'
					onChange={(e) => onChangeInput(e.target.value, 'phoneNumber')}/>
				<span className='text-red-600'>{errors.phoneNumber?.message}</span>

			</div>
			<div className='flex justify-between'>
        <Link to={"/login"}>
          <Button
            variant="danger">
            Kembali ke Login
          </Button>
        </Link>
        <Button
          type="submit">
          Daftar
        </Button>
      </div>
		</form>
  )
}

export default FormInsertRegister