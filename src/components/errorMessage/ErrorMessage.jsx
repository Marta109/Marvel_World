import error from "../../resources/img/error.gif";

const ErrorMessage = () => {
  return (
    <img
      src={error}
      alt="error_gif"
      style={{
        display: "block",
        width: "250px",
        height: "250px",
        objectFit: "contain",
        margin: "0 auto",
      }}
    ></img>
  );
};

export default ErrorMessage;
