import React from "react";
import ReactFacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";

const Login = () => {
  const clientId =
    "388707651047-4pgq1fqi0fj6gbhpcb2ql70md45micjm.apps.googleusercontent.com";
  const appId = "821267935988426";
  const responseGoogle = (response) => {
    console.log(response);
    // const navigate = useNavigate();
  };
  const responseFacebook = (response) => {
    console.log(response);
  };

  return (
    <div
      className="row row-cols-1 row-cols-md-2 m-0"
      style={{
        height: "100vh",
        backgroundImage:
          'url("http://chitrahandicraft.com/wp-content/uploads/2019/02/login-page-background-images-hd-10.jpg")',
        backgroundSize: "cover",
      }}
    >
      <div className="col p-0 d-flex justify-content-center align-items-center">
        <img
          src={"https://source.unsplash.com/600x900/?farmers-feilds"}
          alt="Farmers"
          style={{
            height: "95vh",
            width: "100%",
          }}
        />
      </div>
      <div
        className="col p-0 d-flex justify-content-center align-items-center"
        style={{
          flexDirection: "column",
        }}
      >
        <div className="google my-3">
          <GoogleLogin
            clientId={clientId}
            buttonText="Login with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
            className="Google"
          />
        </div>
        <div className="facebook my-3">
          <ReactFacebookLogin
            appId={appId}
            autoLoad={false}
            fields="name, email, picture"
            callback={responseFacebook}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
