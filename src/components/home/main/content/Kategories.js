import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";

import styled from 'styled-components'

import { getKategories } from 'fb/main/get';

function Kategories() {
  const { property1 } = useParams();

  const [loaded, setLoaded] = useState(false);
  const [kategories, setKategories] = useState([]);

  async function getKategoriesData() {
    const array = await getKategories(true);

    setKategories(array); setLoaded(true);
  }

  useEffect(() => {
    getKategoriesData();
  }, [])

  return (
    <Container>
      {loaded && <Content>
        {kategories.length > 0 && kategories.map((k) => 
          <Kategorie key={k.id} 
                    bgColor={property1 === k.id ? '#0f52ba' : '#f70d1a'}>
            <StyledLink to={`/home/${k.id}`} >
              {k.name}
            </StyledLink>
          </Kategorie>
        )}
      </Content>}
    </Container>
  )
}

export default Kategories

const Container = styled.div`
  width: 70%;
  padding: 10px 30px;
  margin: auto;
`
const Content = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`
const Kategorie = styled.div`
  margin: 0 5px;
  padding: 2px 5px;
  border-radius: 5px;
  background-color: ${(props) => props.bgColor};
  border: 2px solid #eee;

  &:hover {
    border: 2px solid black;
  }
`
const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`