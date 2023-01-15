import { Loading } from "@nextui-org/react";

const Loader = () => {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Loading
        loadingCss={{ $$loadingSize: "100px", $$loadingBorder: "10px" }}
      />
    </div>
  );
};

export default Loader;
