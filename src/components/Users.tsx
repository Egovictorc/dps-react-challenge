import React, { useEffect, useState } from 'react';
import { CheckedState } from '@radix-ui/react-checkbox';
import { v4 as uuidv4 } from 'uuid';

import UsersTable from './UsersTable';
import { IUser } from '..';
import { BASE_URL } from '~/utils';
import { Label } from './ui/label';
import { dummyUsers } from '~/_mock';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from './ui/select';
import { Checkbox } from './ui/checkbox';

type FilterProps = {
	filter: string;
	value: string;
};
const Users = () => {
	// const [users, setUsers] = useState<IUser[]>([]);
	const users: IUser[] = dummyUsers.users;
	// const users: IUser[] = [];

	const [nameFilter, setNameFilter] = useState('');
	const [city, setCity] = useState('');
	const [highlightOldest, setHighlightOldest] = useState(false);
	const cities: string[] = [];
	const [filteredUsers, setFilteredUsers] = useState<IUser[]>(users);
	// const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
	// const filterUsers = ({ filter, value }: FilterProps) => {
	// 	const selected = users.filter(
	// 		({ firstName, lastName }) =>
	// 			firstName.toLowerCase().includes(value.toLowerCase()) ||
	// 			lastName.toLowerCase().includes(value.toLowerCase())
	// 	);

	//     setFilteredUsers(selected);
	// };
	const nameChangeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setNameFilter(value);

		console.log('value ', value);
		if (value) {
			const selected = users.filter(
				({ firstName, lastName, address }) =>
					(firstName
						.toLowerCase()
						.includes(value.trim().toLowerCase()) ||
						lastName
							.toLowerCase()
							.includes(value.trim().toLowerCase())) &&
					address.city
						.toLowerCase()
						.includes(city.trim().toLowerCase())
			);
			setFilteredUsers(selected);

			// filterUsers({ filter: 'name', value: value });
		} else {
			setFilteredUsers(users);
		}
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
			const response = await fetch(BASE_URL + '/users');
			const data: {
				users: IUser[];
				total: number;
				skip: number;
				limit: number;
			} = await response.json();
			const { users } = data;
			// console.log('data ', users);

			setFilteredUsers(users);
		}

		// fetchUsers();
	}, []);

	return (
		<div className="">
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
			<UsersTable users={filteredUsers} />
		</div>
	);
};

export default Users;
