import React, { useState, useEffect } from "react";
import Nav from "./components/common/Nav";
import { Redirect } from "react-router-dom";
import Sidebar from "./components/sidebar";
import fakeAuth from "./fakeAuth";

function Login(props) {
  const [userData, setUserData] = useState({ username: "", pin: "" });
  const [vcode, setVcode] = useState({
    data: getRandom(109, 48, 4),
    rotate: getRandom(30, -30, 4),
    fz: getRandom(20, 12, 4),
    color: [
      getRandom(100, 255, 3),
      getRandom(100, 255, 4),
      getRandom(100, 255, 3),
      getRandom(100, 255, 3)
    ],
    refresh: false,
    vcodeProduce: "",
    vcodeInput: ""
  });

  //vcode
  useEffect(() => {
    initVcode();
    canvas();
  }, [vcode.data]);

  const initVcode = () => {
    let code = "";
    vcode.data.map(v => {
      code += String.fromCharCode(
        v > 57 && v < 84 ? v + 7 : v < 57 ? v : v + 13
      );
    });
    setVcode({
      ...vcode,
      vcodeProduce: code
    });
  };
  function initState() {
    setVcode({
      ...vcode,
      data: getRandom(109, 48, 4),
      rotate: getRandom(30, -30, 4),
      fz: getRandom(20, 12, 4),
      color: [
        getRandom(100, 255, 3),
        getRandom(100, 255, 4),
        getRandom(100, 255, 3),
        getRandom(100, 255, 3)
      ]
    });
  }
  // randomly produce 4 nums/chars
  function getRandom(max, min, num) {
    const asciiNum = ~~(Math.random() * (max - min + 1) + min);
    if (!Boolean(num)) {
      return asciiNum;
    }
    const arr = [];
    for (let i = 0; i < num; i++) {
      arr.push(getRandom(max, min));
    }
    return arr;
  }

  function canvas() {
    const canvas = document.getElementById("bgi");
    let ctx = canvas.getContext("2d");
    canvas.height = canvas.height;
    // ctx.clearRect(0, 0, canvas.width(), canvas.height())
    ctx.strokeStyle = `rgb(${getRandom(100, 10, 3).toString()})`;
    for (let i = 0; i < 7; i++) {
      ctx.lineTo(getRandom(200, 0), getRandom(200, 10));
      ctx.moveTo(getRandom(200, 0), getRandom(200, 0));
      ctx.stroke();
    }
  }
  function handleChange({ target }) {
    setUserData({
      ...userData,
      [target.name]: target.value
    });

    setVcode({
      ...vcode,
      [target.name]: target.value
    });
  }
  function handleSubmit(event) {
    event.preventDefault();
    if (vcode.vcodeInput.toUpperCase() === vcode.vcodeProduce.toUpperCase()) {
      if (userData.username === "xdf" && userData.pin === "123") {
        console.log("correct!");
        fakeAuth.authenticate();
        localStorage.setItem("isAuthenticate", true);
        console.log(localStorage.getItem("isAuthenticate"));

        props.history.push("clients");
        //return <Redirect to="/" />;
      } else {
        alert("user name or password not correct!");
      }
    } else alert("vcode not correct!");
  }

  return (
    <div>
      <div className="login">
        <form onSubmit={handleSubmit}>
          {/* <label htmlFor="pin">Please input the user name and password</label> */}
          <input
            type="text"
            id="username"
            placeholder="user name"
            name="username"
            value={userData.username}
            onChange={handleChange}
          />
          <input
            type="text"
            id="pin"
            placeholder="password"
            name="pin"
            value={userData.pin}
            onChange={handleChange}
          />
          <div className="vcodeOuter">
            <div className="vcodeInput">
              <input
                type="text"
                id="vcodeInput"
                name="vcodeInput"
                value={vcode.vcodeInput}
                onChange={handleChange}
                // onChange={props.onChange}
              ></input>
            </div>
            <div className="vcodewrap">
              <canvas id="bgi" width="200" height="200"></canvas>
              {vcode.data.map((v, i) => (
                <div
                  key={i}
                  className="itemStr"
                  style={{
                    transform: `rotate(${vcode.rotate[i]}deg)`,
                    fontSize: `${vcode.fz[i]}px`,
                    color: `rgb(${vcode.color[i].toString()})`
                  }}
                  onMouseEnter={() => setVcode({ ...vcode, refresh: true })}
                >
                  {String.fromCharCode(
                    v > 57 && v < 84 ? v + 7 : v < 57 ? v : v + 13
                  )}
                </div>
              ))}
              {vcode.refresh ? (
                <div
                  className="mask"
                  onClick={() => {
                    initState();
                    canvas();
                  }}
                  onMouseLeave={() => {
                    setVcode({ ...vcode, refresh: false });
                  }}
                >
                  Refresh
                </div>
              ) : null}
            </div>
          </div>
          <button type="submit">Submit</button>
          {userData.error && <p className="error">Error: {userData.error}</p>}
        </form>
      </div>
      <style jsx>{`
        .login {
          max-width: 340px;
          margin: 0 auto;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        form {
          display: flex;
          flex-flow: column;
        }

        label {
          font-weight: 600;
        }

        input {
          padding: 8px;
          margin: 0.3rem 0 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .error {
          margin: 0.5rem 0 0;
          color: brown;
        }
        .vcodewrap {
          width: 70px;
          overflow: hidden;
          font-size: 12px;
          height: 30px;
          text-align: center;
          position: relative;
          //left: 50%;
        }

        .mask {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          background-color: rgba(0, 0, 0, 0.95);
          opacity: 0.8;
          line-height: 30px;
          color: white;
          z-index: 1;
        }
        .itemStr {
          float: left;
          margin-left: 5px;
        }
        #bgi {
          top: 0;
          left: 0;
          position: absolute;
          width: 100%;
          height: 100%;
        }
        .vcodeInput {
          float: left;
          //margin-left: 30%;
          width: 75%;
        }
        .vcodeInput input {
          width: 85%;
        }
      `}</style>
    </div>
  );
}

// Login.getInitialProps = async ({ query: { criteria } }) => {
//   return { criteria: criteria };
// };

export default Login;
