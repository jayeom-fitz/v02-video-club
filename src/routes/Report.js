import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import queryString from 'query-string'

function Report(props) {
  const history = useHistory();

  function init() {
    const queryObj = queryString.parse(history.location.search);	// 문자열의 쿼리스트링을 Object로 변환

    const { docId, collection } = queryObj;
    console.log('docId', docId)
    console.log('collection', collection)
  }

  useEffect(() => {
    init()
  }, [history])

  return (
    <div>
      aaa
    </div>
  )
}

export default Report
