import React from 'react';

function FilaTitulos() {
  return <thead>
  <tr>
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
  </tr>

  </thead>;
}

function getMinutes(timestamp) {
  const date = new Date(timestamp);
  return `${date.getMinutes()}:${date.getSeconds()}`;
}

const FilaPino = (props) => <tbody>
<tr>
  <th>
    {props.orden}
  </th>
  <th>
    {props.pino.usuario.nombre}
  </th>
  <th>
    {getMinutes(props.pino.fin - props.pino.inicio)}
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
    <p>Cualquier yerba dijo el pibe</p>
    <button>EDITAR</button>
  </th>
</tr>

</tbody>;

const ListaPinosQueHablaron = (props) => (
  <table>
    <FilaTitulos/>
    {props.tema.oradores.pasados
      .map((pino, index) => <FilaPino
        pino={pino}
        orden={index + 1}/>)
    }
  </table>
);

export default ListaPinosQueHablaron;
