import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
  background-color: #fff; 
  padding: 2em;
`;

const ProjectsBackground = ({ children }) => {
  return <Background>{children}</Background>;
};

export default ProjectsBackground;
