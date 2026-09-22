import { formatoPrecio, precioPorMedio, precioOriginalPorMedio, mediosPago } from '../data/importes.js';

export default function Precios({ precios }) {
  if (!precios) return <div className="product-price">Consultar precio</div>;
  return (
    <div className="product-prices">
      {Object.keys(mediosPago).map((medio) => <div key={medio}>
        <strong className="sale-price">{formatoPrecio(precioPorMedio(precios, medio))}</strong>
        {precioOriginalPorMedio(precios, medio) && <del className="original-price" aria-label="Precio anterior">{formatoPrecio(precioOriginalPorMedio(precios, medio))}</del>}
        <span>{medio === 'transferencia' ? 'Transferencia' : 'Mercado Pago'}</span>
      </div>)}
    </div>
  );
}
