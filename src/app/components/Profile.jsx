import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";
import { addUser } from "../core/userSlice";
import { useNavigate } from "react-router";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { range } from "../utils/utils";

function Profile() {
  const user = useSelector((state) => state.user);

  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [imageUrl, setImageUrl] = useState(user?.imageUrl);
  const [age, setAge] = useState(user?.age);
  const [gender, setGender] = useState(user?.gender);
  const [aboutMe, setAboutMe] = useState(user?.aboutMe);
  const [skills, setSkills] = useState(user?.skills || []);

  const dispatch = useDispatch();
  const navigation = useNavigate();

  const ageOptions = range(18, 60);
  const genderOptions = ["Male", "Female", "Other"];

  const handleSaveProfile = async () => {
    try {
      // Common profile fields
      const profileFields = {
        firstName,
        lastName,
        imageUrl,
        age,
        gender,
        skills: skills.split(","),
        aboutMe,
      };

      const res = await axios.patch(BASE_URL + "/profile", profileFields, {
        withCredentials: true,
      });

      if (res.data.data) {
        dispatch(addUser(res.data.data));
        navigation("/");
      }
    } catch (error) {
      console.error("Profile save failed:", error);
    }
  };

  return (
    <div className="flex justify-center mt-5 mb-20">
      <div className="flex justify-center mx-10">
        <div className="card w-96 bg-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title justify-center my-2">
              Edit Your Profile
            </h2>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">First Name</legend>
              <input
                type="text"
                className="input"
                placeholder="Type here"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Last Name</legend>
              <input
                type="text"
                className="input"
                placeholder="Type here"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Image URL</legend>
              <input
                type="text"
                className="input"
                placeholder="Type here"
                value={imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                }}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Age</legend>
              <select
                defaultValue={age}
                className="select"
                onChange={(e) => {
                  setAge(e.target.value);
                }}
              >
                {ageOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Gender</legend>
              <select
                defaultValue={gender}
                className="select"
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              >
                {genderOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Skills</legend>
              <input
                type="text"
                className="input"
                placeholder="Type here"
                value={skills}
                onChange={(e) => {
                  setSkills(e.target.value);
                }}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">About Me</legend>
              <textarea
                className="textarea h-24"
                value={aboutMe}
                onChange={(e) => setAboutMe(e.target.value)}
              ></textarea>
            </fieldset>
            <div className="justify-center card-actions">
              <button
                onClick={handleSaveProfile}
                className="btn btn-primary mt-4"
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <UserCard
        user={{ firstName, lastName, age, imageUrl, gender, aboutMe, skills }}
      />
    </div>
  );
}

export default Profile;
