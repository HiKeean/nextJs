import React from 'react';
import { Form } from 'react-bootstrap';

const FormSelector = ({ selectedForm, handleFormChange }) => {
  return (
    <Form style={{ marginTop: '100px' }}>
      <Form.Group>
        <Form.Check
          inline
          type="radio"
          className='pr-5'
          label={<span className="bold-label" style={{ fontWeight: selectedForm === 'tiket' ? 'bold' : 'normal' }}>Tiket</span>}
          name="formType"
          value="tiket"
          checked={selectedForm === 'tiket'}
          onChange={handleFormChange}
        />
        <Form.Check
          inline
          type="radio"
          label={<span className="bold-label" style={{ fontWeight: selectedForm === 'hotel' ? 'bold' : 'normal' }}>Hotel</span>}
          name="formType"
          value="hotel"
          checked={selectedForm === 'hotel'}
          onChange={handleFormChange}
        />
      </Form.Group>
    </Form>
  );
};

export default FormSelector;
