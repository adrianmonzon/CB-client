import { Form } from "react-bootstrap";

const Filter = (props) => {
    return (
        <Form inline>
            <Form.Label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">
                Filtrar:
      </Form.Label>
            <Form.Control
                as="select"
                className="my-1 mr-sm-2"
                id="inlineFormCustomSelectPref"
                custom
                size="sm"
                onChange={(e) => props.filterByOwnerProvince(e.target.value)}
                style={{fontSize: '20px'}}
            >
                <option value="all">Cualquier provincia</option>
                <option value="Álava">Álava</option>
                <option value="Albacete">Albacete</option>
                <option value="Alicante">Alicante</option>
                <option value="Almería">Almería</option>
                <option value="Asturias">Asturias</option>
                <option value="Ávila">Ávila</option>
                <option value="Badajoz">Badajoz</option>
                <option value="Baleares">Baleares</option>
                <option value="Barcelona">Barcelona</option>
                <option value="Burgos">Burgos</option>
                <option value="Cáceres">Cáceres</option>
                <option value="Cádiz">Cádiz</option>
                <option value="Cantabria">Cantabria</option>
                <option value="Castellón">Castellón</option>
                <option value="Ceuta">Ceuta</option>
                <option value="Ciudad Real">Ciudad Real</option>
                <option value="Córdoba">Córdoba</option>
                <option value="Cuenca">Cuenca</option>
                <option value="Gerona/Girona">Gerona/Girona</option>
                <option value="Granada">Granada</option>
                <option value="Guadalajara">Guadalajara</option>
                <option value="Guipúzcoa">Guipúzcoa</option>
                <option value="Huelva">Huelva</option>
                <option value="Huesca">Huesca</option>
                <option value="Jaén">Jaén</option>
                <option value="La Coruña">La Coruña</option>
                <option value="La Rioja">La Rioja</option>
                <option value="Las Palmas">Las Palmas</option>
                <option value="León">León</option>
                <option value="Lérida">Lérida/Lleida</option>
                <option value="Lugo">Lugo</option>
                <option value="Madrid">Madrid</option>
                <option value="Málaga">Málaga</option>
                <option value="Melilla">Melilla</option>
                <option value="Murcia">Murcia</option>
                <option value="Navarra">Navarra</option>
                <option value="Orense">Orense/Ourense</option>
                <option value="Palencia">Palencia</option>
                <option value="Pontevedra">Pontevedra</option>
                <option value="Salamanca">Salamanca</option>
                <option value="Segovia">Segovia</option>
                <option value="Sevilla">Sevilla</option>
                <option value="Soria">Soria</option>
                <option value="Tarragona">Tarragona</option>
                <option value="Tenerife">Tenerife</option>
                <option value="Teruel">Teruel</option>
                <option value="Toledo">Toledo</option>
                <option value="Valencia">Valencia</option>
                <option value="Valladolid">Valladolid</option>
                <option value="Vizcaya">Vizcaya/Bizkaia</option>
                <option value="Zamora">Zamora</option>
                <option value="Zaragoza">Zaragoza</option>
            </Form.Control>
        </Form>
    );
};

export default Filter;
