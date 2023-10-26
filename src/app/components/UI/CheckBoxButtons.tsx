import { FormGroup, FormControlLabel, Checkbox } from '@mui/material'
import React, { useState } from 'react'

interface Props{
    items:string[],
    checked?:string[],
    onChange:(items:string[]) =>void
}

const CheckBoxButtons = ({items,checked,onChange}:Props) => {

    const[checkItems,setCheckedItems] = useState(checked || []);

    const handleChecked=(value:string)=>{
        const currentIndex = checkItems.findIndex(item=>item === value);
        let newChecked:string[] =[];
        if(currentIndex === -1)
            newChecked =[...checkItems,value];
        else
            newChecked = checkItems.filter(item=>item !== value)
        setCheckedItems(newChecked);
        onChange(newChecked);
    }

  return (
    <FormGroup>
              {items.map((item)=>{
                return <FormControlLabel control={<Checkbox
                    checked={checkItems.indexOf(item)!==-1}
                    onClick={()=>handleChecked(item)}
                />} label={item} key={item} />
              })}
          </FormGroup>
  )
}

export default CheckBoxButtons