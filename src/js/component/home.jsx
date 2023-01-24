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
    .then((data) =>setArray(data))
    .catch((error) =>console.log(error))     
	}
	const devolverLista = () =>{
		fetch('https://assets.breatheco.de/apis/fake/todos/user/javier', {
      method: "PUT",
      body:json.stringify(array),
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
      body:json.stringify([]),
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
      body:json.stringify([]),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((response) =>response.json())
    .then((data) =>console.log(data))
    .catch((error) =>console.log(error))     
	}

	useEffect(()=>{
		conectarLista()
		console.log(array);
	},[])



	
	return (
		<div className="container">
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
						<i class="fa fa-trash"></i></button>
					</li>
				))}
			</ul>
			<div id="total"> {array.length}  TAREAS POR REALIZAR </div>
		</div>
	);
};

export default Home;
