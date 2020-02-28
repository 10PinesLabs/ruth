import estaLogueado from './estaLogueado';

describe('.estaLogueado', () => {
  it('si no tiene request, no esta logueado', () => {
    expect(estaLogueado(null)).toBeFalsy();
  });

  it('si no tiene sesión, no esta logueado', () => {
    expect(estaLogueado({})).toBeFalsy();
  });

  it('si tiene sesión y no es root, no esta logueado', () => {
    expect(estaLogueado({
      session: {
        usuario: {
          nombre: 'fede',
          root: false,
        },
      },
    })).toBeFalsy();
  });

  it('si tiene sesión y es root, esta logueado', () => {
    expect(estaLogueado({
      session: {
        usuario: {
          nombre: 'fede',
          root: true,
        },
      },
    })).toBeTruthy();
  });
});
