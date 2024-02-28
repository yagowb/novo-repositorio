import axios from 'axios';

axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest',
  'X-CSRF-TOKEN': window.csrf_token
};

export const fetchTodos = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/todos');
    return response.data;
  } catch (error) {
    console.error('Erro recebendo todos:', error);
    return [];
  }
};

export const addTodo = async (newTodo) => {
  try {
    const response = await axios.post('http://localhost:8000/api/todos', newTodo);
    return response.data;
  } catch (error) {
    console.error('Erro adicionando todo:', error);
    return null;
  }
};

export const updateTodo = async (updatedTodo) => {
  try {
    const response = await axios.put(`http://localhost:8000/api/todos/${updatedTodo.id}`, updatedTodo);
    return response.data;
  } catch (error) {
    console.error('Erro atualizando todo:', error);
    return null;
  }
};

export const deleteTodo = async (id) => {
  try {
    await axios.delete(`http://localhost:8000/api/todos/${id}`);
    return true;
  } catch (error) {
    console.error('Erro deletando todo:', error);
    return false;
  }
};
