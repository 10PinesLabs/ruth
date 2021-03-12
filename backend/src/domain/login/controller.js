import BackofficeValidator from './backOfficeValidator';
import context from '~/context';

const BackofficeController = () => ({

  callback: (req, res) => {
    const { query } = req;
    const esRoot = query.root === 'true';

    if (!BackofficeValidator.isFromBackoffice(query)) {
      return res.send('Falló la validación, el backoffice envió una firma incorrecta').status(500);
    }

    req.session.usuario = {
      id: query.uid,
      usuario: query.username,
      nombre: query.full_name,
      email: query.email,
      root: esRoot,
    };

    if (esRoot) {
      context.usuariosRepo.guardarOActualizarUsuario(req.session.usuario);
    }

    return ['\n',
      '<!DOCTYPE html>',
      '<html lang="en">',
      '<head>',
      '    <meta charset="UTF-8">',
      '    <title>Logueandote</title>',
      '</head>',
      '<body>',
      '    <h2>Redirigiendo...</h2>',
      '    <script>',
      '        /* Redirect to the actual application */',
      "        window.location.href = '/';",
      '    </script>',
      '</body>',
      '</html >',
    ].join('');
  },
});

export default BackofficeController;
