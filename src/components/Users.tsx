import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import UsersTable from './UsersTable';
import { IUser } from '..';
import { BASE_URL } from '~/utils';
import { Label } from './ui/label';
import { useDebounce } from '~/hooks';
import { Button } from './ui/button';

const countPerRequest = 30;
let isFirstTime = true;
const Users = () => {
	// const [users, setUsers] = useState<IUser[]>([]);
	const [{ isLoading, total, error, users }, setState] = useState<{
		isLoading: boolean;
		error: string;
		total: number;
		users: IUser[];
	}>({
		isLoading: false,
		error: '',
		users: [],
		total: 0,
	});
	const [nameFilter, setNameFilter] = useState('');
	const [limit, setLimit] = useState(30);
	const [city, setCity] = useState('');
	const [highlightOldest, setHighlightOldest] = useState(false);
	const [oldestPerCity, setOldestPerCity] = useState<IUser[]>([]);

	const [filteredUsers, setFilteredUsers] = useState<IUser[]>(users);
	const debouncedSearchTerm = useDebounce(nameFilter);

	// console.log("users ", users);
	useEffect(() => {
		if (debouncedSearchTerm) {
			const selected = users.filter(
				({ firstName, lastName, address }) =>
					(firstName
						.toLowerCase()
						.includes(debouncedSearchTerm.trim().toLowerCase()) ||
						lastName
							.toLowerCase()
							.includes(
								debouncedSearchTerm.trim().toLowerCase()
							)) &&
					address.city
						.toLowerCase()
						.includes(city.trim().toLowerCase())
			);
			setFilteredUsers(selected);
		} else {
			setFilteredUsers(users);
		}
	}, [debouncedSearchTerm]);

	const nameChangeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setNameFilter(value);
	};

	const cityChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { value } = e.target;
		setCity(value);

		if (value.trim().toLocaleLowerCase() != city.trim().toLowerCase()) {
			const selected = users.filter(
				({ firstName, lastName, address }) =>
					(firstName
						.toLowerCase()
						.includes(nameFilter.trim().toLowerCase()) ||
						lastName
							.toLowerCase()
							.includes(nameFilter.trim().toLowerCase())) &&
					address.city
						.toLowerCase()
						.includes(value.trim().toLowerCase())
			);
			setFilteredUsers(selected);
		}
	};

	const highlightOldestHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { checked } = e.target;
		setHighlightOldest(checked);
	};

	useEffect(() => {
		async function fetchUsers() {
			try {
				const existingLimit = isFirstTime
					? 0
					: parseInt(localStorage.getItem('limit') ?? '0');
				const limit = existingLimit + 30;
				setState((prev) => ({ ...prev, isLoading: true, error: '' }));
				const response = await fetch(
					`${BASE_URL}/users?limit=${limit}`
				);

				localStorage.setItem('limit', limit.toString());
				isFirstTime = false;
				const data: {
					users: IUser[];
					total: number;
					skip: number;
					limit: number;
				} = await response.json();
				const { users, total } = data;
				// console.log('data ', users);
				setFilteredUsers(users);
				sortOldestPerCity(users);
				setState({ isLoading: false, users, error: '', total });
			} catch (err: unknown) {
				const error = err as Error;
				setState({
					isLoading: false,
					total: 0,
					users: [],
					error: error.message,
				});
			}
		}

		fetchUsers();
	}, [limit]);

	const sortOldestPerCity = (_users: IUser[]) => {
		const _usersPerCity: Map<string, IUser> = new Map();
		_users.forEach((_u) => {
			const _city = _u.address.city.trim().toLowerCase();
			if (_usersPerCity.has(_city)) {
				const currentOldest = _usersPerCity.get(_city);
				const isOlder = _u.birthDate < currentOldest!.birthDate;
				if (isOlder) _usersPerCity.set(_city, _u);
			} else {
				_usersPerCity.set(_city, _u);
			}
		});

		setOldestPerCity([..._usersPerCity.values()]);
		// setOldestPerCity(Array.from(_usersPerCity.values()));
	};

	return (
		<div className=" border-2 rounded-md p-4">
			{
				// show error message
				error && (
					<p className="text-red-400"> Error occured: {error} </p>
				)
			}
			<div className="flex flex-row items-center justify-around gap-4">
				{/* **********************  name input filter begin here  *************************** */}
				<div className="flex flex-col">
					<Label htmlFor="name" className="">
						Name
					</Label>
					<input
						id="name"
						name="name"
						value={nameFilter}
						placeholder="eg: John"
						onChange={nameChangeFilter}
						className="max-w-40 bg-red-500"
					/>
				</div>
				{/* **********************  name input filter end here  *************************** */}

				<div className="flex flex-col w-48">
					{/* **********************  city select field begin here  *************************** */}
					<Label htmlFor="name" className="">
						City
					</Label>
					<select value={city} onChange={cityChangeHandler}>
						<option value={''}>All</option>

						{users.map(({ address }) => (
							<option value={address.city} key={uuidv4()}>
								{address.city}{' '}
							</option>
						))}
					</select>
					{/* **********************  city select field ends here  *************************** */}
				</div>
				<div>
					{/* **********************  highlight oldest per city begins here  *************************** */}
					{/* highlight oldest */}
					<div className="flex flex-row items-center gap-2">
						<input
							type="checkbox"
							width={'10px'}
							className="h-10 w-2 bg-slate-400 inline max-w-8"
							checked={highlightOldest}
							id="oldest"
							onChange={highlightOldestHandler}
						/>
						<label htmlFor="oldest" className="">
							Highlight Oldest per City
						</label>
					</div>
				</div>
			</div>
			<UsersTable
				users={filteredUsers}
				highlightOldest={highlightOldest}
				oldestPerCity={oldestPerCity}
				isLoading={isLoading}
			/>

			<div className='flex flex-row justify-between py-4'>
				<span>Total Users</span>
				<span>{users.length}</span>
			</div>
			<button
				onClick={() => setLimit(limit + countPerRequest)}
				disabled={total <= users.length  || isLoading}
				className=''
			>
				More
			</button>
		</div>
	);
};

export default Users;
