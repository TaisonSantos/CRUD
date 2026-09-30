import { useState ,useEffect} from 'react'

import FormCadastroProd from "./assets/componentes/FormCadastroProd"

import ListaProdutos from "./assets/componentes/ListaProdutos"

import './App.css'


function App() {

 

  return (
    <>
    <FormCadastroProd/>
          <div>
            <h1>Meu sistema</h1>
        </div>
      <ListaProdutos/>
    
    </>
  )
}

export default App
