import React, { useEffect, useState } from "react";

interface CountdownProps {
  city: string;
}

interface Data {
  store: string;
  openingHours: string;
  phoneNumber: string;
  address: string;
}

const Countdown: StorefrontFunctionComponent<CountdownProps> = ({ city }) => {
  const csvFilePath = "react/test.csv";
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    fetch(csvFilePath)
      .then((response) => response.text())
      .then((data) => {
        const rows = data.split("\n");
        const result: Data[] = rows.slice(1).map((row: string) => {
          const fields = row.split(",");
          return {
            store: fields[0],
            openingHours: fields[1],
            phoneNumber: fields[2],
            address: fields[3],
          };
        });
        setData(result);
      })
      .catch((error) =>
        console.error("Error al cargar el archivo CSV:", error)
      );
  }, []);

  return (
    <div>
      <div>
        <h2>{city}</h2>
      </div>
      <table>
        <thead>
          <tr>
            <th>Punto de venta</th>
            <th>Horario</th>
            <th>número de telefono</th>
            <th>Dirección</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              <td>{row.store}</td>
              <td>{row.openingHours}</td>
              <td>{row.phoneNumber}</td>
              <td>{row.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Countdown.schema = {
  title: "editor.countdown.title",
  description: "editor.countdown.description",
  type: "object",
  properties: {
    city: {
      title: "Ciudad",
      description: "Escribe la ciudad de la droguería",
      type: "string",
      default: "ciudad",
    },
  },
};

export default Countdown;