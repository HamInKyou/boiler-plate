import React, { useEffect } from "react";
import axios from "axios";

function LandingPage() {
  //랜딩페이지에 들어오자마자 이걸 실행
  useEffect(() => {
    axios.get("/api/hello").then((response) => console.log(response));
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <h2>LandingPage</h2>
    </div>
  );
}

export default LandingPage;
