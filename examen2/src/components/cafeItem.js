import React from 'react';

const CoffeeItem = ({ tipo, cantidad, precio }) => (
  <div>
    <h3>{tipo}</h3>
    <p>Cantidad: {cantidad}</p>
    <p>Precio: {precio} colones</p>
  </div>
);

export default CoffeeItem;
