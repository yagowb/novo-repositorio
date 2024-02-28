import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { addTodo } from './todoHandlers.js';

function AddToDoModal({ show, onClose }) {
  const [newTodo, setNewTodo] = useState({ titulo: '', descricao: '', data: '', hora: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTodo((prevTodo) => ({
      ...prevTodo,
      [name]: value
    }));
  };

  const handleAddTodo = async () => {
    const addedTodo = await addTodo(newTodo);
    if (addedTodo) {
      setNewTodo({ titulo: '', descricao: '', data: '', hora: '' });
      console.log('Nova tarefa:', newTodo);
      onClose();
      window.location.reload(true);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Adicionar Tarefa</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTitulo">
            <Form.Label>Título</Form.Label>
            <Form.Control
            type="text"
            placeholder="Título"
            name="titulo"
            value={newTodo.titulo}
            onChange={handleInputChange}
            />
          </Form.Group>
          <br></br>
          <Form.Group controlId="formDescricao">
            <Form.Label>Descrição</Form.Label>
            <Form.Control
            type="text"
            placeholder="Descrição"
            name="descricao"
            value={newTodo.descricao}
            onChange={handleInputChange}
            />
          </Form.Group>
          <br></br>
          <Form.Group controlId="formData">
            <Form.Label>Data</Form.Label>
            <Form.Control
            type="date"
            name="data"
            value={newTodo.data}
            onChange={handleInputChange}
            />
          </Form.Group>
          <br></br>
          <Form.Group controlId="formHora">
            <Form.Label>Hora</Form.Label>
            <Form.Control
            type="time"
            name="hora"
            value={newTodo.hora}
            onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button variant="primary" onClick={handleAddTodo}>Adicionar</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddToDoModal;
