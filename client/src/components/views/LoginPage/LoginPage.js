import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";

function LoginPage(props) {
  const dispatch = useDispatch();
  const [UserId, setUserId] = useState("");
  const [Password, setPassword] = useState("");

  //유저가 이메일 타이핑하면 Email State 바뀌게 하는 핸들러
  const onUserIdHandler = (event) => {
    setUserId(event.currentTarget.value);
  };
  //유저가 비번 타이핑하면 Password State 바뀌게 하는 핸들러
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    //기본적으로 submit할 때 page refresh 되는데,
    //이걸 막아주기 위해서!
    event.preventDefault();

    //버튼을 누른 시점의
    //Email과 Password
    console.log("userId", UserId);
    console.log("Password", Password);

    const body = {
      userId: UserId,
      password: Password,
    };

    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        props.history.push("/");
      } else {
        alert("Error");
      }
    });
  };
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
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label>아이디</label>
        {/*UserId State를 만들고, 유저가 타이핑하면 onUserIdHandler 호출해서 State 바뀌게 */}
        <input type="text" value={UserId} onChange={onUserIdHandler} />
        <label>비밀번호</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <br />
        <button>로그인</button>
      </form>
    </div>
  );
}

export default LoginPage;
