import { useCallback, useEffect, useState } from "react";
import Attribute from "./Attribute";
import Field from "./Field";

function Table({ data, title, additionalField, additionAttribute, excepted }) {
  const [fields, setFields] = useState([]);

  const configFields = useCallback((currentFields) => {
    setFields(currentFields);
  }, []);

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      configFields(Object.keys(data[0]).concat(additionalField));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">{title}</h1>
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <Field fields={fields} excepted={excepted} />
        </thead>

        <tbody>
          {data?.map((d, index) => (
            <Attribute
              key={index}
              item={d}
              excepted={excepted}
              addition={additionAttribute}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;

Table.propType = {};
