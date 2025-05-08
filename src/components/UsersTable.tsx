import { useEffect, useState } from 'react';
import { BASE_URL } from '../utils';
import { v4 as uuidv4 } from 'uuid';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from './ui/table';
import { IUser } from '..';

const fetchedUsers = 0;

const UsersTable = () => {
	const [users, setUsers] = useState<IUser[]>([]);

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
			console.log('data ', users);

			setUsers(users);
		}

		fetchUsers();
	}, []);

	return (
		<div>
			<Table>
				<TableCaption>A list of your recent invoices.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[50px]">S/N</TableHead>
						<TableHead className="w-42">Full Name</TableHead>
						<TableHead className="text-left">City</TableHead>
						<TableHead className="text-right">Birth Day</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{users.length === 0 ? (
						<TableRow className="h-40">
							<TableCell colSpan={4} rowSpan={5}>
								Empty Table
							</TableCell>
						</TableRow>
					) : (
						users.map(
							(
								{ firstName, lastName, birthDate, address },
								index
							) => (
								<TableRow key={uuidv4()}>
									<TableCell className="font-medium text-left">
										{index + 1}{' '}
									</TableCell>
									<TableCell className="font-medium text-left">
										{`${firstName} ${lastName}`}
									</TableCell>
									<TableCell className="text-left">
										{address.city}
									</TableCell>
									<TableCell className="text-left">{`${birthDate}`}</TableCell>
								</TableRow>
							)
						)
					)}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TableCell colSpan={3} className="text-left">
							Total
						</TableCell>
						<TableCell className="text-right">
							{users.length}
						</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
		</div>
	);
};

export default UsersTable;
