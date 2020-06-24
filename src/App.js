import React, { useState, useEffect } from "react";

import api from './services/api'

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  const handleAddRepository = () => {
    api.post('repositories', {
      url: "https://github.com/helderavila",
      title: "Desafio",
      techs: ["React", "Node.js"],
    }).then(response => setRepositories([...repositories, response.data]))
  }

  const handleRemoveRepository = (id) => {
    api.delete(`repositories/${id}`).then(response => {
      const filteredRepositories = repositories.filter(repository => repository.id !== id)
      setRepositories(filteredRepositories)
    })

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories && repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
          </button>
          </li>
        ))}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
