import React from "react";
import { useNavigate } from "react-router-dom";

export default function WarehouseCard(props) {
  const { id, name, city, ...rest } = props;
  const navigate = useNavigate();
  return (
    <div className="warehouse-card">
      <h4 style={{ color: "#f22929", fontSize: "20px" }}>{name}</h4>

      <div className="row" style={{ margin: ".3rem 0" }}>
        <i className="fas fa-map-marker-alt icon"></i>
        <p> {city}</p>
      </div>

      <ul>
        {Object.keys(rest).map((item) => {
          return (
            <li key={item}>
              <b>{item.toUpperCase()} :</b> {rest[item]}
            </li>
          );
        })}
      </ul>
      <button
        className="view-details"
        onClick={() => navigate(`/warehouses/${props.id}`)}
      >
        View Details
      </button>
    </div>
  );
}
