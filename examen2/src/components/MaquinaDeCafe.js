// CoffeeMachine.js
import React, { useState } from 'react';
import CoffeeItem from './cafeItem';
import 'bootstrap/dist/css/bootstrap.min.css';

const MaquinaDeCafe = () => {
  const [tipoCafeSeleccionado, setTipoCafeSeleccionado] = useState('');
  const [cantidadSeleccionada, setCantidadSeleccionada] = useState(1); // Se inicia con la cantidad predeterminada de 1
  const [cafes, setCafes] = useState([
    { tipo: 'Americano', cantidad: 10, precio: 850 },
    { tipo: 'Capuchino', cantidad: 8, precio: 950 },
    { tipo: 'Latte', cantidad: 10, precio: 1150 },
    { tipo: 'Mocachino', cantidad: 15, precio: 1300 },
  ]);

  const realizarCompra = () => {
    const indiceCafeSeleccionado = cafes.findIndex((cafe) => cafe.tipo === tipoCafeSeleccionado);

    if (indiceCafeSeleccionado !== -1) {
      const cafeSeleccionado = cafes[indiceCafeSeleccionado];
      if (cantidadSeleccionada > 0 && cantidadSeleccionada <= cafeSeleccionado.cantidad) {
        const cafesActualizados = [...cafes];
        cafesActualizados[indiceCafeSeleccionado].cantidad -= cantidadSeleccionada;
        setCafes(cafesActualizados);
      } else {
        alert('Cantidad inválida');
      }
    }
  };

  const calcularCostoTotal = () => {
    const indiceCafeSeleccionado = cafes.findIndex((cafe) => cafe.tipo === tipoCafeSeleccionado);

    if (indiceCafeSeleccionado !== -1) {
      const cafeSeleccionado = cafes[indiceCafeSeleccionado];
      return cantidadSeleccionada * cafeSeleccionado.precio;
    }

    return 0;
  };

  return (
    <div className="container text-center mt-4">
      <h1>Máquina de Café</h1>

      <div className="row justify-content-center">
        {cafes.map((cafe, index) => (
          <div key={index} className="col-md-6 mb-4">
            <CoffeeItem {...cafe} />
          </div>
        ))}
      </div>

      <div className="row justify-content-center mt-4">
        <div className="col-md-6">
          <select className="form-control" onChange={(e) => setTipoCafeSeleccionado(e.target.value)}>
            <option value="">Seleccione el tipo de café...</option>
            {cafes.map((cafe, index) => (
              <option key={index} value={cafe.tipo}>
                {cafe.tipo}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="row justify-content-center mt-2">
        <div className="col-md-6">
          <label>Cantidad:</label>
          <input
            type="number"
            className="form-control"
            value={cantidadSeleccionada}
            onChange={(e) => setCantidadSeleccionada(parseInt(e.target.value))}
          />
        </div>
      </div>

      <div className="row justify-content-center mt-2">
        <div className="col-md-6">
          <button className="btn btn-primary btn-block" onClick={realizarCompra}>
            Comprar
          </button>
        </div>
      </div>

      <div className="row justify-content-center mt-2">
        <div className="col-md-6">
          <p>Total: {calcularCostoTotal()} colones</p>
        </div>
      </div>
    </div>
  );
};

export default MaquinaDeCafe;
