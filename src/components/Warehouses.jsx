import React, { useEffect, useState } from "react";
import axios from "axios";
import SelectFilter from "./SelectFilter";
import WarehouseCard from "./WarehouseCard";

export default function Warehouses() {
  const [warehouses, setWarehouses] = useState([]);
  const [search, setSearch] = useState("");
  const [resultWarehouse, setResultWarehouse] = useState([]);
  const [filter, setFilter] = useState({ city: "", cluster: "", type: "" });

  const applyFilter = () => {
    let result = warehouses;
    Object.keys(filter).map((key) => {
      if (filter[key] !== "") {
        result = result.filter((item) => item[key] === filter[key]);
      }
    });
    setResultWarehouse(result);
  };

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const getWarehouseList = async () => {
    const { data } = await axios.get("http://localhost:5000/warehouse");
    setWarehouses(data);
    setResultWarehouse(data);
  };

  useEffect(() => {
    getWarehouseList();
  }, []);

  useEffect(() => {
    applyFilter();
  }, [filter]);

  useEffect(() => {
    const result = warehouses.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    setResultWarehouse(result);
  }, [search]);
  return (
    <>
      <div className="search">
        <input
          className="search-input"
          placeholder="Search By Warehouse Name"
          value={search}
          onChange={handleSearchChange}
        />
        <button className="search-button">Search</button>
      </div>
      <div className="filter">
        <SelectFilter
          handleChange={handleFilterChange}
          arr={warehouses}
          property="city"
        />

        <SelectFilter
          handleChange={handleFilterChange}
          arr={warehouses}
          property="cluster"
        />

        <SelectFilter
          handleChange={handleFilterChange}
          arr={warehouses}
          property="type"
        />
      </div>

      <div className="warehouse-list">
        {resultWarehouse.length > 0 ? (
          resultWarehouse.map((item) => {
            return <WarehouseCard {...item} key={item.id} />;
          })
        ) : (
          <h1>No warehouses </h1>
        )}
      </div>
    </>
  );
}
