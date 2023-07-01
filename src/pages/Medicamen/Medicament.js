import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Header from "../Header/Header.js";

const MedicationSchedule = () => {
  const [rows, setRows] = useState([]);
  const [newRow, setNewRow] = useState({ Medicamento: '', time: '' });
  const [editingRow, setEditingRow] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleInputChange = (e) => {
    setNewRow({ ...newRow, [e.target.name]: e.target.value });
  };

  const toggleShow = () => setStaticModal(!staticModal);
  
  const handleAddRow = () => {
    setRows([...rows, newRow]);
    setNewRow({ Medicamento: '', time: '' });
  };

  const handleEditRow = (index) => {
    setEditingRow(index);
    setNewRow(rows[index]);
    setShowEditModal(true);
  };

  const handleUpdateRow = () => {
    setRows((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows[editingRow] = newRow;
      return updatedRows;
    });
    setEditingRow(null);
    setNewRow({ Medicamento: '', time: '' });
    setShowEditModal(false);
  };

  const handleDeleteRow = (index) => {
    setEditingRow(index);
    setShowDeleteModal(true);
  };

  const handleConfirmDeleteRow = () => {
    setRows((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows.splice(editingRow, 1);
      return updatedRows;
    });
    setEditingRow(null);
    setShowDeleteModal(false);
  };

  const handleCloseModals = () => {
    setEditingRow(null);
    setNewRow({ Medicamento: '', time: '' });
    setShowEditModal(false);
    setShowDeleteModal(false);
  };

  return (
    <>
    <Header/>
    <div className="container mt-5">
      <h1 className="text-center mb-4">Medication Schedule</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Medicamento</th>
            <th>Hora</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row.Medicamento}</td>
              <td>{row.time}</td>
              <td>
                <button className="btn btn-primary mr-2" onClick={() => handleEditRow(index)}>Editar</button>
                <button className="btn btn-danger" onClick={() => handleDeleteRow(index)}>Eliminar</button>
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <input
                type="text"
                name="Medicamento"
                value={newRow.Medicamento}
                onChange={handleInputChange}
                className="form-control"
              />
            </td>
            <td>
              <input
                type="time"
                name="time"
                value={newRow.time}
                onChange={handleInputChange}
                className="form-control"
              />
            </td>
            <td>
              <button className="btn btn-success" onClick={handleAddRow}>
                Agregar
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <Modal show={showEditModal} onHide={handleCloseModals}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Registro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label>Medicamento:</label>
            <input
              type="text"
              name="Medicamento"
              value={newRow.Medicamento}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Hora:</label>
            <input
              type="time"
              name="time"
              value={newRow.time}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModals}>Cancelar</Button>
          <Button variant="primary" onClick={handleUpdateRow}>Guardar</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={handleCloseModals}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de eliminar este registro?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModals}>Cancelar</Button>
          <Button variant="danger" onClick={handleConfirmDeleteRow}>Eliminar</Button>
        </Modal.Footer>
      </Modal>
    </div>
    </>
  );
};

export default MedicationSchedule;
