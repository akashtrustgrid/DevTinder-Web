import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";

function Feed() {
  useEffect(() => {
    fetchFeed();
  }, []);

  const fetchFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      if (res.status === 200) {
        console.log(res.data.data);
      }
    } catch (error) {
      console.error("ERROR:" + error);
    }
  };

  return <div>Feed</div>;
}

export default Feed;
