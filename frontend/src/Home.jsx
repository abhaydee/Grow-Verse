import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'; 

// Import background image
import backgroundImage from './Assets/fbg.jpeg'; // Replace with your image file

// Styled components for styling
const HomeContainer = styled.div`
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  max-width: 800px;
  width: 100%;
  padding: 10px;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 30%;
`;

const Home = () => {
  return (
    <HomeContainer>
      <CardContainer>
        <Card>
            <Link to='/buy'>
                <h1>Buy</h1>
            </Link>
          
          {/* Add Buy related content here */}
        </Card>
        <Card>
        <Link to='/import'>
                <h1>Import</h1>
            </Link>
          {/* Add Import related content here */}
        </Card>
        <Card>
        <Link to='/play-me'>
                <h1>Start a new game</h1>
            </Link>
          {/* Add Start a new game related content here */}
        </Card>
      </CardContainer>
    </HomeContainer>
  );
};

export default Home;
