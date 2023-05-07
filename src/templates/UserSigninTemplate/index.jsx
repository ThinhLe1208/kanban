import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
const { Sider, Content } = Layout;

export default function UserSigninTemplate() {
  const [{ width, height }, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    window.onresize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
  }, []);

  return (
    <Layout>
      <Sider width={(width * 7) / 10} style={{ height: height }}>
        <img
          src={`https://picsum.photos/${width}/${height}`}
          alt="login-pic"
          style={{ width: "100%", height: "100vh", objectFit: "cover" }}
        />
      </Sider>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
}
