import dpsLogo from './assets/DPS.svg';
import './App.css';
import Users from './components/Users';

function App() {
	
	return (
		<>
			<div>
				<a href="https://www.digitalproductschool.io/" target="_blank">
					<img src={dpsLogo} className="logo" alt="DPS logo" />
				</a>
			</div>
			<div className="home-card">
				<p>My solution goes here 😊</p>
				<Users />
			</div>
		</>
	);
}

export default App;
