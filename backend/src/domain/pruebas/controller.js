const PruebasController = ({ buscarTemasVotacionRoots, repo }) => ({
  temas: () => buscarTemasVotacionRoots(),

  cerrar: () => repo.findLastCreated()
    .then((reunionAActualizar) => reunionAActualizar.update({ abierta: false })),
});

export default PruebasController;
