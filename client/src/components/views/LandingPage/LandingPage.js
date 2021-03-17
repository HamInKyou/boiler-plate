import React, { useEffect } from "react";
import axios from "axios";

function LandingPage() {
  //랜딩페이지에 들어오자마자 이걸 실행
  useEffect(() => {
    axios.get("/api/hello").then((response) => console.log(response));
  }, []);

  return <div>LandingPage</div>;
}

export default LandingPage;
