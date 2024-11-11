import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import projectsData from '../projects';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSwipeable } from 'react-swipeable';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faCopy } from '@fortawesome/free-solid-svg-icons';



const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-50px);
  }
`;

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [showLoginDetails, setShowLoginDetails] = useState(false);

  useEffect(() => {
    setProjects(projectsData);
  }, []);

  const handleClose = () => {
    setShowModal(false);
    setSelectedProjectIndex(null);
    setShowLoginDetails(false);
  };

  const handleShowLoginDetails = () => {
    setShowLoginDetails(true);
  };

  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert(`${text} copied to clipboard!`);
  };

  const handleCloseLoginDetails = () => {
    setShowLoginDetails(false);
  };

  const handleImageClick = (index, color) => {
    setSelectedProjectIndex(index);
    setSelectedColor(color);
    setShowModal(true);
  };
  

  const handleNext = () => {
    setSelectedProjectIndex((prevIndex) => (prevIndex + 1) % projects.length);
    setShowLoginDetails(false);
    setSelectedColor(overlayColors[(selectedProjectIndex + 1) % projects.length]);
  };

  const handlePrev = () => {
    setSelectedProjectIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
    setShowLoginDetails(false);
    setSelectedColor(overlayColors[(selectedProjectIndex - 1 + projects.length) % projects.length]);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
  });

  const overlayColors = [
    '#ea766a',
    '#a0c4a3',
    '#5dc6aa',
    '#da9567',
    ' #7b68a0',
    '#da9dd9',
    '#6da178',
    '#ddd173',
    '#9a99e3',
    '#cab0a6',
  ];

  return (
    <>
      <div id="container">
    
        <ProjectsContainer className="projects">
        <ProjectIntro className="w-100 font-weight-bold lh-base mt-5">
Welcome to our page! Have a look at some of our great new products </ProjectIntro>
          {projects.map((project, index) => (
            <ProjectWrapper key={project.id} large={(index === 0 || index === 1)}>
              <ImageWrapper onClick={() => handleImageClick(index, overlayColors[index % overlayColors.length])}>
                <Image src={project.images[0]} alt={project.name} />
                <Overlay className="overlay" color={overlayColors[index % overlayColors.length]}>
                  <OverlayText className="text-uppercase">{project.name}</OverlayText>
                </Overlay>
              </ImageWrapper>
            </ProjectWrapper>
          ))}
        </ProjectsContainer>
        <Footer />

        {selectedProjectIndex !== null && (
          <CustomModal show={showModal} onHide={handleClose} centered                 overlayColor={overlayColors[selectedProjectIndex % overlayColors.length]} // Pass overlayColor to CustomModal based on selectedProjectIndex
          >
            <CustomModalDialog>
              <ModalBody {...handlers}>
                <CloseButton onClick={handleClose}>&times;</CloseButton>
                <ChevronLeft onClick={handlePrev}>
                  <FontAwesomeIcon icon={faChevronLeft} size="s" />
                </ChevronLeft>
                <ModalImageContainer backdropColor={selectedColor}>
                  <ModalImage
                    src={`${projects[selectedProjectIndex].images[0]}`}
                    alt={projects[selectedProjectIndex].name}
                    {...handlers}
                    backdropColor={selectedColor}
                  />
                </ModalImageContainer>
                <ChevronRight onClick={handleNext}>
                  <FontAwesomeIcon icon={faChevronRight} size="s" />
                </ChevronRight>
                <ModalText className='d-flex flex-1 flex-column p-4 justify-content-between'>
                  <ModalContent>
                    <ModalTitle className="mb-4">{projects[selectedProjectIndex].name}</ModalTitle>
                    <h5>{projects[selectedProjectIndex].descriptionHeader}</h5>
                    <ProjectDescription>{projects[selectedProjectIndex].description}</ProjectDescription>
                  </ModalContent>
               
                  <ButtonsContainer>
                    <ProjectButton
                      href={projects[selectedProjectIndex].projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      READ MORE 
                      {projects[selectedProjectIndex].buttonText}
                    </ProjectButton>
             
                  </ButtonsContainer>
                </ModalText>
              </ModalBody>
            </CustomModalDialog>
          </CustomModal>
        )}
      <Modal

      show={showLoginDetails}
      onHide={handleCloseLoginDetails}
      centered
      dialogClassName="custom-modal"
      backdropClassName="custom-backdrop"
      overlayColor={overlayColors[selectedProjectIndex % overlayColors.length]} 

    >

<div className="custom-modal-content">

          <Modal.Header style={{ backgroundColor: overlayColors[selectedProjectIndex % overlayColors.length] }} closeButton>
          <Modal.Title>Login Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {projects[selectedProjectIndex]?.username && (
          <div>
            <strong>User:</strong> {projects[selectedProjectIndex].username}
            <CopyIcon
              icon={faCopy}
              onClick={() => handleCopyToClipboard(projects[selectedProjectIndex].username)}
              title="Copy Username to Clipboard"
            />
            <br />
            <strong>Password:</strong> {projects[selectedProjectIndex].password}
            <CopyIcon
              icon={faCopy}
              onClick={() => handleCopyToClipboard(projects[selectedProjectIndex].password)}
              title="Copy Password to Clipboard"
            />
          </div>
        )}
        {projects[selectedProjectIndex]?.adminUsername && (
          <div>
            <strong>Admin:</strong> {projects[selectedProjectIndex].adminUsername}
            <CopyIcon
              icon={faCopy}
              onClick={() => handleCopyToClipboard(projects[selectedProjectIndex].adminUsername)}
              title="Copy Admin Username to Clipboard"
            />
            <br />
            <strong>Password:</strong> {projects[selectedProjectIndex].adminPassword}
            <CopyIcon
              icon={faCopy}
              onClick={() => handleCopyToClipboard(projects[selectedProjectIndex].adminPassword)}
              title="Copy Admin Password to Clipboard"
            />
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
      
        <Button variant="primary" onClick={handleCloseLoginDetails}>
          OK
        </Button>
      </Modal.Footer>
      </div>
      </Modal>
      </div>
    </>
  );
};

export default Projects;


const ProjectsContainer = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  gap: 1em;
  margin-bottom: 3em;
  max-width:1175px;
  margin:0 auto 5em;
`;

const ProjectWrapper = styled.div`
  position: relative;
  height: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 96vw;
  margin: 0 auto;

  @media (min-width: 768px) {
    max-width: 375px;
  }
`;

const LoginButton = styled.a`
  position: absolute;
  margin-bottom: 1em;
  color: #333;
  border: none;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  bottom: 60px;

  &:hover {
    transform: scale(1.02);
  }

  @media (min-width: 1050px) {
    position: relative;
    bottom: 0;
  }
`;

const ProjectIntro = styled.h5`
  font-weight: 700 !important;
  margin-bottom: 2.5em;
  padding-left: 0.5em;
  max-width: 900px;
`;

const ImageWrapper = styled.div`
  position: relative;
  cursor: pointer;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
  transition: transform 0.8s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.color};
  opacity: 0.93;
  transition: opacity 0.8s ease;

  ${ImageWrapper}:hover & {
    opacity: 0;
  }
`;

const OverlayText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 1;
  color: #ffffff !important;
  font-size: 1.6em;
  font-weight: bold;
  text-align: center;
  letter-spacing: 5px;
  transition: opacity 0.6s ease;
`;

const CustomModal = styled(Modal)`
  transition: transform 0.3s ease-out;

  .modal-content {
    border: none !important;

    max-width: fit-content;
    overflow: hidden;
    margin: 0 auto;
    border-radius:0px;
  }

  p {
    padding: 0em;
  }

  @media (min-width: 1200px) {

    .modal-dialog {
      p {
        padding-right: 3em;
      }
    }
  }
`;

const CustomModalDialog = styled(Modal.Dialog)`
  animation: ${fadeIn} 0.3s ease-out;
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;

  &.fade-exit-active {
    animation: ${fadeOut} 0.3s ease-out;
  }

  transition: transform 0.3s ease-out;

  .modal-dialog {
    max-width: 800px !important;
  }

  @media (min-width: 1200px) {
    .modal-dialog {
      max-width: 1000px !important;
    }
  }
`;

const ModalBody = styled(Modal.Body)`
  padding: 0;
  border-radius: 0px !important;
  position: relative;

  @media (min-width: 1000px) {
    display: flex;
    flex-direction: row;
    width: 100% !important;
  }
`;
const ModalText = styled.div`
max-width:300px;
`;
const ModalImageContainer = styled.div`
  width: 100%;
  max-width: 600px;
  object-fit: contain;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: 1000px) {
    display: flex;
    flex-direction: row;
    width: 90% !important;

  
  }
`;

const ModalImage = styled.img`
  max-width: 100%;
  object-fit: contain;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.backdropColor};
    z-index: 999;
    opacity: 0.1;
  }
`;

const ProjectDescription = styled.p`
  height: 180px;

  @media (min-width: 1050px) {
    height: fit-content;
  }
`;

const Chevron = styled.div`
  position: absolute;
  z-index: 9999;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  width: 20px;
  height: 20px;

  @media (min-width: 1050px) {
    width: 40px;
    height: 40px;
  }

  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

const ChevronLeft = styled(Chevron)`
  left: 10px;
  img {
    transform: rotate(-90deg);
    float: left;
  }
`;

const ChevronRight = styled(Chevron)`
  right: 10px;
  img {
    transform: rotate(90deg);
    float: right;
  }
`;

const ModalContent = styled.div`
  max-width: 400px;
  position: relative;
`;

const ModalTitle = styled.h2`
  font-size: 31px;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5em;
  align-items: center;
`;

const ProjectButton = styled.a`
  display: inline-block;
  background-color: #fff;
  color: #333 !important;
  padding: 7px 15px;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  overflow: hidden;
  border: solid 1px #333;
  border-radius: 20px;
  transition: background-color 0.4s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #555;
    color: #fff !important;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    width: 0;
    height: 100%;
    background-color: #555;
    color: white !important;
    transform: translateX(-50%);
    transition: width 0.4s ease;
    z-index: -1;
  }

  &:hover::after {
    width: calc(100% + 30px);
  }
`;

const CloseButton = styled(Button)`
  position: absolute;
  font-size: 1.8rem;
  background: none;
  border: none;
  color: #333;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  right: 20px;
  top: 20px;
  z-index: 9999;
`;

const GithubButton = styled.a`
  position: relative;
  display: inline-block;
  background-color: #333;
  color: #fff !important;
  padding: 7px 15px;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  overflow: hidden;
  border: solid 1px #333;
  border-radius: 20px;
  transition: background-color 0.4s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #555;
    color: #fff !important;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    width: 0;
    height: 100%;
    background-color: #555;
    color: white !important;
    transform: translateX(-50%);
    transition: width 0.4s ease;
    z-index: -1;
  }

  &:hover::after {
    width: calc(100% + 30px);
  }
`;

const LoginModalDialog = styled(Modal.Dialog)`
  animation: ${fadeIn} 0.3s ease-out;
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;

  &.fade-exit-active {
    animation: ${fadeOut} 0.3s ease-out;
  }

  .modal-content {
    width:100%;
    margin: 0 auto; 
  }
`;


const CopyIcon = styled(FontAwesomeIcon)`
  margin-left: 20px;
  cursor: pointer;

  &:hover {
    &:before {
      content: attr(title);
      position: absolute;
      background-color: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 5px;
      border-radius: 5px;
      font-size: 12px;
      white-space: nowrap;
      z-index: 999;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    &:after {
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 5px solid rgba(0, 0, 0, 0.8);
      bottom: -5px;
      left: 50%;
      transform: translateX(-50%);
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    &:hover:before,
    &:hover:after {
      opacity: 1;
    }
  }
`;

