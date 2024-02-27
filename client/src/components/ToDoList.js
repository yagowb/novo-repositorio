import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './ToDoList.css';



function ToDoList() {
  const [todos, setTodos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTodo, setNewTodo] = useState({ titulo: '', descricao: '', data: '', hora: '' });
  const [editingTodo, setEditingTodo] = useState(null);


  axios.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-TOKEN': window.csrf_token
};

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/todos');
      console.log(response);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleAddTodo = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/todos', {
        titulo: newTodo.titulo,
        descricao: newTodo.descricao,
        data: newTodo.data,
        hora: newTodo.hora
      });
      console.log(response);
      setTodos([...todos, response.data]);
      setNewTodo({ titulo: '', descricao: '', data: '', hora: '' });
      setShowModal(false);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
  };


  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/api/todos/${editingTodo.id}`, {
        titulo: editingTodo.titulo,
        descricao: editingTodo.descricao,
        data: editingTodo.data,
        hora: editingTodo.hora
      });
      console.log(response);

      const updatedTodos = todos.map((todo) => {
        if (todo.id === editingTodo.id) {
          return response.data;
        }
        return todo;
      });
      setTodos(updatedTodos);

      setEditingTodo(null);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingTodo({
      ...editingTodo,
      [name]: value
    });
  };

  const renderEditForm = () => {
    if (!editingTodo) {
      return null;
    }

    return (
      <Form>
        <Form.Group controlId="formTitulo">
          <Form.Label>Título</Form.Label>
          <Form.Control
            type="text"
            name="titulo"
            value={editingTodo.titulo}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formDescricao">
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            type="text"
            name="descricao"
            value={editingTodo.descricao}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formData">
          <Form.Label>Data</Form.Label>
          <Form.Control
            type="date"
            name="data"
            value={editingTodo.data}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formHora">
          <Form.Label>Hora</Form.Label>
          <Form.Control
            type="time"
            name="hora"
            value={editingTodo.hora}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="secondary" onClick={handleCancelEdit}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleUpdate}>
          Atualizar
        </Button>
      </Form>
    );
  };


  const renderTodos = () => {
    return todos.map((todo) => (
      <div key={todo.id} className="col-md-4 mb-4">
        <Card>
          <Card.Body>
            <Card.Title>{todo.titulo}</Card.Title>
            <Card.Text>{todo.descricao}</Card.Text>
            <Card.Text>{todo.data} - {todo.hora}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <Button id='editbutton' variant="warning" onClick={() => handleEdit(todo)}>
              <FaEdit />
            </Button>
            <Button id='deletebutton' variant="danger" onClick={() => handleDelete(todo.id)}>
              <FaTrash />
            </Button>
          </Card.Footer>
        </Card>
      </div>
    ));
  };



  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/todos/${id}`);
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };


  return (
    <div>
      <br></br><br></br>
      <h1>ToDo List</h1>
      <br></br><br></br>
      <Button variant="primary" onClick={() => setShowModal(true)}>Adicionar Todo</Button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitulo">
              <Form.Label>Título</Form.Label>
              <Form.Control type="text" placeholder="Título" value={newTodo.titulo} onChange={(e) => setNewTodo({ ...newTodo, titulo: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formDescricao">
              <Form.Label>Descrição</Form.Label>
              <Form.Control type="text" placeholder="Descrição" value={newTodo.descricao} onChange={(e) => setNewTodo({ ...newTodo, descricao: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formData">
              <Form.Label>Data</Form.Label>
              <Form.Control type="date" value={newTodo.data} onChange={(e) => setNewTodo({ ...newTodo, data: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formHora">
              <Form.Label>Hora</Form.Label>
              <Form.Control type="time" value={newTodo.hora} onChange={(e) => setNewTodo({ ...newTodo, hora: e.target.value })} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
          <Button variant="primary" onClick={handleAddTodo}>Adicionar</Button>
        </Modal.Footer>
      </Modal>
      <br></br><br></br>
      <div className="row">
        {todos.map((todo) => (
          <div key={todo.id} className="col-md-4 mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{todo.titulo}</Card.Title>
                <Card.Text>{todo.descricao}</Card.Text>
                <Card.Text>{todo.data} - {todo.hora}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <Button id='editbutton' variant="warning" onClick={() => handleEdit(todo)}>
                  <FaEdit />
                </Button>
                <Button id='deletebutton' variant="danger" onClick={() => handleDelete(todo.id)}>
                  <FaTrash />
                </Button>
              </Card.Footer>
            </Card>
          </div>
        ))}
      </div>
      {renderEditForm()}
    </div>
  );

}

export default ToDoList;
