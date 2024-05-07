import { useState } from 'react';
import Modal from '../../components/Modal.jsx';
import FormInsertRegister from './../../components/Form/FormInsertRegister.jsx';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [messageSuccess, setMessageSuccess] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const onCloseHandle = () => {
    setShowSuccess(false);
    navigate('/');
  }

  const handleMessage = (res) => {
    setMessageSuccess(res);
    setShowSuccess(true);
  }

  return (
    <>
      <div>
        <div>
          <div className='signupForm'>
            <FormInsertRegister 
              sentMessage={handleMessage}/>
          </div>
        </div>
      </div>
      <Modal
        onClose={onCloseHandle}
        visible={showSuccess}
        title="Sukses">
          {messageSuccess}
        </Modal>
    </>
    
  )
}

export default Register