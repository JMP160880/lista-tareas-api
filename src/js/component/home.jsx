import React, {useState,useEffect} from "react";

const Home = () => {

	const [input, setInput] = useState("");
	const [array, setArray] = useState([]);

	const addTask = (e) =>{
		if(e.keyCode === 13){
			setArray([...array,{label: input, done: false}]);
			setInput("");
		}
	}

	const deleteTask =(index) =>{
		let borrar = array[index]
		setArray(array.filter((item) => item!=borrar))
	}

	function createUser() {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/javier", {
		  method: "POST",
		  headers: {
			"Content-Type": "application/json",
		  },
		  body: JSON.stringify([]), 
		}) 
		  .then((response) => response.json()) 
		  .then((data) => {
			
		  if (data.result === "ok") {getUser()}
	
			console.log(data)}) 
		  .catch((error) => console.log(error)); 
	  }
	
	function getUser() {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/javier", {
		  method: "GET",
		}) 
		  .then((response) => {
		   console.log(response.status); 
	
		  if (response.status === 404) {createUser()} 
	
			
			return response.json()}) 
		  .then((data) => setArray(data)) 
		  .catch((error) => console.log(error)); 
	  }
	
	function updateToDos() {
		fetch('https://assets.breatheco.de/apis/fake/todos/user/javier',{
			method: 'PUT', 
			headers: {
				   'Content-Type': 'application/json'
		   },
	
		    body: JSON.stringify(array)
	
		  })
		  .then((response)=>response.json())
		  .then((data)=>console.log(data))
		  .catch((error)=>console.log(error))
	  }
	
	
	function deleteToDos() {
		fetch('https://assets.breatheco.de/apis/fake/todos/user/javier',{
		  	method: 'DELETE', 
	   })
		   .then((response)=>response.json())
		   .then((data) => console.log(data))
		   .catch((error)=>console.log(error))
	   }
	
	  useEffect(() => {
		
		getUser();

		console.log("Ejecutando, componente cargado");

	  }, []); 
	
	  useEffect(() => {
		
		if (array.length > 0) {
		   updateToDos();
		}
		  
	  }, [array]); 
	
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
			<div className="grid text-center my-2">
        	<button className="col-2" onClick={() => deleteToDos()}>LIMPIAR DATOS</button>
          	</div>
		</div>
		
	);
};

export default Home;
