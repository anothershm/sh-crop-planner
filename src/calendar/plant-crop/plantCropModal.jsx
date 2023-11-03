import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import { CropContext } from '../../common/CropContext';
import './plantCropModal.css';
import configData from '../../common/config.json';
import { v4 as uuidv4 } from 'uuid';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons'

const importAll = (r) => {
  let images = {};
  r.keys().map((item) => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
};

const images = importAll(require.context('../../common/crops-icon', false, /\.(png)$/));

function PlantCropModal({ isOpen, onClose, day, season, farmType, year }) {

  // CROP DATA
  const { cropsData, setCropsData } = useContext(CropContext);
  const cropsAvailableToPlant = configData.crops[farmType]?.filter(crop => crop.seasons.includes(season));
  var cropsStored = cropsData && cropsData[year] && cropsData[year][farmType] && cropsData[year][farmType][season]
    ? cropsData[year][farmType][season][day] || []
    : [];

  // State variables for form inputs
  const [selectedCrop, setSelectedCrop] = useState('');
  const [amount, setAmount] = useState(1);


  function getDayOfWeek(day) {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const dayOfWeek = daysOfWeek[(day - 1) % 7];
    return dayOfWeek;
  }

  function getOrdinalIndicator(number) {
    if (number % 100 === 11 || number % 100 === 12 || number % 100 === 13) {
      return number + "th";
    }
    switch (number % 10) {
      case 1:
        return number + "st";
      case 2:
        return number + "nd";
      case 3:
        return number + "rd";
      default:
        return number + "th";
    }
  }


  function saveCrop() {
    setCropsData((prevCropsData) => ({
      ...prevCropsData,
      [year]: {
        ...(prevCropsData[year] || {}),
        [farmType]: {
          ...(prevCropsData[year]?.[farmType] || {}),
          [season]: {
            ...(prevCropsData[year]?.[farmType]?.[season] || {}),
            [day]: [
              ...(prevCropsData[year]?.[farmType]?.[season]?.[day] || []),
              {
                id: selectedCrop,
                amount: parseInt(amount),
              },
            ],
          },
        },
      },
    }));
    setSelectedCrop('');
    setAmount('1');
  }

  function deleteCrop(cropIndex) {
    setCropsData((prevCropsData) => {
      const updatedCrops = [
        ...(prevCropsData[year]?.[farmType]?.[season]?.[day] || []),
      ];
      updatedCrops.splice(cropIndex, 1);
  
      return {
        ...prevCropsData,
        [year]: {
          ...prevCropsData[year],
          [farmType]: {
            ...prevCropsData[year]?.[farmType],
            [season]: {
              ...prevCropsData[year]?.[farmType]?.[season],
              [day]: updatedCrops,
            },
          },
        },
      };
    });
  }
  

  return (
    <Modal show={isOpen} onHide={() => onClose()} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title> {season} in {farmType} - {getDayOfWeek(day)} the {getOrdinalIndicator(day)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="cropToPlant">Crop</Form.Label>
            <Form.Select id="cropToPlant" value={selectedCrop} onChange={(e) => setSelectedCrop(e.target.value)}>
              <option>Select Crop to plant</option>
              {cropsAvailableToPlant.map((crop) => (
                <option key={crop.id} value={crop.id}>
                  {crop.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label htmlFor="amount">Amount</Form.Label>
            <Form.Control type="number" placeholder="1" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </Form.Group>
          <Button variant="primary" onClick={() => saveCrop()}> Plant</Button>
        </Form>
        {cropsStored ? (

          <table className="table">
            <thead>
              <tr>
                <th scope="col">Crop</th>
                <th scope="col">Amount</th>
                <th scope="col">Cost</th>
                <th scope="col">Days</th>
                <th scope="col">Regrows</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(cropsStored).map(([index, crop]) => {
                const cropConfig = cropsAvailableToPlant.filter(cropConfig => cropConfig.id === crop.id)[0]
                return (
                  <tr key={index}>
                    <td><img src={images[crop.id + '.png']} alt={crop.name} /> {cropConfig.name}</td>
                    <td>{crop.amount}</td>
                    <td>-{cropConfig.buy * crop.amount}</td>
                    <td>{cropConfig.grow}</td>
                    <td>{cropConfig.regrow == 0 ? "" : cropConfig.regrow}</td>
                    <td><Button variant="primary" onClick={() => onClose()}>
                      <FontAwesomeIcon icon={faPencil} />
                    </Button></td>
                    <td><Button variant="primary" onClick={() => deleteCrop(index)}>
                      <FontAwesomeIcon icon={faTrashCan} />
                    </Button></td>
                  </tr>
                )
              })

              }

            </tbody>
          </table>
        ) : <></>

        }
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => onClose()}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PlantCropModal;