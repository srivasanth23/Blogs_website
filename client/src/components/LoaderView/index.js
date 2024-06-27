import { GridLoader } from "react-spinners";

const LoaderView = () => {
  return (
    <div className="wrapper flexCenter" style={{ height: "60vh" }}>
      <GridLoader color="var(--primary)" height="80" width="80" />
    </div>
  );
};

export default LoaderView;
