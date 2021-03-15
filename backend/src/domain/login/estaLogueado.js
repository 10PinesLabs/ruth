export default function estaLogueado(req) {
  return req && req.session
    && req.session.usuario
      && req.session.usuario.root;
}
