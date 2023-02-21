import React, {useState,useEffect} from "react";

const Home = () => {

	const [input, setInput] = useState("");
	const [array, setArray] = useState([]);

	const addTask = (e) =>{
		if(e.keyCode === 13){
			setArray(array.concat({label: input, done: false}));
			setInput("")
		}
	}

	const deleteTask =(index) =>{
		let borrar = array[index]
		setArray(array.filter((item) => item!=borrar))
	}

	const logarUsario = () =>{
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

	const conectarLista = () =>{
		fetch('https://assets.breatheco.de/apis/fake/todos/user/javier', {
      method: "GET",
    })
    .then((response) =>response.json())
    .then((data) =>setArray(array.concat({label: input, done: false})))
    .catch((error) =>console.log(error))     
	}
	const agregarTarea = () =>{
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

	const eliminarTarea = () =>{
		fetch('https://assets.breatheco.de/apis/fake/todos/user/javier', {
      method: "PUT",
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
		logarUsario()
	},[])
	useEffect(()=>{
		conectarLista()
	},[])
	useEffect(()=>{
		agregarTarea()
	},[addTask])
	useEffect(()=>{
		eliminarTarea()
	},[deleteTask])

	
	
	
	return (
		<div className="container-sm">
			<h1>LISTA DE TAREAS PENDIENTES</h1>
			<ul>
				<li>
					<input onChange={(e)=>setInput(e.target.value)} value={input}
					 placeholder=" - AÑADIR TAREA" 
					 onKeyDown={addTask}></input>
				</li>
				{array.length > 0 ? array.map((item,index) => (
					<li  key={index}>
						{item.label} <button onClick={()=>deleteTask(index)}>
						<i className="fa fa-trash"></i></button>
					</li>
				)): null}
			</ul>
			<div id="total">{array.length}  TAREAS POR REALIZAR </div>
		</div>
	);
};

export default Home;
