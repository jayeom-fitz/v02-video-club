import React from 'react'
import { useParams } from "react-router-dom";

import List from './List';
import Read from './Read';
import Write from './Write';

function Board(props) {
  const { property1, property2 } = useParams();

  console.log(property1, property2)

  const switchComponent = () => {
    switch(property2) {
      case undefined : return <List user={props.user} />
      case 'write': return <Write user={props.user} />
      case 'edit': return <Write user={props.user} edit={true}/>
      default : return <Read user={props.user} />;
    }
  }

  return (
    <>{switchComponent()}</>
  )
}

export default Board

