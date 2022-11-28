import React, { useEffect } from 'react'
import axios from 'axios'
import PouchDB from 'pouchdb-browser';

import { initializeData } from '../utils/data.js'

function Main() {
    useEffect(()=>{
        initializeData();
    },[])
  return (
    <div>Main</div>
  )
}

export default Main