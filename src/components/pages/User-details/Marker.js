import React from 'react';
import './Marker.css';
import { Link } from 'react-router-dom'

const Marker = ({ color, name, id, age }) => {
    return (
        <Link to={`/usuarios/${id}`}>
            <div
                className="pin bounce"
                style={{ backgroundColor: color, cursor: 'pointer' }}
                title={`${name} , ${age}`}
            />
            <div className="pulse" />
        </Link>
    );
};

export default Marker;