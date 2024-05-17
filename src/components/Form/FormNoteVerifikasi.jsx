import { useState } from 'react';
import { patchNote } from '../../services/verification.service';
import Input from '../Input/Input';

function FormNoteVerifikasi(props) {
	const { data, showAlert} = props;
	const [messageValidationField, setMessageValidaationField] = useState({});

	const handleSubmit = (e) => {
		e.preventDefault();
		let noteVal = e.target.notes.value || null;

		if (!data) {
			const dataNote = {
				name: noteVal,
			};
			patchNote(
				(resMessage) => {
					showAlert(resMessage);
				}, 
				data.id, 
				dataNote
			);
		}
	};
return (
	<div>
		<form 
			id="form-insert-note" 
			onSubmit={handleSubmit} 
			className='flex flex-col gap-2'
		>
			<div>
				<Input
					placeholder="Masukkan notes"
					name="rejectionNote"
					grow
				>
					Catatan Penolakan
				</Input>
			</div>
		</form>
	</div>
)
}

export default FormNoteVerifikasi
