'use client';
import React from 'react';
import Image from 'next/image';
import { Layout, Menu, theme } from 'antd';
import nasdaq from "../app/images/nasdaq.jpg";
import { Input, Space } from 'antd';
import type { GetProps } from 'antd';
import Stocks from "../components/input";



type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;


const { Header, Content, Footer } = Layout;


const layoutStyle: React.CSSProperties = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 20px',
  backgroundColor: '#4096ff',
  color: '#fff',
};

const contentStyle: React.CSSProperties = {
  flex: 1,
  padding: '20px',
  backgroundColor: '#0958d9',
  color: '#fff',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  backgroundColor: '#4096ff',
  color: '#fff',
  padding: '10px 0',
};


export default function Nasdaq() {
  // Ensure the function returns JSX
  return (
    <Layout style={{length:"100vh", width:"100wh"}}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo"/>
        <Image alt="Example" src={nasdaq} 
        width={300} height={50} />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ flex: 1 }}
        />
      </Header>
      <Content style={{ contentStyle }}>
     
        <Stocks/>
      </Content>
      <Footer style={{ footerStyle }}>
        
      </Footer>
    </Layout>
  );
}