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
import { cn, formatDateString } from '~/lib/utils';

const headers: { id: string; label: string; className?: string }[] = [
	{ id: 'sn', label: 'S/N' },
	{ id: 'full_name', label: 'Full Name' },
	{ id: 'city', label: 'City' },
	{ id: 'birth_day', label: 'Birth Day' },
];

type Props = {
	users: IUser[];
};

const UsersTable = ({ users }: Props) => {
	return (
		<div>
			<Table>
				<TableCaption>A list of Users.</TableCaption>
				<TableHeader>
					<TableRow>
						{headers.map(({ label, className }) => (
							<TableHead
								className={cn('w-[50px]', className)}
								key={uuidv4()}
							>
								{label}
							</TableHead>
						))}
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
									<TableCell className="text-left">{`${formatDateString(
										birthDate
									)}`}</TableCell>
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
