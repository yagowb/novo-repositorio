import axios from 'axios';

axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest',
  'X-CSRF-TOKEN': window.csrf_token
};

export const fetchTodos = async () => {
    try {
        const { data } = await axios.get('http://localhost:8000/api/todos');
        return data;
    } catch (error) {
        console.error('Error fetching todos:', error);
        return [];
    }
};

export const addTodo = async (newTodo) => {
    const response = await fetch('http://localhost:8000/api/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
    });

    if (!response.ok) {
        console.error('Erro adicionando todo:', response.statusText);
        return null;
    }

    return await response.json();
};

export const updateTodo = async (updatedTodo) => {
    const response = await fetch(`http://localhost:8000/api/todos/${updatedTodo.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
    });

    if (response.ok) {
        return await response.json();
    } else {
        console.error('Erro atualizando todo:', response.status);
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
