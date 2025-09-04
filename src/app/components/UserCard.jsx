const UserCard = ({ user }) => {
  console.log(user);

  if (!user) return;
  const { _id, firstName, lastName, age, imageUrl, gender, skills, aboutMe } =
    user;

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
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
