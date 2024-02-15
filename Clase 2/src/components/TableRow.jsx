import React from 'react'
import { Button } from 'react-bootstrap'
import Form from "react-bootstrap/Form";

const deleteProduct = () =>{

}

export const TableRow = ({name, price, category, discount, visible, id, setModalState,setProductState, product}) => {
    const editHandler = () =>{
        setProductState(product)
        setModalState(true)
    }
  return <>
         <tr>
          <td>{name}</td>
          <td>{category}</td>
          <td>{price}</td>
          <td>{discount ? discount : 0}</td>
          <td>  <Form.Check 
            type="checkbox"
            defaultChecked={visible}
          /></td>
          <td>
            <Button variant="danger" className='mx-1' size='sm' onClick={()=> deleteProduct(id)} >Eliminar <i className="bi bi-trash"></i></Button>
            <Button variant="primary" className='mx-1' size='sm' onClick={editHandler} >Editar <i className="bi bi-pencil"></i></Button>
          </td>
        </tr>
  </>
}
