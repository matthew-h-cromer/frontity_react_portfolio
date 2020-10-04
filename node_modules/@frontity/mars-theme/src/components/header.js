import React from "react";
import { connect, styled } from "frontity";
import Link from "./link";
import Nav from "./nav";
import MobileMenu from "./menu";
import Signature from "./Matthew_Cromer.svg";
import SidebarButtons from "./SidebarButtons";

const Header = ({ state }) => {
  return (
    <>
      <Container>
        <Link link="/">
          <img width="100%" src={Signature} />
        </Link>
        <MobileMenu />
        <Nav />
        <SidebarButtons />
        <ContactContainer>
          <ContactTitle>Contact me!</ContactTitle>
          <ContactSmall>I am currently open to freelance work.</ContactSmall>
          <ContactHeader>Email:</ContactHeader>
          <ContactInfo>matthew.h.cromer@gmail.com</ContactInfo>
          <ContactHeader>Text:</ContactHeader>
          <ContactInfo>734-634-4884</ContactInfo>
        </ContactContainer>
      </Container>
    </>
  );
};

// Connect the Header component to get access to the `state` in it's `props`
export default connect(Header);

const Container = styled.div`
  width: 325px;
  height: calc(100vh);
  box-sizing: border-box;
  padding: 24px;
  color: #fff;
  display: flex;
  flex-direction: column;
`;

const ContactContainer = styled.div`
  padding: 0 25px;
  margin-top: auto;
  color: white;
`;

const ContactTitle = styled.div`
  text-align: center;
  font-size: 24px;
  font-weight: 700;
`;

const ContactSmall = styled.div`
  text-align: center;
  font-weight: 300;
  font-style: italic;
`;

const ContactHeader = styled.div`
  margin-top: 10px;
  font-weight: 500;
  text-align: left;
  font-size: 14px;
`;

const ContactInfo = styled.div`
  font-weight: 300;
  text-align: left;
  font-size: 16px;
`;
