"use client"

import * as React  from 'react';

import {useEffect,useState} from 'react'

export interface IAppProps {
}

export default function Welcome (props: IAppProps) {


  const [name,setName] = useState()

  useEffect(()=>{

    const name:any = localStorage.getItem('name')

    setName(name)


  },[])

  return (
    <div  className='text-center mt-4' >

        welcome {name} your details has been successfully saved
      
    </div>
  );
}
