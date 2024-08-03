import React, { useState } from 'react';
import axios from 'axios';

const EncryptData = () => {
  const initialData = {
    merchantId: "",
    amount: "",
    terminalId: "",
    merchantTranId: "",
    billNumber: "",
    validatePayerAccFlag: "",
    payerAccount: "",
    payerIFSC: ""
  };

  const [formData, setFormData] = useState(initialData);
  const [encryptedData, setEncryptedData] = useState(null);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({
    MerchantId: '',
    amount: '',
    terminalId: '',
    merchantTranId: '',
    billNumber: '',
    validatePayerAccFlag: '',
    payerAccount: '',
    payerIFSC: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEncrypt = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('http://172.16.13.46:8081/encrypt', formData);
        setEncryptedData(response.data);
        setError(null);
      } catch (err) {
        setError('Error encrypting data');
        setEncryptedData(null);
      }
    }
  };

  const validateForm = () => {
    let valid = true;
    const errorsCopy = { ...errors };

    Object.keys(formData).forEach((key) => {
      if (formData[key].trim()) {
        errorsCopy[key] = '';
      } else {
        errorsCopy[key] = `${key} is required`;
        valid = false;
      }
    });

    setErrors(errorsCopy);
    return valid;
  };

  return (
    <div className='container'>
      <br /> <br />
      <div className='row'>
        <div className='card col-md-6 offset-md-3 offset-md-3'>
          <h2 className='text-center'>Encrypt Data</h2>
          <div className='card-body'>
            <form>
              {Object.keys(initialData).map((key) => (
                <div className='form-group mb-2' key={key}>
                  <label className='form-label'>{key}:</label>
                  <input
                    type='text'
                    placeholder={`Enter ${key}`}
                    name={key}
                    value={formData[key]}
                    className={`form-control ${errors[key] ? 'is-invalid' : ''}`}
                    onChange={handleChange}
                  />
                  {errors[key] && <div className='invalid-feedback'>{errors[key]}</div>}
                </div>
              ))}
              <button className='btn btn-success' onClick={handleEncrypt}>Encrypt Data</button>
            </form>
            {encryptedData && (
              <div className='mt-3'>
                <h2>Encrypted Data</h2>
                <pre>{JSON.stringify(encryptedData, null, 2)}</pre>
              </div>
            )}
            {error && (
              <div className='mt-3'>
                <h2>Error</h2>
                <p>{error}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EncryptData;
