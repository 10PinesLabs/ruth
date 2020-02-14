
const TemaController = ({ reunionesRepo, temasRepo }) => ({
  obtener: async () => {
    const reunion = await reunionesRepo.findLastCreated();
    try {
      return await temasRepo.findTemasDeReunion(reunion.id);
    } catch (e) {
      return null;
    }
  },

  actualizar: (req) => {
    const { id, inicio, fin } = req.body;
    if (fin !== null && inicio === null) {
      return Promise.reject(new Error('Datos inválidos de tema'));
    }

    return temasRepo.findOneById(id)
      .then((temaAActualizar) => {
        const actualizoInicioSiendoNull = fin === null && temaAActualizar.inicio === null;
        const actualizoFinSiendoNull = fin !== null && temaAActualizar.fin === null;
        const condicionParaActualizar = actualizoInicioSiendoNull || actualizoFinSiendoNull;
        if (condicionParaActualizar) return temaAActualizar.update({ inicio, fin });
        return temaAActualizar;
      });
  },
});

export default TemaController;
