import dpsLogo from './assets/DPS.svg';
import './App.css';
import { UsersTable } from './components';

function App() {
	
	return (
		<>
			<div>
				<a href="https://www.digitalproductschool.io/" target="_blank">
					<img src={dpsLogo} className="logo" alt="DPS logo" />
				</a>
			</div>
			<div className="home-card">
				<p>Your solution goes here 😊</p>
				<p className='text-red-500 bg-blue-400'> Testing</p>
				<UsersTable />
			</div>
		</>
	);
}

export default App;
