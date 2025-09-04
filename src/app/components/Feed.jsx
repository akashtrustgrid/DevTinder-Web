import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeeds } from "../core/feedSlice";
import UserCard from "./UserCard";
import { useNavigate } from "react-router";

function Feed() {
  const feeds = useSelector((state) => state.feed);
  const dispatch = useDispatch();
  const navigation = useNavigate();

  useEffect(() => {
    fetchFeed();
  }, []);

  const fetchFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });

      if (res.data) {
        dispatch(addFeeds(res.data.data));
      }
    } catch (error) {
      console.error("ERROR:" + error);
    }
  };

  if (feeds.length === 0) {
    return (
      <h1 className=" flex justify-center my-15 text-3xl">
        You have reached your daily limit!
      </h1>
    );
  }

  return (
    <>
      {feeds && (
        <div className="flex justify-center my-10 mb-20">
          <UserCard user={feeds[0]} />
        </div>
      )}
    </>
  );
}

export default Feed;
