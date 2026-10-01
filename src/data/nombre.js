export function normalizarNombre(valor) {
  return typeof valor === 'string' ? valor.trim().normalize('NFC') : '';
}

export function errorNombre(valor) {
  const nombre = normalizarNombre(valor);
  if (!nombre) return 'Ingresá tu nombre y apellido.';
  if ([...nombre].length < 2 || [...nombre].length > 100) return 'El nombre y apellido debe tener entre 2 y 100 caracteres.';
  if (!/^[\p{L}\p{M} '’ʼ\-‐‑]+$/u.test(nombre) || !/\p{L}/u.test(nombre)) {
    return 'Usá solo letras, espacios, apóstrofes o guiones en el nombre y apellido.';
  }
  return '';
}
