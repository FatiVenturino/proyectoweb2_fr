import React from 'react';
import CatalogoProductos from './components/CatalogoProductos';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Mi Tienda Online</h1>
      </header>
      <main>
        <CatalogoProductos />
      </main>
    </div>
  );
}

export default App; 