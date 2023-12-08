import React, { useState } from 'react';
import CoffeeItem from './cafeItem';
import 'bootstrap/dist/css/bootstrap.min.css';

const MaquinaDeCafe = () => {
  const [tipoCafeSeleccionado, setTipoCafeSeleccionado] = useState('');
  const [cantidadSeleccionada, setCantidadSeleccionada] = useState(0);
  const [dineroIngresado, setDineroIngresado] = useState(0);
  const [vuelto, setVuelto] = useState({ monto: 0, desglose: [] });
  const [cafes, setCafes] = useState([
    { tipo: 'Americano', cantidad: 10, precio: 850 },
    { tipo: 'Capuchino', cantidad: 8, precio: 950 },
    { tipo: 'Latte', cantidad: 10, precio: 1150 },
    { tipo: 'Mocachino', cantidad: 15, precio: 1300 },
  ]);

  const cantidadesIniciales = {
    1000: 20,
    500: 20,
    100: 30,
    50: 50,
    25: 25,
  };

  const [cantidadMonedas, setCantidadMonedas] = useState({ ...cantidadesIniciales });

  const realizarCompra = () => {
    const indiceCafeSeleccionado = cafes.findIndex((cafe) => cafe.tipo === tipoCafeSeleccionado);
  
    if (indiceCafeSeleccionado !== -1) {
      const cafeSeleccionado = cafes[indiceCafeSeleccionado];
      const costoTotal = cantidadSeleccionada * cafeSeleccionado.precio;
  
      if (dineroIngresado >= costoTotal) {
        if (cafeSeleccionado.cantidad > 0 && cantidadSeleccionada <= cafeSeleccionado.cantidad) {
          const cambio = dineroIngresado - costoTotal;
  
          // Lógica para el desglose de monedas
          const desgloseMonedas = [];
          let cantidadActual = cambio;
  
          // Restar monedas de 500
          const monedas500 = Math.floor(cantidadActual / 500);
          if (monedas500 > 0) {
            desgloseMonedas.push({ valor: 500, cantidad: monedas500 });
            cantidadActual -= monedas500 * 500;
          }
  
          // Restar monedas de 100
          const monedas100 = Math.floor(cantidadActual / 100);
          if (monedas100 > 0) {
            desgloseMonedas.push({ valor: 100, cantidad: monedas100 });
            cantidadActual -= monedas100 * 100;
          }
  
          // Restar monedas de 50
          const monedas50 = Math.floor(cantidadActual / 50);
          if (monedas50 > 0) {
            desgloseMonedas.push({ valor: 50, cantidad: monedas50 });
            cantidadActual -= monedas50 * 50;
          }
  
          // Restar monedas de 25
          const monedas25 = Math.floor(cantidadActual / 25);
          if (monedas25 > 0) {
            desgloseMonedas.push({ valor: 25, cantidad: monedas25 });
            cantidadActual -= monedas25 * 25;
          }
  
          setVuelto({ monto: cambio, desglose: desgloseMonedas });
  
          // Restablecer otros estados
          const cafesActualizados = [...cafes];
          cafesActualizados[indiceCafeSeleccionado].cantidad -= cantidadSeleccionada;
          setCafes(cafesActualizados);
          setDineroIngresado(0);
          setTipoCafeSeleccionado('');
          setCantidadSeleccionada(1);
        } else {
          alert('Cantidad de café insuficiente');
        }
      } else {
        alert('Dinero insuficiente');
      }
    }
  };

  const agregarDinero = (denominacion) => {
    const dineroActualizado = { ...cantidadMonedas };
    dineroActualizado[denominacion]++;
    setCantidadMonedas(dineroActualizado);
    setDineroIngresado(dineroIngresado + parseInt(denominacion));
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
      <div style={{ border: '2px solid #ccc', padding: '20px', borderRadius: '10px', width: '700px', margin: 'auto' }}>
          <h2>Opciones:</h2>
        <div className="row justify-content-center">
          {cafes.map((cafe, index) => (
            <div key={index} className="col-md-3 mb-6">
              <CoffeeItem {...cafe} />
            </div>
          ))}
        </div>
      </div>
      <div style={{ border: '2px solid #ccc', padding: '20px', borderRadius: '10px', width: '700px', margin: 'auto' }}>
        <h2>Comprar café:</h2>
        <div className="row justify-content-center mt-4">
          <div className="col-md-6">
            <select
              className="form-control"
              value={tipoCafeSeleccionado}
              onChange={(e) => setTipoCafeSeleccionado(e.target.value)}
            >
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
              value={tipoCafeSeleccionado === '' ? 0 : cantidadSeleccionada}
              onChange={(e) => setCantidadSeleccionada(parseInt(e.target.value))}
            />
          </div>
        </div>

        <div className="row justify-content-center mt-2">
          <div className="col-md-6">
            <p>Total: {calcularCostoTotal()} colones</p>
          </div>
        </div>

        <div className="row justify-content-center mt-2">
          <div className="col-md-6">
            <button className="btn btn-primary btn-block" onClick={realizarCompra}>
              Comprar
            </button>
          </div>
        </div>
      </div>
      <div style={{ border: '2px solid #ccc', padding: '20px', borderRadius: '10px', width: '700px', margin: 'auto' }}>
        <div className="text-center">
          <h2>Agregar Dinero</h2>
          <p>Dinero agregado: {dineroIngresado} colones</p>
          <div className="btn-group">
            <button className="btn btn-secondary" onClick={() => agregarDinero('1000')}>
              ₡1000
            </button>
            <button className="btn btn-secondary" onClick={() => agregarDinero('500')}>
              ₡500
            </button>
            <button className="btn btn-secondary" onClick={() => agregarDinero('100')}>
              ₡100
            </button>
            <button className="btn btn-secondary" onClick={() => agregarDinero('50')}>
              ₡50
            </button>
            <button className="btn btn-secondary" onClick={() => agregarDinero('2')}>
              ₡25
            </button>
          </div>
        </div>
      </div>
      <div className="justify-content-center">
        {vuelto.monto > 0 && (
          <div style={{ border: '2px solid #ccc', padding: '20px', borderRadius: '10px', width: '700px', margin: 'auto' }}>
            <div className="row justify-content-center mt-4">
              <div className="col-md-6">
                <p>Su vuelto es de {vuelto.monto} colones.</p>
                <p>Desglose:</p>
                {vuelto.desglose.map((moneda, index) => (
                  <p key={index}>
                    {moneda.cantidad} moneda(s) de {moneda.valor} colones
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>


  );
};

export default MaquinaDeCafe;
