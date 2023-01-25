import React, {useState,useEffect} from "react";

const Home = () => {

	const [input, setInput] = useState("");
	const [array, setArray] = useState([]);

	const addTask = (e) =>{
		if(e.keyCode === 13){
			setArray(array.concat(input));
			setInput("")
		}
	}

	const deleteTask =(index) =>{
		let borrar = array[index]
		setArray(array.filter((item) => item!=borrar))
	}
	const conectarLista = () =>{
		fetch('https://assets.breatheco.de/apis/fake/todos/user/javier', {
      method: "GET",
    })
    .then((response) =>response.json())
    //.then((data) =>setArray(data))      MIRAR ESTAS LINEAS PARA COMPROBAR
	.then((data) =>console.log(data))
    .catch((error) =>console.log(error))     
	}
	const devolverLista = () =>{
		fetch('https://assets.breatheco.de/apis/fake/todos/user/javier', {
      method: "PUT",
      body:JSON.stringify(array),
      headers: {
        "Content-Type": "application/json"
      }
	  
    })
    .then((response) =>response.json())
    .then((data) =>console.log(data))
    .catch((error) =>console.log(error))     
	}
	const nuevoUsario = () =>{
		fetch('https://assets.breatheco.de/apis/fake/todos/user/javier', {
      method: "POST",
      body:JSON.stringify([]),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((response) =>response.json())
    .then((data) =>console.log(data))
    .catch((error) =>console.log(error))     
	}
	const eliminarUsario = () =>{
		fetch('https://assets.breatheco.de/apis/fake/todos/user/javier', {
      method: "DELETE",
      body:JSON.stringify([]),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((response) =>response.json())
    .then((data) =>console.log(data))
    .catch((error) =>console.log(error))     
	}
	useEffect(()=>{
		devolverLista()
		nuevoUsario()
		eliminarUsario()
	},[])
	
	
	
	return (
		<div className="container-sm">
			<h1>LISTA DE TAREAS PENDIENTES</h1>
			<ul>
				<li>
					<input onChange={(e)=>setInput(e.target.value)} value={input}
					 placeholder=" - AÑADIR TAREA" 
					 onKeyDown={addTask}></input>
				</li>
				{array.map((item,index) => (
					<li  key={index}>
						{item} <button onClick={()=>deleteTask(index)}>
						<i className="fa fa-trash"></i></button>
					</li>
				))}
			</ul>
			<div id="total">{array.length}  TAREAS POR REALIZAR </div>
			<div id="botones" className="d-flex justify-content-sm-center btn btn-primary btn-sm">
					<button onClick={nuevoUsario}>NUEVO USUARIO</button>
					<button onClick={eliminarUsario}>ELIMINAR USUARIO</button>
				</div>
		</div>
	);
};

export default Home;
