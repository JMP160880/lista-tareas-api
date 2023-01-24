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
