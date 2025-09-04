import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";

const Requests = () => {
  const [sentRequests, setSentRequests] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);

  useEffect(() => {
    if (receivedRequests.length > 0) return;
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      const data = res.data.data;

      if (data) {
        setReceivedRequests(data);
      }
    } catch (error) {
      console.error("ERROR:" + error);
    }
  };

  const handleRequest = async (status, requestId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + requestId,
        { recipientId: requestId },
        { withCredentials: true }
      );

      console.log(res.data);

      if (res.data.data) {
        setReceivedRequests(
          receivedRequests.filter((request) => request._id !== requestId)
        );
      }
    } catch (error) {
      console.error("ERROR:" + error);
    }
  };

  return (
    <>
      {receivedRequests.length > 0 && (
        <ul className="list bg-base-200 rounded-full shadow-md my-15 mx-10">
          {receivedRequests.map((request) => (
            <li className="list-row" key={request._id}>
              <div>
                <img
                  className="size-25 rounded-full"
                  src={request.fromUserId.imageUrl}
                />
              </div>
              <div>
                <div className="text-2xl">
                  {request.fromUserId.firstName +
                    " " +
                    request.fromUserId.lastName}
                </div>
                <div className="text-xm uppercase font-semibold opacity-60">
                  {request.fromUserId.age + ", " + request.fromUserId.gender}
                </div>
                <div className="list-col-wrap text-xs mt-2">
                  {request.fromUserId.aboutMe}
                </div>
              </div>

              <div className="mr-8">
                <div>
                  <button
                    className="btn btn-secondary mt-4"
                    onClick={() => {
                      handleRequest("accepted", request._id);
                    }}
                  >
                    Accept
                  </button>
                </div>
                <div>
                  <button
                    className="btn btn-primary mt-4"
                    onClick={() => {
                      handleRequest("rejected", request._id);
                    }}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Requests;
