import "../css/styles-component-footer.css";
import { AiOutlineWhatsApp, RiFacebookCircleLine } from "react-icons/all";
export default function Footer() {
  return (
    <footer>
      <div className="section-footer">
        <h4>Servicio al cliente</h4>
        <ul>
          <li>
            <a href="/22">Aviso de privacidad</a>
          </li>
          <li>
            <a href="/22">Acerca de nosotros</a>
          </li>
          <li>
            <a href="/ss">Preguntas frecuentes</a>
          </li>
        </ul>
      </div>
      <div className="section-footer">
        <h4>Contactanos via</h4>
        <ul>
          <li>
            <p>
              <AiOutlineWhatsApp size={26} />
              55 35 33 88 16
            </p>
          </li>
          <li>
            <p>
              <RiFacebookCircleLine size={26} />
              Farma pronto
            </p>
          </li>
        </ul>
      </div>
      <div className="section-footer">
        <h4>Compra en linea</h4>
        <ul>
          <li>
            <a href="/22">Facturacion</a>
          </li>
          <li>
            <a href="/22">Horarios y entregas</a>
          </li>
          <li>
            <a href="/ss">Formas de pago</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
