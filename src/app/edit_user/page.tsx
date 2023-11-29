"use client"

import * as React from 'react';
import CustomizedSteppers from '../stepper/page';

export interface IAppProps {
}

export function EditUser (props: IAppProps) {
  return (
    <div>
      
      <div className="text-center">

      <h6 className='mt-4 mb-4' > Edit your details </h6>

      </div>


        <CustomizedSteppers/>
        

    </div>
  );
}


export default  EditUser
