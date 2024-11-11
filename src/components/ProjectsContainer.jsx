import React from 'react';
import styled from 'styled-components';

const Container = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ProjectsContainer = ({ children }) => {
  return <Container id="projectsContainer">{children}</Container>;
};

export default ProjectsContainer;
