




// import {
//   HomeWrapper,
//   Title,
//   Description,
//   Features,
// } from './Home.styled';

// const Home = () => {
//   return (
//     <HomeWrapper>
//       <Title>Project Management System</Title>

//       <Description>
//         A modern ticket management platform to track tasks, bugs, and features
//         efficiently across teams.
//       </Description>

//       <Features>
//         ✔ Role-based access (Admin & Employee)<br />
//         ✔ Secure JWT Authentication<br />
//         ✔ Task & Ticket Lifecycle Management<br />
//         ✔ Real-time Status Tracking
//       </Features>
//     </HomeWrapper>
//   );
// };



// export default Home;
import styled from "styled-components";

export const PageWrapper = styled.div`
  width: 100%;
  padding: clamp(1rem, 3vw, 2rem);
  box-sizing: border-box;

  display: flex;
  flex-direction: column;

  /* Allow page to grow naturally for browser scroll */
  min-height: calc(100vh - 80px);
`;



export const HeroHeader = styled.div`
  text-align: center;
  margin-bottom: clamp(2rem, 6vw, 3rem);
`;

export const MainTitle = styled.h1`
  margin: 0;
  font-size: clamp(1.8rem, 5vw, 2.8rem);
  font-weight: 700;
  color: #1565c0;
`;

export const SubTitle = styled.p`
  margin-top: 0.8rem;
  font-size: clamp(0.95rem, 2.5vw, 1.15rem);
  color: #555;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;


export const ImageContainer = styled.div`
  width: 50%;
  aspect-ratio: 16 / 9;
  border-radius: 20px;
  // margin: clamp(2rem, 6vw, 4rem) 0;
  margin: clamp(2rem, 6vw, 4rem) auto;
  margin-top: 0;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;



export const Section = styled.section`
  margin-bottom: clamp(2rem, 6vw, 4rem);
`;

export const WhiteBox = styled.div`
  background: white;
  padding: clamp(1.5rem, 4vw, 3rem);
  border-radius: 24px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.06);
`;

export const Title = styled.h2`
  margin: 0 0 clamp(1.5rem, 4vw, 2.5rem);
  text-align: center;
  color: #1976d2;
  font-size: clamp(1.3rem, 3vw, 1.8rem);
`;


export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: clamp(1rem, 3vw, 1.5rem);
`;



export const Card = styled.div`
  background: #f4f9ff;
  padding: clamp(1rem, 3vw, 1.5rem);
  border-radius: 18px;

  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  transition: 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: #e3f2fd;
  }
`;

export const IconImage = styled.img`
  width: 36px;
  height: 36px;
`;

export const CardTitle = styled.h4`
  margin: 0;
  color: #1976d2;
`;

export const Text = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: #555;
  line-height: 1.5;
`;

export const TechCard = styled(Card)`
  align-items: center;
  text-align: center;
  font-weight: 600;
`;
const Home = () => {
  return (
    <PageWrapper>

     
      <HeroHeader>
        <MainTitle>Project Management System</MainTitle>
        <SubTitle>
          A secure task management platform designed to manage
          tickets, streamline workflows, and enhance collaboration.
        </SubTitle>
      </HeroHeader>

      <ImageContainer>
        <img
          src="https://images.unsplash.com/photo-1557804506-669a67965ba0"
          alt="Project Management"
        
        />
      </ImageContainer>

  
      <Section>
        <WhiteBox>
          <Title>Key Features</Title>
          <Grid>

            <Card>
              <IconImage src="https://cdn-icons-png.flaticon.com/512/1828/1828640.png" />
              <CardTitle>Role-Based Access</CardTitle>
              <Text>Admin control and employee task-based permissions using JWT authentication.</Text>
            </Card>

            <Card>
              <IconImage src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png" />
              <CardTitle>User Management</CardTitle>
              <Text>Registration approval flow and secure profile management.</Text>
            </Card>

            <Card>
              <IconImage src="https://cdn-icons-png.flaticon.com/512/906/906175.png" />
              <CardTitle>Ticket Tracking</CardTitle>
              <Text>Create, assign and manage project tickets with attachments.</Text>
            </Card>

            <Card>
              <IconImage src="https://cdn-icons-png.flaticon.com/512/1827/1827933.png" />
              <CardTitle>Status Workflow</CardTitle>
              <Text>Structured lifecycle from Todo to Deployment with audit logs.</Text>
            </Card>

            <Card>
              <IconImage src="https://cdn-icons-png.flaticon.com/512/1380/1380338.png" />
              <CardTitle>Rich Comments</CardTitle>
              <Text>Formatted comments with timeline, author and timestamps.</Text>
            </Card>

            <Card>
              <IconImage src="https://cdn-icons-png.flaticon.com/512/3064/3064197.png" />
              <CardTitle>Security</CardTitle>
              <Text>Single active login, validations and robust backend security.</Text>
            </Card>

          </Grid>
        </WhiteBox>
      </Section>

     
      <Section>
        <WhiteBox>
          <Title>Tech Stack</Title>
          <Grid>

            <TechCard>
              <IconImage src="https://cdn.worldvectorlogo.com/logos/spring-boot-1.svg" />
              Spring Boot
            </TechCard>

            <TechCard>
              <IconImage src="https://cdn.worldvectorlogo.com/logos/react-2.svg" />
              React
            </TechCard>

            <TechCard>
              <IconImage src="https://tse4.mm.bing.net/th/id/OIP.XZ22uZj-vr7XFVP8pDVp-wHaHa?cb=defcache2&defcache=1&rs=1&pid=ImgDetMain&o=7&rm=3" />
              Ant Design
            </TechCard>

            <TechCard>
              <IconImage src="https://th.bing.com/th/id/OIP.lTu-ii2qA0ryAEOTT3f46wHaDt?w=349&h=174&c=7&r=0&o=7&cb=defcache2&dpr=1.3&pid=1.7&rm=3&defcache=1" />
              React Router
            </TechCard>

            <TechCard>
              <IconImage src="data:image/webp;base64,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" />
              React Query
            </TechCard>

            <TechCard>
              <IconImage src="https://1.bp.blogspot.com/-9jhEkn_uApY/Xxx35kNQB1I/AAAAAAAAMKk/8Jrv75ClwUoh8bkUncTzOJIyH2rU6RkjQCLcBGAsYHQ/s1280/jwt.png" />
              JWT
            </TechCard>

            <TechCard>
              <IconImage src="data:image/webp;base64,UklGRowRAABXRUJQVlA4IIARAAAwVwCdASp/Ae8APp1MokwlpCMiJXaZQLATiWNu4XCBA11dkxvj3H979Jqvv5jyFdWcbPuyzp/8X1Y/pf2Cf1Z6ZXmN/dH1cPSl/a/SA6m30U/Ls9o391spC+j/4n+99t3+u5hWXCcZ/J/xX/G9gfY/wCPZW7ogA+tfmufT+bn8xrONAj9MesP/o+R77B9hPy4PZH+8Hs0/syPwn47KispLE1hqaEDIQElcVAv/+0pAXQRCpqz9eRQN/XiVk4+3y48jnDVqaECBU2NkVpuVVcqs936ozm4pm/P9E3FjBLcnPNnX83cjtOcNWpoQIFWh27FTAOGu9HFEB/1v61V0WLlaZ/DHUrM1gnOGrU0BdZ6H7ckyCCRQI6eCLStn2bogXAg/KsTfIFNzfuNdGGBbRCspLE1VSN2cF+PagoUY8nANieyVIkC6DggyuUVUTssi/ic8jnDVm4UwW0sNrX7H/j9HgUfCHN/OMACgTKP89m51kCF51JxRCscKyksTJsLO0ylhqbdrzmeXo5WB+Gj4i80B9L46FBnGAuVlwvl8xHBb4KsnoqgAtmDizrELuqMxY4OtoT6I2RI1O0VoQMg/+9AbSA6901A6oFSVWeBoKgxS3P5c6EUEYBJioWDG+1vCxL7xWtRF7zBrcMTsC+l1oVP8tRwDbTnDVqZJOBi0pRWpMZai5XjP4iajMLdvqqzPtytfmrVY59e8y0l0n+z8+fFUrXebtPa7+MTIwkarZscdTQgZCAE9CN2aPlflHRMycpRWoSllXzWEVdWqCEkICSxNVHEspuaCXf7zT2oeWNIx+MpDoP3I44tv/vge7E1hqaEDH6L5+UoOMA7j9UDUV6q1lfUYiTYr+phfK+0rrRerWUVvHZUVlJYmq2ZFRXAecO9AHCWJw+rXlV48t/xo/JUQAUEIGQgJLE1hwHljkICSxMUAAP7+jcAABE4VObwfrBy5fPkJrVB8KRCHRSrPja+QjylUhW4SRwqxbeUKubpbnFzNpFZ+eOslaxQcDxAkfmYXP6JiUnOKtSKCzpNCxIdk8uVl6RmDywsqBlXXNl9mxbKrF1wPG3cW0iUj4HpiuOAAmJkPvUajZrY3iTni+3Y/fXB1y9SH2VhNMR7EmoDRC1vzvv7ML6Wh3Gbi2PZLSpcgLM72UaRSnIioLAOjVAyNCXwOsEojuYXem5Sp7WISFpavnxAYF4ixydR5zsgFBsEfJcSjpehgYKJ7Ee7NKuEXRM2PeK3wiJJxa6C1ZXsF8qzbb8o1bABdPgyZu3h5o1x9qKmxMWBB6bxWSjPcXwpQnc9lMTZBoMLUygWze5+mWcOpPwq71nCFqQyBUo1KR/Z/tyTQP6/nBedsVNUBm2dFNfmeABJs3DveggAUbKlW5PiAoqAWBf/891nO5PIwIKysytOho5Z4gdIvPvP2MMwTYs8JlOYQB968QOJNCIIeRdyD2ErWtuFA8Ftc4p/SeoU+l1WmB97KjGW8GPSKwb2ultxpMJk3BrlLVrca0NjNmfX49WIykRCHSktFD0EzfPrtjr8GY1puyzqdtoDCvOoFFxRT6b/3+cOXy4cKHuba04HbzMnRpdDCl51fEgVNgZwdDKximDvF2n3pR3e527W2TBKgZTyzBtU1BVl2s7jLyH9I084Uw1vgT2VoCTwt0BL6/eSFaVXYcEsTEIrgm8VeBorSBokNgeNloR1YNm3qJ2KniooJSMip8HlDlXz9NZq44juBFQN33RUO1s+8XRrAAAtpRTfo+NCbY/4KYAcGLlVBtvwt0JmqCZ1wFaAhNN3+Qzcoyvx4cysvBqum8Lv9ikv9Y2h8z/MAEVMQYRNFhta3siHpWd6ixC+hswziKeWAjEGkoZcmB0exgSaPc92qJ5XK7dagOwAWQ0Pq9ryJYyM2Eu66pWYsuQ7zFL/dLfY/6UEKfosNRahH2uIRCL1GyuMM1ckw+qBzgwwgQcR7ixcdmSo4bWHGAORR6Ix4gHx7sVpYnx8fusb5pTh7S0yzvN6fhWDzyM//nF/R9KaLxhzxzlJlAm6E0BpPOhqZ0aXe/tSSFDYp7pl1HgswRzPm4IxVhlfUyzgpvvyxZ8LMQWhP4Vd8AAd1wTSZan4m4UGTSK8afWanTx+oGDPaoDSfCUpXg2ON2FbYfkwts+gc/1ShtvG5iQGbrc4NbQ6AB9pOq+emQrXVQGk4/0Ai3ddv8rVXBtrk61ZrfZCidFcUrF96OMsUBN0X6BIxmLwOLe9EfTa55szyrYPs67Sc9J61CJjiZxOrcA02ChbaDrduTQQ0GCzI8GTo/aZRA88dlGfLd92t8qKBfrgzYUo042FAR0SODe/FxVAhQarLW4MF9Q1uaJTm71vFEwO3lv5v9hm4q+6x+VgfBr45hTSEmulnSydm4+8FqSrO1HgyhmUMLe1Z4OfAjEs4VJ1mrF5FxVPI+6yImHGHmIhH540vFR0SOD9vZyMfODz9jSc5Au/kjISjQLZza+Kp5EktoHmC0ldepLhhssOOFdMs41+/I8LFSjlBLe5hYJ5upW0q2b7aFt8C5vbno6P83T+iob3ubMop3YDd2g4P3sck+BnRDPxdjqSaLNOslsCl+xBrtG/BZ7Kx0uOM0Kt5T0z8AAK+JGXR8WXI5ChnGKKNnhMjriSAfcFjuqN5xlHvTbG/iZ20Fmdgp9YcugekNssaemL3MxHZZycUUAeNn3OL92hHX7wU33vii34A7qYW+wn3z6CRlqf1ZhZm6PcQ+GpYQwe5ZuXtiJvScepJs3gcITVobZGntivmf/fb9SV7QLe2nd9YAPehlW4HY1uMqblCOEMkKRUHx8GUK2Dt8i8ao2UJr41AOwadpbb8CkXv/Yrlids8fCP2DzdrPjmvYLaABUhjzk7WsY8oVygdxWyDBNJHwARKIUPPHwmbTbgZ/w10dnBhzBAvgfkXEnguHqTdQ3cuF2HqkTouElQMtu4iU97fm/1Y9s6/LBidQT0OLX8WXyoXoi6iGDyksfNOsvJLI9zzetMIdxC/4OjgheCly9CYvhuDircxzYdy/JM7AT4VRLE3+S74x72D6/cV1/IFznmrGLO0Nffty+h1IWipCKf06fW0ip2gaushWiKG4s36AObaIMstNDlfeI7c4NwvKc3qA3i5Ej73+ygci2VgwOCR2/RbAh0G3BqzwBSilC8+lUPPy2gZD1lLYkCb9v2mktFlQoOD9uNRY3skIGWP2m/dswrDi298To1QxuPadfmOkrydGinJSuxoDZdhU//iBkrif2TCxicWqYHaxbn/uPPw/9d8xq6k6yZ0m9JoBvf6n0lP8dn1o2pljlkPOLd0IVpPD9nl4OlXA/6KlE2fuiLUvBDV/HFwzMeT7T/mE4N6J0yZUnu/RpbNlg51kLNZwQdEb/ZYgU3pUBNgRbyfZUBhfzT1JnMGMse0JduhAK/91s4nQvJwrEdvw3zeL4B0lY00Z9Zwq9ktiH4PtjM69zhM41y/wpJrMf6IIMN6vo1ch/clhyXqaRoSLVpdU9gumntwWGg8+M0C2FTy1QtfxNxkk3th6Nfw38ySPtobO8RQTgK0nw3LDL55fDmMeEor+KraDioILfvGhpaVU3hJTgaa5cws0+MABzhbY1cmeJxQCUJZKqqZ4xeSIKAtijf4nrcQ7Xzl2xao8C9vS7g172p5BNeMD58Rvo9MgD3g4Jd3VNApDsbjJf9LpEFOlGw/RuVCBYrwNxy7cMXbd5uqc2OiIvmdDUnF0qWBELct/YJMYMYki/in6wnloU4rSfTR9Y/1jkdSGvPbMBNyUTALuMtQiKFw8SKvL89W81AJqcp/1uFOefYch9V8/Vgh9CsPOY0KPXhlqpZlEJSd/EqQhux63F0Qidnla40Dt9WLmbRBhjSlHI0S+sWuI3RGibxhM2RB61oKKQRbVNgS3YXWpYXiF3DFvhfwQ81OX0k6RbAFe1ToId77nALwfzPRh1ANDqRJDwFBolDsgp1/08sEvdGt+TbKb7WVCqn1TWNvNCgCx0WpgW/JOjnMrd1cON7as3Cu5+Dc680AHDKmfdKbr50ML7cSn+m79nOzoGvEH2vKDJGSAS5QvDFeBpUbC9sQ/fLsAZoeVZmrytzN3e6EWI3fB3dK/nFpeSvZ3mcauJcEhaPt5kwIGxDjMoE6OX3A57mLccWWQOr1gxz14Rdtn0sfEVC6gom1wuV6H3diIHD+ixn6J9pvo2SiVD4ZMa5qMrNZHrKZqWJL/TL4SNSLDYHOMRKB0JNXYJnO4pLfKxv1F+iACaVxE1JhFBLezfBZuB1GrbjySCmBxKARNW2wZPAAFat2o5c/ZV4PyS5wnzbxFecTK9qvhvRaINsZx1sclWXm5q+LtxXteXFu/1XZ/2srJ2JctWQ0ASJ+OMfxjgTM4o8TIaWHqeO0TC7YaOS6bqRAAlZuYH3VIvhCICgtz/GUymHWa7dJvd+EWnxTsAKCIGUnAT5zCivfCOaUt5Kbi61qRK1ZjW/VGHWKyAcSrr4SsIOw651JOOJeZa5Qg7GHkv7gXDhzsMJbsSKHptbj/McD97FMxMDfPhAhhUcIC/8eV6j31ptLmz0+w/RX4iJxlWsWnFIR0niwHgiRIByOghxQB7gU8etZv0N9Z5VxQsEf/TTOvs5u65SIZpYhhOA4Cc3gQtKcVmdBO48qNCNS1Gde3NdnyPSVBK34M3X2tlw8pljq8lo4wqvmk4Ss7AkjXPUCdHuBL1DRmTrCsPCIe7+Godp0GrXjlxbV3SYnWqQLfojfcYEN6/Jc2KN/9KJtpvZ/whFTllXGowKJViuZbwzof8Pe0oA/MGdTPWvYm0pE/SBBhMONU8XP47TyeC3dztywVM9qmaYV2+jOFSed1eaTP9vNIbB0EfrYJt9kZCRb2x6sz4OWnh6/0ONKT6yCtz0+PfrdC2C2ABO0S8ZeHqVliHI9BVQDgbFOa9bBO0LowU2kjczKmN/5j+JNfsdWAMxTeCS4M3LxPPnbM1y4OqpjRWxIjjosJ2Mp/a2d8AfCWf8+v2IfnjWK+cwKim5pzAeaLmZNek3uPQwDUSBfvIDiguyjh78NtkmsRPJIJ+IKf3UokwdFKkotaDpbwn93Uu5F5Bv91SuKc2aJmrgeP1flMT0YokpwDaQkvE5xQZDXeME41w/gJ57R1jDe5gIH34FtibwYphWBMwUi6XX2negzBVtNf+fXE6GaRNXBiRjUdmItqAr/Z6VYYLXlPs3xKIwTHdIjBNybtmoBeIzAxbJqa0Z1DcKujcjGAi+JexoIKjS7hfxUCjtyHXBoiXNYKQ7bJn7tnKx29b8EJMvoi8J62YcOka1CrxGcgJ8OnJXvUQXdoYcLOZCtIyh99EJtB6jrZiKmdqJCGa4r0qcgOvxVKZABCjWFTh9WeGwjTi+tfTFT9cyF/AmYLGUGWwZo2La1Sydt7zoomhLj95KO1/elVoC3pmQVTI92j42+2xjZUBLNekzu5NsL1pHzrdTNkq7tA8+RAHwMy9fo23RKBt0te2Scq2s82fvNGc2dZ/Hl3PMZC8Leb84m0tjNy34PFxvPtMeQ38JRDDB4jGwT1ZXDhb7pHxwV+i5OyL8zB30RwPZ42DhenMy06xMnAMtTcaf+IfDFrzl4mIw74qv+jf9Y2hlW5op3tXrP3V8MzQWVCLj7J9hWWCc93SBtHGWwKQjQ8vgxU7aaEWBr5OrFFe0Vy+Lj03FuynnHqa6Msfbw9HbaVsQcOK774quIPnt9JJ5lETmHnQhioMzUMymy8GRXzgAAAGwrcXD85N1226fv9ZGY5DlIvkAxwPTi5eA1uzJMNvjgcGhLgyPSElfjv61uluAhrGPrQxob2gMcTv2v6BtBtR2YRtZcK6Z4XxGC5t0KsOSjldoPPCDTq9NAfLWi/MfiUyJCNjdfyuJM4yiFp6b9G7FXn4QNwqlJSFJCKfxlVw0FImP+JmDSCaoNun8BXJ8ASBo4Lo4RCAD968AAAAAA" />
              MySQL
            </TechCard>

            <TechCard>
              <IconImage src="data:image/png;base64,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" />
              Cloudinary
            </TechCard>

          </Grid>
        </WhiteBox>
      </Section>

    </PageWrapper>
  );
};

export default Home;