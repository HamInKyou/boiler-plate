import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_action";

function RegisterPage(props) {
  const dispatch = useDispatch();
  const [Name, setName] = useState("");
  const [UserId, setUserId] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  //유저가 이름 타이핑하면 Name State 바뀌게 하는 핸들러
  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };
  //유저가 이메일 타이핑하면 Email State 바뀌게 하는 핸들러
  const onUserIdHandler = (event) => {
    setUserId(event.currentTarget.value);
  };
  //유저가 비번 타이핑하면 Password State 바뀌게 하는 핸들러
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };
  //유저가 비번확인 타이핑하면 ConfirmPassword State 바뀌게 하는 핸들러
  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    //기본적으로 submit할 때 page refresh 되는데,
    //이걸 막아주기 위해서!
    event.preventDefault();

    if (Password !== ConfirmPassword) {
      //비번과 비번확인이 일치하지 못하면 리턴하기 때문에 아래 코드 실행x
      return alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
    }
    const body = {
      name: Name,
      userId: UserId,
      password: Password,
    };

    dispatch(registerUser(body)).then((response) => {
      if (response.payload.registerSuccess) {
        props.history.push("/login");
      } else {
        alert("Failed to sign up");
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
        <label>이름</label>
        <input type="text" value={Name} onChange={onNameHandler} />
        <label>아이디</label>
        <input type="text" value={UserId} onChange={onUserIdHandler} />
        <label>비밀번호</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <label>비밀번호확인</label>
        <input
          type="password"
          value={ConfirmPassword}
          onChange={onConfirmPasswordHandler}
        />
        <br />
        <button>회원가입</button>
      </form>
    </div>
  );
}

export default RegisterPage;
