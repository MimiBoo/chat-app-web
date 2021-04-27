import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import { Circle } from "better-react-spinkit";

function Loading() {
  return (
    <center style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <div>
        <LocalHospitalIcon
          color="secondary"
          style={{ fontSize: 200, marginBottom: 10 }}
        />
        <Circle color="red" size={60} />
      </div>
    </center>
  );
}

export default Loading;
