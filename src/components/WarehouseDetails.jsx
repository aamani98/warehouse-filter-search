import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function WarehouseDetails() {
  const navigate = useNavigate();
  const { Id } = useParams();
  const [warehouseDetails, setWarehouseDetails] = useState({});
  const [edit, setEdit] = useState(false);

  const getWarhouseDetails = async () => {
    const { data } = await axios.get(`http://localhost:5000/warehouse/${Id}`);
    const { id, ...rest } = data;
    setWarehouseDetails(rest);
  };

  useEffect(() => {
    getWarhouseDetails();
  }, []);

  const handleInputChange = (e) => {
    setWarehouseDetails({
      ...warehouseDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSubmit = async () => {
    await axios.put(`http://localhost:5000/warehouse/${Id}`, warehouseDetails);
    navigate("/warehouses", { replace: true });
  };

  const addMoreDetails = () => {
    const keyName = prompt("Enter title name");
    if (keyName != null && keyName.length > 0) {
      setEdit(true);
      setWarehouseDetails({ ...warehouseDetails, [keyName]: "" });
    }
  };

  const handleDelete = (item) => {
    setEdit(true);
    const { [item]: removeItem, ...rest } = warehouseDetails;
    setWarehouseDetails(rest);
  };

  return (
    <div className="warehouse-list">
      <div className="warehouse-card">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h1 style={{ color: "#f22929" }}>Warehouse Details</h1>
        </div>
        <div style={{ float: "right" }}>
          <button className="edit" onClick={() => setEdit(true)}>
            <i className="fas fa-pencil-alt" />
          </button>

          <button
            className="edit"
            style={{ backgroundColor: "green" }}
            onClick={addMoreDetails}
          >
            <i className="far fa-plus-square"></i>
          </button>
        </div>

        <table style={{ width: "100%" }}>
          <tbody>
            {Object.keys(warehouseDetails).map((item) => {
              return (
                <tr key={item}>
                  <td>
                    <b>{item.toUpperCase()}</b>
                  </td>
                  <td>
                    <input
                      name={item}
                      disabled={!edit}
                      value={warehouseDetails[item]}
                      onChange={handleInputChange}
                    />{" "}
                    <button
                      className="delete"
                      onClick={() => handleDelete(item)}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {edit ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button className="edit" onClick={handleEditSubmit}>
              Submit
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
