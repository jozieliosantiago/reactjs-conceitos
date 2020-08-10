import React, { useEffect, useState } from "react";

import api from './services/api';
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState(null);
  const [newRepository, setNewRepository] = useState('');

  useEffect(() => {
    async function fetchRepositories() {
      try {
        const response = await api.get('/repositories');
        const { data } = response;

        setRepositories(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchRepositories();
  }, [])

  async function handleAddRepository() {
    const body = {
      title: newRepository.trim(),
    }

    try {
      const response = await api.post('/repositories', body);
      const { data } = response;
      console.log(repositories)

      setRepositories((state) => [...state, data])

    } catch (error) {
      console.log(error);
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`);

      const repositoriyList = repositories.filter((repositoriy) => repositoriy.id !== id);
      setRepositories(repositoriyList);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container">
      <div className="content">
        <h1>Lista de Repositórios</h1>

        <div className="search">
          <input value={newRepository} onChange={(e) => setNewRepository(e.target.value)} />
          <button onClick={handleAddRepository}>Adicionar</button>
        </div>

        <ul data-testid="repository-list">
          {repositories && repositories.map((repository) => (
            <li key={repository.id}>
              <div>
                <h4>{repository.title}</h4>
              </div>
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
            </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
