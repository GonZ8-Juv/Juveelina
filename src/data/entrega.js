export const departamentos = 'Artigas|Canelones|Cerro Largo|Colonia|Durazno|Flores|Florida|Lavalleja|Maldonado|Montevideo|Paysandú|Río Negro|Rivera|Rocha|Salto|San José|Soriano|Tacuarembó|Treinta y Tres'.split('|');
// Fuente: listado de barrios de la Intendencia de Montevideo.
export const barriosMontevideo = 'Parque Rodó|Palermo|Punta Carretas|Barrio Sur|Punta Gorda|Malvín|Buceo|Pocitos|Cordón|Carrasco|Ciudad Vieja|Aguada|Carrasco Norte|Paso de las Duranas|La Comercial|Colón Sureste, Abayubá|Centro|Malvín Norte|Parque Batlle, Villa Dolores|Tres Cruces|Larrañaga|Jacinto Vera|La Blanqueada|Bañados de Carrasco|Aires Puros|Prado, Nueva Savona|La Figurita|Lezica, Melilla|Brazo Oriental|Villa García, Manga Rural|Capurro, Bella Vista|Las Canteras|Atahualpa|Reducto|Tres Ombúes, Victoria|Paso de la Arena|Villa Española|Mercado Modelo, Bolívar|Villa Muñoz, Retiro|Peñarol, Lavalleja|Cerrito|Conciliación|Nuevo París|Sayago|Colón Centro y Noroeste|Castro, Pérez Castellanos|La Teja|Manga, Toledo Chico|Ituzaingó|Manga|Jardines del Hipódromo|Maroñas, Parque Guaraní|La Paloma, Tomkinson|Casabó, Pajas Blancas|Punta de Rieles, Bella Italia|Las Acacias|Piedras Blancas|Unión|Belvedere|Casavalle|Flor de Maroñas|Cerro'.split('|').sort((a, b) => a.localeCompare(b, 'es'));
export function errorEntrega(datos) {
  if (datos.entrega !== 'envio') return '';
  if (!departamentos.includes(datos.departamento)) return 'Seleccioná un departamento.';
  if (typeof datos.barrio !== 'string' || !datos.barrio.trim() || datos.barrio.length > 100) return 'Completá el barrio o localidad.';
  if (datos.departamento === 'Montevideo' && !barriosMontevideo.includes(datos.barrio)) return 'Seleccioná un barrio de Montevideo.';
  if (typeof datos.calle !== 'string' || !/\p{L}/u.test(datos.calle) || datos.calle.trim().length < 2 || datos.calle.length > 150) return 'Ingresá el nombre de la calle.';
  if (typeof datos.numero !== 'string' || !/^[0-9]{1,6}$/.test(datos.numero) || Number(datos.numero) === 0) return 'Ingresá el número de puerta.';
  if (typeof datos.apartamento !== 'undefined' && (typeof datos.apartamento !== 'string' || datos.apartamento.length > 80)) return 'Revisá el apartamento o complemento.';
  return '';
}
export function direccionEntrega(datos) {
  return `${datos.calle.trim()} ${datos.numero}${datos.apartamento?.trim() ? ', ' + datos.apartamento.trim() : ''}\n${datos.barrio.trim()}, ${datos.departamento}`;
}
