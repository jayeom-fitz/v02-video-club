import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

import styled from 'styled-components'

import { getKategories } from 'fb/main/get';

function Kategories() {
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
          <Kategorie key={k.id}>
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
  width: 80%;
  padding: 20px 50px;
  margin: auto;
  background-color: white;
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
  background-color: #f70d1a;
`
const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`
// #f70d1a ferrari red
// #ffa6c9 carnation