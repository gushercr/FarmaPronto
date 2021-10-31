import "../../../css/ccs-admin/product/styles-component-addProduct.css";
import { BiImageAdd } from "react-icons/all";
export default function AddProduct() {
  return (
    <div className="dashboard-container">
      <h2>
        Ingresa los datos
        <button>Guardar</button>
      </h2>
      <div className="double-section">
        <div>
          <label>Titulo</label>
          <input type="text" placeholder="Agrega un titulo" />
          <label>Categoria</label>
          <select>
            <option value="">Higiene personal</option>
            <option value="">Salud sexual</option>
          </select>
          <label>Marca</label>
          <select>
            <option value="">Acme</option>
            <option value="">Pepsi</option>
          </select>
          <label>Descripcion</label>
          <textarea placeholder="Ingrese una descripcion del producto (Maximo 200 caracteres)"></textarea>
        </div>
        <div className="section-quantity">
          <label>Cantidad disponible</label>
          <input type="text" placeholder="Cantidad" />
          <label>Precio</label>
          <input type="number" placeholder="Cantidad" />
          <label>Descuento</label>
          <input type="number" placeholder="Cantidad" />
        </div>
      </div>
      <div className="double-section">
        <div className="section-img-primary">
          <label>Imagen principal</label>
          <div className="container-double-img">
            <BiImageAdd size={50} color="#cacaca" />
            <input type="file" />
          </div>
        </div>
        <div className="section-img-details">
          <label>Imagenes detalles</label>
          <div className="container-double-img">
            <BiImageAdd size={50} color="#cacaca" />
            <input type="file" />
          </div>
        </div>
      </div>
    </div>
  );
}
