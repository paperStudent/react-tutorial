import { useState, useRef } from 'react';
import TodoList from './TodoList.jsx';
import Header from './Header.jsx';
import './styles/style.css';

function App() {

	const [todos, setTodos] = useState([]);
	const [clickCnt, setCnt] = useState(0);

	const todoNameRef = useRef();

	const click_cnt = () => {
		setCnt(clickCnt + 1);
	};


	const handleAddTodo = () => {
		//タスクを追加する。
		const name = todoNameRef.current.value;
		if(name === '') return false;
		click_cnt();
		setTodos((prevTodos) => {
			return [...prevTodos, {id: clickCnt, name: name, completed: false}];
		});
		todoNameRef.current.value = null;
	};

	const toggleTodo = (id) => {
		const newTodos = [...todos];
		const todo = newTodos.find((todo) => todo.id === id);
		todo.completed = !todo.completed;
		setTodos(newTodos);
	};

	const handleClear = () => {
		const newTodos = todos.filter((todo) => !todo.completed);
		setTodos(newTodos);
	}

	const cntRemainTask = () => {
		return todos.filter((todo) => !todo.completed).length;
	};

	const mainHeight = {
		height:"calc(100vh - 274px)"
	};

	return (
		<>
			<Header />
			<main className='w-full flex justify-center bg-yellow-100 notosansjp'>
				<div className='flex justify-around w-full pt-20' style={mainHeight}>
					<div className='flex flex-col items-center'>
						<input type="text" ref={todoNameRef} className="my-6 w-64 h-12 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
						<TodoList todos={todos} toggleTodo={toggleTodo} />
					</div>
					<div className='flex flex-col items-center'>
						<button onClick={handleAddTodo} className="rounded-full text-white opacity-75 bg-blue-500 px-4 py-3 my-6 w-48">タスクを追加</button>
						<button onClick={handleClear} className="rounded-full text-white opacity-75 bg-blue-500 px-4 py-3 my-6 w-48">完了したタスクの削除</button>
						<div>残りのタスク:{cntRemainTask()}</div>
					</div>	
				</div>
			</main>
		</>
	);
}

export default App;
