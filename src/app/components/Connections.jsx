import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";

const Connections = () => {
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    if (connections.length > 0) return;
    fetchConnections();
  }, []);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      const data = res.data.data;

      if (data) {
        setConnections(data);
      }
    } catch (error) {
      console.error("ERROR:" + error);
    }
  };

  return (
    <>
      {connections.length > 0 && (
        <ul className="list bg-base-200 rounded-full shadow-md my-15 mx-10">
          {connections.map((conn) => (
            <li className="list-row" key={conn._id}>
              <div>
                <img className="size-25 rounded-full" src={conn.imageUrl} />
              </div>
              <div>
                <div className="text-2xl">
                  {conn.firstName + " " + conn.lastName}
                </div>
                <div className="text-xm uppercase font-semibold opacity-60">
                  {conn.age + ", " + conn.gender}
                </div>
                <div className="list-col-wrap text-xs mt-2">{conn.aboutMe}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Connections;
