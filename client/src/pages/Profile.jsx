import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QUERY_SINGLE_USER, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";

const Profile = () => {
  const { userId } = useParams();

  const { loading, data } = useQuery(userId ? QUERY_SINGLE_USER : QUERY_ME, {
    variables: { userId: userId },
  });

  const user = data?.me || data?.user || {};
  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data._id === userId) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex-row justify-center mb-3">
        {Auth.loggedIn() ? (
          <>
            <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
              Viewing {userId ? `${user.username}'s` : "your"} profile.
            </h2>
          </>
        ) : (
          <h4>
            You need to be logged in to see this. Use the navigation links above
            to sign up or log in!
          </h4>
        )}
      </div>
    </div>
  );
};

export default Profile;
