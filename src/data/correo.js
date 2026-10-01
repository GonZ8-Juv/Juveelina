export function normalizarCorreo(valor) {
  return typeof valor === 'string' ? valor.trim().toLowerCase() : '';
}

export function errorCorreo(valor) {
  const correo = normalizarCorreo(valor);
  if (!correo) return 'Ingresá tu correo electrónico.';
  if (correo.length > 254) return 'El correo no puede superar los 254 caracteres.';
  if (/\s/.test(correo)) return 'El correo no puede contener espacios.';
  if ((correo.match(/@/g) || []).length !== 1) return 'El correo debe contener un solo @.';
  const [usuario, dominio] = correo.split('@');
  if (!usuario || !dominio || !dominio.includes('.')) return 'Completá el correo con nombre, dominio y extensión, por ejemplo nombre@gmail.com.';
  if (correo.includes('..')) return 'El correo no puede contener puntos consecutivos.';
  if (usuario.length > 64 || !/^[a-z0-9!#$%&'*+=?^_`{|}~.-]+$/i.test(usuario) || usuario.startsWith('.') || usuario.endsWith('.')) return 'Revisá los caracteres antes del @; no uses comillas, paréntesis ni barras.';
  if (!dominio.split('.').every((parte) => /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i.test(parte)) || !/^[a-z]{2,}$/i.test(dominio.split('.').at(-1))) return 'Ingresá un dominio y una extensión válidos, por ejemplo gmail.com.';
  return '';
}

export function sugerirCorreo(valor) {
  const correo = normalizarCorreo(valor);
  if (errorCorreo(correo)) return '';
  const [usuario, dominio] = correo.split('@');
  const correcciones = { 'gamil.com': 'gmail.com', 'gmial.com': 'gmail.com', 'hotmal.com': 'hotmail.com', 'hotmial.com': 'hotmail.com', 'yahhoo.com': 'yahoo.com' };
  return Object.hasOwn(correcciones, dominio) ? `${usuario}@${correcciones[dominio]}` : '';
}
