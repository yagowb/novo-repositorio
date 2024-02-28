import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { fetchTodos, deleteTodo, updateTodo } from './todoHandlers';
import { FaEdit, FaTrash } from 'react-icons/fa';
import AddToDoModal from './AddToDoModal';
import EditToDoModal from './EditToDoModal';
import '../App.css';





function ToDoList() {
  const [todos, setTodos] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);


  useEffect(() => {
    fetchAllTodos();
  }, []);


  const fetchAllTodos = async () => {
    const todos = await fetchTodos();
    setTodos(todos);
  };


  const handleEdit = (todo) => {
    setEditingTodo(todo);
  };


  const handleCancelEdit = () => {
    setEditingTodo(null);
  };


  const handleUpdate = async (updatedTodo) => {
    const updated = await updateTodo(updatedTodo);
    if (updated) {
      const updatedTodos = todos.map((todo) => {
        if (todo.id === updatedTodo.id) {
          return updatedTodo;
        }
        return todo;
      });
      setTodos(updatedTodos);
      setEditingTodo(null);
    }
  };


  const handleDelete = async (id) => {
    const deleted = await deleteTodo(id);
    if (deleted) {
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    }
  };



  return (
    <div>
      <br></br><br></br>
      <br></br><br></br>
      <Button
      id="addbutton"
      className="btn btn-primary btn-lg round"
      onClick={() => setShowAddModal(true)}>Adicionar uma Tarefa</Button>
      <AddToDoModal show={showAddModal} onClose={() => setShowAddModal(false)} />
      <br></br><br></br>
      <div className="row">
        {todos.map((todo) => (
          <div key={todo.id} className="col-md-4 mb-4">
            <Card id="card">
              <Card.Body>
                <Card.Title id="titulo">{todo.titulo}</Card.Title>
                <Card.Text id="descricao">{todo.descricao}</Card.Text>
                <Card.Text id="datahora">{todo.data} - {todo.hora}</Card.Text>
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
      {editingTodo && (
        <EditToDoModal
          todo={editingTodo}
          onUpdate={handleUpdate}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
}

export default ToDoList;
