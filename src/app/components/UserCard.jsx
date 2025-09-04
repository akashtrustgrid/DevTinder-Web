import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../core/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();

  if (!user) return;
  const { _id, firstName, lastName, age, imageUrl, gender, skills, aboutMe } =
    user;

  const handleRequest = async (status) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + _id,
        { recipientId: _id },
        { withCredentials: true }
      );

      if (res.data.data) {
        dispatch(removeFeed(_id));
      }
    } catch (error) {
      console.error("ERROR:" + error);
    }
  };

  return (
    <div className="justify-center">
      <div className="card bg-base-200 w-96 shadow-sm">
        <figure>
          <img src={imageUrl} alt="User Image" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {firstName} {lastName}
          </h2>
          <p>
            {age}, {gender}
          </p>
          <p>{skills}</p>
          <p>{aboutMe}</p>
          <div className="card-actions justify-end gap-5 mt-5">
            <button
              className="btn btn-primary"
              onClick={() => {
                handleRequest("ignored");
              }}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                handleRequest("interested");
              }}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
