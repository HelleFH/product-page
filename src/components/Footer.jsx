import React from 'react';
import styled from 'styled-components';
import { ReactComponent as LinkedInIcon } from '../asssets/linkedin.svg';
import { ReactComponent as GitHubIcon } from '../asssets/github.svg'; 

const Footer = () => {
  return (
    <FooterContainer className='pb-2'>
      <FooterItem>Developed by Helle Fruergaard</FooterItem>
      <FooterItem>&copy; 2024 </FooterItem>
      <FooterItem>
        <ContactInfo className='d-flex gap-3 flex-column'>
          <h3>Contact Info</h3>
          <div>
            <span>Call:</span> +45 29664077
          </div>
          <div>
            <span>Email:</span> Hellefruergaardh@gmail.com
          </div>
          <SocialLinks>
            <a href="https://www.linkedin.com/in/helle-fruergaard-577763112/" target="_blank" rel="noopener noreferrer">
              <LinkedInIcon />
            </a>
            <a href="https://github.com/HelleFH/" target="_blank" rel="noopener noreferrer">
              <GitHubIcon />
            </a>
          </SocialLinks>
        </ContactInfo>
      </FooterItem>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  display: flex;
  flex-direction:column-reverse;
  justify-content: center;
  align-items: center;
  background-color: #f8f8f8;
  width: 100vw !important;
  position: relative;
  bottom: 0;
  left: 0;
  gap:1em;

  h3 {
    font-size: 25px;
    letter-spacing: 5px;
    font-weight: 600;
    text-transform: uppercase;
  }

  span {
    font-weight: bold;
  }

    @media (min-width: 1000px)  {

  flex-direction:row;
    justify-content: space-between;
  align-items: flex-end;
   padding: 3em 0 1em 3em;
}

`;

const FooterItem = styled.div`
  flex: 3;
  text-align: left;
  font-size: 0.9em;
  padding-top:2em;

  &:first-child {
    text-align: left;
  }

  &:nth-child(2) {
    text-align: center;
  }


        @media (min-width: 1000px)  {

  flex-direction:row;
    justify-content: space-between;
  align-items: flex-end;
   padding: 3em 0 1em 3em;

     &:last-child {
    align-self: flex-end;
  }
}
`;

const ContactInfo = styled.div`


`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;

svg {     
 width:20px; 
 height:20px;;
}
  a {
    color: inherit;
    font-size: 1.5em;
    transition: color 0.3s ease;

    &:hover {
      color: #007bff; /* Change color on hover */
    }
  }

  
    @media (min-width: 1000px)  {

    justify-content: flex-start;
  
}
`;

export default Footer;