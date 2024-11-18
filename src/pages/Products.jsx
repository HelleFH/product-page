import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import productsData from '../products';
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

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProductIndex, setSelectedProductIndex] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [showLoginDetails, setShowLoginDetails] = useState(false);

  useEffect(() => {
    setProducts(productsData);
  }, []);

  const handleClose = () => {
    setShowModal(false);
    setSelectedProductIndex(null);
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
    setSelectedProductIndex(index);
    setSelectedColor(color);
    setShowModal(true);
  };
  

  const handleNext = () => {
    setSelectedProductIndex((prevIndex) => (prevIndex + 1) % products.length);
    setShowLoginDetails(false);
    setSelectedColor(overlayColors[(selectedProductIndex + 1) % products.length]);
  };

  const handlePrev = () => {
    setSelectedProductIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
    setShowLoginDetails(false);
    setSelectedColor(overlayColors[(selectedProductIndex - 1 + products.length) % products.length]);
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

      <ProductIntro className="w-100 font-weight-bold lh-base mt-5">
      Welcome to our page! Have a look at some of our great new products </ProductIntro>
      <ProductsContainer  id="products">
        
      {products.map((product, index) => (
        <ProductWrapper
          key={product.id}
          firstRow={index < 3} // First row (index 0, 1, 2) will have 3 columns for the first two items
          index={index}  // To decide if the product should span 2 or 3 columns
        >

          <ImageWrapper onClick={() => handleImageClick(index, overlayColors[index % overlayColors.length])}>
            <Image src={product.images[0]} alt={product.name} />
            <Overlay className="overlay" color={overlayColors[index % overlayColors.length]}>
            <OverlayText>
                <ProductName>{product.name}</ProductName>
              </OverlayText>
            </Overlay>
          </ImageWrapper>
        </ProductWrapper>
      ))}
    </ProductsContainer>

 
        <Footer />

        {selectedProductIndex !== null && (
          <CustomModal show={showModal} onHide={handleClose} centered                 overlayColor={overlayColors[selectedProductIndex % overlayColors.length]} // Pass overlayColor to CustomModal based on selectedProductIndex
          >
            <CustomModalDialog>
              <ModalBody {...handlers}>
                <CloseButton onClick={handleClose}>&times;</CloseButton>
                <ChevronLeft onClick={handlePrev}>
                  <FontAwesomeIcon icon={faChevronLeft} size="s" />
                </ChevronLeft>
                <ModalImageContainer backdropColor={selectedColor}>
                  <ModalImage
                    src={`${products[selectedProductIndex].images[0]}`}
                    alt={products[selectedProductIndex].name}
                    {...handlers}
                    backdropColor={selectedColor}
                  />
                </ModalImageContainer>
                <ChevronRight onClick={handleNext}>
                  <FontAwesomeIcon icon={faChevronRight} size="s" />
                </ChevronRight>
                <ModalText className='d-flex flex-1 flex-column p-4 justify-content-between'>
                  <ModalContent>
                    <ModalTitle className="mb-4">{products[selectedProductIndex].name}</ModalTitle>
                    <h5>{products[selectedProductIndex].descriptionHeader}</h5>
                    <ProductDescription>{products[selectedProductIndex].description}</ProductDescription>
                  </ModalContent>
               
                  <ButtonsContainer>
                    <ProductButton
                      href={products[selectedProductIndex].productLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      READ MORE 
                      {products[selectedProductIndex].buttonText}
                    </ProductButton>
             
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
      overlayColor={overlayColors[selectedProductIndex % overlayColors.length]} 

    >

<div className="custom-modal-content">

          <Modal.Header style={{ backgroundColor: overlayColors[selectedProductIndex % overlayColors.length] }} closeButton>
          <Modal.Title>Login Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {products[selectedProductIndex]?.username && (
          <div>
            <strong>User:</strong> {products[selectedProductIndex].username}
            <CopyIcon
              icon={faCopy}
              onClick={() => handleCopyToClipboard(products[selectedProductIndex].username)}
              title="Copy Username to Clipboard"
            />
            <br />
            <strong>Password:</strong> {products[selectedProductIndex].password}
            <CopyIcon
              icon={faCopy}
              onClick={() => handleCopyToClipboard(products[selectedProductIndex].password)}
              title="Copy Password to Clipboard"
            />
          </div>
        )}
        {products[selectedProductIndex]?.adminUsername && (
          <div>
            <strong>Admin:</strong> {products[selectedProductIndex].adminUsername}
            <CopyIcon
              icon={faCopy}
              onClick={() => handleCopyToClipboard(products[selectedProductIndex].adminUsername)}
              title="Copy Admin Username to Clipboard"
            />
            <br />
            <strong>Password:</strong> {products[selectedProductIndex].adminPassword}
            <CopyIcon
              icon={faCopy}
              onClick={() => handleCopyToClipboard(products[selectedProductIndex].adminPassword)}
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

export default Products;

const ProductsContainer = styled.section`
  display: flex;
  flex-direction:column;

  grid-template-columns: repeat(2, 1fr);  /* 6 equal columns */
  margin:3em auto 5em;
  width: 96%;


  /* Responsive layout - adjust the grid for larger screens */
  @media (min-width: 768px) {
    display: grid;

    max-width: 1100px;

    gap: 2em;  /* Gap between grid items */

    grid-template-columns: repeat(6, 1fr);  /* 6 equal columns for medium screens */
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(6, 1fr);  /* 6 equal columns for larger screens */
  }
`;

// Individual product wrapper in the grid
const ProductWrapper = styled.div`
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
    margin-bottom:2em;


  /* First two products span 3 columns each */
  grid-column: ${(props) => (props.firstRow && props.index < 2 ? "span 3" : "auto")};

  /* Subsequent products span 2 columns */
  @media (min-width: 768px) {
      margin-bottom:0em;

    grid-column: ${(props) =>
      props.index >= 2 ? "span 2" : props.firstRow && props.index < 2 ? "span 3" : "auto"};
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

const ProductIntro = styled.h5`
  font-weight: 700 !important;
  margin-bottom: 2.5em;
  padding-left: 0.5em;
place-self:center;
  max-width:1200px;
`;

const ImageWrapper = styled.div`
  position: relative;
  cursor: pointer;
  overflow: hidden;
    width: 100%;
    display:flex;
      align-items:center;


`;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
  transition: transform 0.8s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const ProductName = styled.span`
  font-size: 1.8rem; /* Larger font size for product name */
  font-weight: bold;
  font-family:'Istok Web';
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

const ProductDescription = styled.p`
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
  font-size: 28px;
  margin-bottom: 1rem;
  font-weight: 600;
  white-space:nowrap;
  margin-top:2em;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5em;
  align-items: center;
`;

const ProductButton = styled.a`
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

