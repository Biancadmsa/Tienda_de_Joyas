const express = require('express');
const joyasData = require('./data/joyas.js').results; 
const path = require('path');
const app = express();
const port = 3000;

app.use('/static', express.static(path.join(__dirname, 'data')));

app.get('/', (req, res) => {
  const htmlResponse = `
  <div style="position: relative; width: 100%; height: 100vh; background-image: url('/static/img1.jpg'); opacity: 0.8; background-size: cover; background-repeat: no-repeat; background-attachment: fixed;">
    <div style="position: absolute; top: 20%; left: 50%; transform: translate(-50%, -50%); text-align: center; width: 100%;">
      <div style="background: white; padding: 1px; opacity:0.8">
        <h1 style="color: #ffd700; font-size: 3rem; font-weight: 600;">
          <span>&#x1F48D;&#x1F48E;&#x1F48D;</span>
          Tienda de Joyas "Serena's Radiance"
          <span>&#x1F48D;&#x1F48E;&#x1F48D;</span>
        </h1>
      </div>
    </div>
  </div>
`;

  res.send(htmlResponse);
});


// Función para generar enlaces HATEOAS (simplificado para ejemplo)
function generarEnlacesHATEOAS(joyas) {
  return joyas.map(joya => ({
    id: joya.id,
    nombre: joya.name,
    enlace: `/joya/${joya.id}`
  }));
}

// Función para ordenar joyas por valor
function ordenarPorValor(orden) {
  const joyasOrdenadas = [...joyasData];
  if (orden === "asc") {
    joyasOrdenadas.sort((a, b) => a.value - b.value);
  } else if (orden === "desc") {
    joyasOrdenadas.sort((a, b) => b.value - a.value);
  }
  return joyasOrdenadas;
}

// Función para encontrar una joya por ID
function encontrarJoyaPorId(id) {
  return joyasData.find(joya => joya.id === parseInt(id));
}

// Ruta GET /joyas
app.get('/joyas', (req, res) => {
  const joyasHATEOAS = generarEnlacesHATEOAS(joyasData);
  res.json(joyasHATEOAS);
});

// Ruta GET /joyas/categoria/:categoria
app.get('/joyas/categoria/:categoria', (req, res) => {
  const { categoria } = req.params;
  const joyasFiltradas = joyasData.filter(joya => joya.category === categoria);
  res.json(joyasFiltradas);
});

// Ruta GET /joyas/filtrar?campos=metal,category
app.get('/joyas/filtrar', (req, res) => {
  const { campos } = req.query;
  if (!campos) {
    return res.status(400).json({ error: "Falta el parámetro 'campos'." });
  }
  const camposSeleccionados = campos.split(",").reduce((acc, campo) => {
    if (campo in joyasData[0]) {
      acc[campo] = joyasData.map(joya => joya[campo]);
    }
    return acc;
  }, {});
  res.json(camposSeleccionados);
});

// Ruta GET /joya/:id
app.get('/joya/:id', (req, res) => {
  const { id } = req.params;
  const joyaEncontrada = encontrarJoyaPorId(id);
  if (joyaEncontrada) {
    res.json(joyaEncontrada);
  } else {
    res.status(404).json({ error: "404 Not Found", mensaje: "No existe una joya con ese ID." });
  }
});

// Ruta GET /joyas con paginación y ordenamiento
app.get('/joyas_paginadas', (req, res) => {
  let { pagina, orden } = req.query;
  let joyasRetornar = [...joyasData];

  if (orden === "asc" || orden === "desc") {
    joyasRetornar = ordenarPorValor(orden);
  }

  const elementosPorPagina = 2;
  if (pagina) {
    const indiceInicio = (pagina - 1) * elementosPorPagina;
    joyasRetornar = joyasRetornar.slice(indiceInicio, indiceInicio + elementosPorPagina);
  }

  res.json(joyasRetornar);
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
