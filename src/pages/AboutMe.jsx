import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import Footer from '../components/Footer';
const AboutMe = () => {
  return (
    <div>
      <AboutMeWrapper >
        <AboutMeContent className='pt-4 mt-4'>
          <div className='d-flex flex-column align-items-center gap-2'>
      

          </div>
          <AboutInfo >
            <h3 >About</h3>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.       
            </p>
     
          </AboutInfo>
        </AboutMeContent>
      </AboutMeWrapper>
      <Footer />

    </div>
  );
};

export default AboutMe;

const AboutMeWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding:0 1.2em;
  margin-bottom:5em;

   @media (min-width: 1000px) {
    flex-direction:row;
    padding:0em;

  }

`;

const AboutMeContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction:column;
  gap:2em;
    @media (min-width: 1000px) {
    flex-direction:row;
    gap:2em;
  }

`;

const ProfileImage = styled.img`
  max-width: 200px;
  border-radius: 2px;
  object-fit: contain;
`;

const ContactInfo = styled.div`
  .font-weight-bold {
    margin-bottom: 0;
  }
`;

const AboutInfo = styled.div`
  flex: 1;

  h3 {
    border-bottom: 1px solid #ccc;
    padding-bottom: 5px;
    margin-bottom: 10px;
  }

  p {
    margin-bottom: 20px;
  }
`;

const SkillsSection = styled.section`
  h5 {
    margin-top: 20px;
  }
`;

const HorizontalList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  
  li {
    margin-right: 10px;
    position: relative;
    display:flex;
    align-items:center;
    margin-right:1.2em;
    
    &:not(:last-child)::after {
      content: "•";
      font-size: 1.5em; /* Larger bullet size */
      color: midnightblue;
      position: absolute;
      right: -15px; /* Adjust position according to your preference */
    }
  }
`;