


import {
  HomeWrapper,
  Title,
  Description,
  Features
} from './Home.styled';

const Home = () => {
  return (
    <HomeWrapper>
      <Title>Project Management System</Title>

      <Description>
        A modern ticket management platform to track tasks, bugs, and features
        efficiently across teams.
      </Description>

      <Features>
        ✔ Role-based access (Admin & Employee)<br />
        ✔ Secure JWT Authentication<br />
        ✔ Task & Ticket Lifecycle Management<br />
        ✔ Real-time Status Tracking
      </Features>
    </HomeWrapper>
  );
};

export default Home;
