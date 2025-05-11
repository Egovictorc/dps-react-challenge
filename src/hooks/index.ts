import { useState, useEffect } from 'react';
import { BASE_URL } from '~/utils';
import { IUser } from '..';

export const useDebounce = <T>(value: T, delay: number = 1000) => {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => clearTimeout(timeout);
	}, [value, delay]);

	return debouncedValue;
};


export const useUsers = async () => {
	const [state, setState] = useState({
		loading: true,
		error: '',
		users: [] as IUser[],
	}); // Simulate loading state
	try {
		const response = await fetch(BASE_URL + '/users');
		const data: {
			users: IUser[];
			total: number;
			skip: number;
			limit: number;
		} = await response.json();

		// console.log('data ', users);
		setState({ loading: false, error: '', users: data.users });
		// Simulate loading state
	} catch (error) {
		console.error('Error fetching users: ', error);
		setState({
			loading: false,
			error: 'Error fetching users',
			users: [],
		});
	}
	return state;
};
