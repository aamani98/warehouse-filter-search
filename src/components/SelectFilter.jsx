import React from "react";

export default function SelectFilter({ arr, property, handleChange }) {
  const getUniquesValue = (arr, property) => {
    const result = [];
    arr.map((item) => {
      if (!result.includes(item[property])) {
        result.push(item[property]);
      }
    });
    return result;
  };

  return (
    <div className="drop-downs">
      <select name={property} onChange={handleChange}>
        <option value={""}>Select {property}</option>
        {getUniquesValue(arr, property).map((item) => {
          return (
            <option value={item} key={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
}
