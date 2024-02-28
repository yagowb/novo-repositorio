import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function EditToDoModal({ todo, onUpdate, onCancel }) {
  const [updatedTodo, setUpdatedTodo] = useState(todo);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTodo({
      ...updatedTodo,
      [name]: value
    });
  };

  const handleSubmit = () => {
    onUpdate(updatedTodo);
  };

  return (
    <Modal show={true} onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Tarefa</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTitulo">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              name="titulo"
              value={updatedTodo.titulo}
              onChange={handleInputChange}
            />
          </Form.Group>
          <br></br>
          <Form.Group controlId="formDescricao">
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              type="text"
              name="descricao"
              value={updatedTodo.descricao}
              onChange={handleInputChange}
            />
          </Form.Group>
          <br></br>
          <Form.Group controlId="formData">
            <Form.Label>Data</Form.Label>
            <Form.Control
              type="date"
              name="data"
              value={updatedTodo.data}
              onChange={handleInputChange}
            />
          </Form.Group>
          <br></br>
          <Form.Group controlId="formHora">
            <Form.Label>Hora</Form.Label>
            <Form.Control
              type="time"
              name="hora"
              value={updatedTodo.hora}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditToDoModal;
