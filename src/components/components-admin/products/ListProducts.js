import "../../../css/ccs-admin/product/styles-component-listProduct.css";
import { TiEdit } from "react-icons/all";
export default function ListProducts() {
  return (
    <>
      <div className="dashboard-container">
        <h2>Productos</h2>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <input type="text" placeholder="Buscar producto" />
        </div>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>Nombre</th>
              <th>Categoria</th>
              <th>Marca</th>
              <th>Existencia</th>
              <th>Precio</th>
              <th>Descuento</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>122</td>
              <td>Ampicilina</td>
              <td>Higiene</td>
              <td>Acme</td>
              <td>5</td>
              <td>$55</td>
              <td>15%</td>
              <td>
                <TiEdit size={30} style={{ cursor: "pointer" }} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
