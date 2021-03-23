import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";

export default function (SpecificComponent, option, adminRoute = null) {
  //옵션의 세 종류
  //1: null => 아무나 출입이 가능한 페이지
  //2: true => 로그인한 유저만 출입이 가능한 페이지
  //3. false => 로그인한 유저는 출입 불가능한 페이지

  //adminRoute는 옵션,
  //admin 유저만 들어가길 원하는 페이지라면 true!

  function AuthenticationCheck(props) {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(auth()).then((response) => {
        console.log(response);

        if (!response.payload.isAuth) {
          //로그인하지 않은 상태
          if (option) {
            //옵션이 true(로그인한 유저만 출입 가능)인 경우
            props.history.push("/login");
          }
        } else {
          //로그인한 상태
          if (adminRoute && !response.payload.isAdmin) {
            //admin만 들어갈 수 있는 페이지인데 어드민 아닌 사람이 들어갔을 경우
            props.history.push("/");
          } else {
            if (!option) {
              //옵션이 false(로그인하지 않은 유저만 출입 가능)인 경우
              props.history.push("/");
            }
          }
        }
      });
    }, []);

    return <SpecificComponent />;
  }
  return AuthenticationCheck;
}
