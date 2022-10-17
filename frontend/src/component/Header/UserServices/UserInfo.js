/* eslint-disable no-restricted-globals */
import LogoutIcon from "@mui/icons-material/Logout";
import { Tooltip, Zoom } from "@mui/material";

function UserInfo() {

  // logout
  const handleLogout = () => {
    localStorage.clear();
    location.reload();
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: "auto",
        cursor: "pointer",
      }}
    >
      
        <span> PandawannaFly</span>

      <Tooltip
        TransitionComponent={Zoom}
        title="Logout"
        placement="bottom"
        arrow
      >
        <span className="logout-btn" onClick={handleLogout}>
          <LogoutIcon />
        </span>
      </Tooltip>
    </div>
  );
}

export default UserInfo;
