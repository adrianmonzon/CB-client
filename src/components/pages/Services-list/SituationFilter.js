import { Form } from "react-bootstrap";

const SituationFilter = (props) => {
    return (
        <Form inline>
            <Form.Control
                as="select"
                className="my-1 mr-sm-2"
                id="inlineFormCustomSelectPref"
                custom
                size="sm"
                onChange={(e) => props.filterBySituation(e.target.value)}
                style={{ fontSize: '20px'}}
            >
                <option value="all">Cualquier estado</option>
                <option value="Pendiente de ayuda">Pendiente de ayuda</option>
                <option value="En conversaciones">En conversaciones</option>
                <option value="Ayuda recibida">Ayuda recibida</option>
               
            </Form.Control>
        </Form>
    );
};

export default SituationFilter;
