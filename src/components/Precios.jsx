import { formatoPrecio, precioPorMedio } from '../data/importes.js';

export default function Precios({ precios }) {
  if (!precios) return <div className="product-price">Consultar precio</div>;
  return (
    <div className="product-prices">
      <div><strong>{formatoPrecio(precioPorMedio(precios, 'transferencia'))}</strong><span>Transferencia</span></div>
      <div><strong>{formatoPrecio(precioPorMedio(precios, 'mercadopago'))}</strong><span>Mercado Pago</span></div>
    </div>
  );
}
