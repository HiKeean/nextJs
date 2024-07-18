import React, { useState } from 'react';
import authMiddleware from '../../middleware/authMiddleware';
import Navbar from '../components/navbar';
import FormTiket from '../components/fakturtiketform';
import HotelForm from '../components/FormHotel';
import { Container } from 'react-bootstrap';
import FormSelector from '../components/formselector';

const CreateFakturTiket = () => {
  const [selectedForm, setSelectedForm] = useState('tiket');

  const handleFormChange = (e) => {
    setSelectedForm(e.target.value);
  };

  return (
    <>
      <div className='Navbar'>
        <Navbar />
      </div>
      <Container className='pt-3 pb-5'>
        <FormSelector selectedForm={selectedForm} handleFormChange={handleFormChange} />
        {selectedForm === 'tiket' ? <FormTiket /> : <HotelForm />}
      </Container>
    </>
  );
};

export default authMiddleware(CreateFakturTiket);
