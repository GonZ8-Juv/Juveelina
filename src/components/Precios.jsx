import { formatoPrecio, precioPorMedio, mediosPago } from '../data/importes.js';

export default function Precios({ precios }) {
  if (!precios) return <div className="product-price">Consultar precio</div>;
  return (
    <div className="product-prices">
      {Object.keys(mediosPago).map((medio) => <div key={medio}>
        <strong className="regular-price">{formatoPrecio(precioPorMedio(precios, medio))}</strong>
        <span>{medio === 'transferencia' ? 'Transferencia' : 'Mercado Pago'}</span>
      </div>)}
    </div>
  );
}
