const Controller = (repoUsuarios) => ({

  usuarios: () => (repoUsuarios.obtenerTodos()),

});

export default Controller;
