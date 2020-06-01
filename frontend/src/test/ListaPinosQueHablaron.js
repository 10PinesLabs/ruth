import React from 'react';

function FilaTitulos() {
  return <tr>
    <th>
      Nº
    </th>
    <th>
      Pino
    </th>
    <th>
      Tiempo
    </th>
    <th>
      De acuerdo
    </th>
    <th>
      Redondeando
    </th>
    <th>
      No de acuerdo
    </th>
    <th>
      Resumen
    </th>
  </tr>;
}

const FilaPino = (props) => <tr>
    <th>
      {props.orden}
    </th>
    <th>
      {props.pino.nombre}
    </th>
    <th>
      3:46
    </th>
    <th>
      7
    </th>
    <th>
      12
    </th>
    <th>
      3
    </th>
    <th>
      <p>Cualquier yerba dijo el pibe</p> <button>EDITAR</button>
    </th>
  </tr>;

const pinosQueHablaron = [
  { nombre: 'Ignacio' },
  { nombre: 'Lautaro' },
  { nombre: 'Mauro' },
];

const ListaPinosQueHablaron = () => (
  <table>
    <FilaTitulos/>
    { pinosQueHablaron
      .map((pino, index) => <FilaPino
        pino = {pino}
        orden = {index + 1}/>)
    }
  </table>
);

export default ListaPinosQueHablaron;
