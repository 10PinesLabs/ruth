import { pick } from 'lodash';

const Controller = () => ({

  me: (req) => pick(req.session.usuario, 'nombre', 'email'),

});

export default Controller;
