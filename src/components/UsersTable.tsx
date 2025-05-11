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
	{ id: 'id', label: 'ID' },
	{ id: 'full_name', label: 'Full Name' },
	{ id: 'city', label: 'City' },
	{ id: 'birth_day', label: 'Birth Day' },
];

type Props = {
	users: IUser[];
	highlightOldest: boolean;
	oldestPerCity: IUser[];
};

const UsersTable = ({ users, oldestPerCity, highlightOldest }: Props) => {
	return (
		<div className='py-4 h-[500px] overflow-y-scroll'>
			<Table className=''>
				{/* <TableCaption>A list of Users.</TableCaption> */}
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
				<TableBody className=''>
					{users.length === 0 ? (
						<EmptyTable />
					) : (
						users.map((_u) => {
							const isOldest =
								oldestPerCity.findIndex(
									({ id }) => id === _u.id
								) != -1
									? true
									: false;
							return (
								<UserTableRow
									user={_u}
									selected={highlightOldest && isOldest}
								/>
							);
						})
					)}
				</TableBody>
			
			</Table>

		</div>
	);
};

export default UsersTable;

const EmptyTable = () => {
	return (
		<TableRow className="h-40">
			<TableCell colSpan={4} rowSpan={5}>
				Empty Table
			</TableCell>
		</TableRow>
	);
};

const UserTableRow = ({
	user: { id, firstName, lastName, birthDate, address },
	selected,
}: {
	user: IUser;
	selected: boolean;
}) => {
	return (
		<TableRow key={uuidv4()} className={cn(selected && 'bg-slate-600')}>
			<TableCell className="font-medium text-left">{id}</TableCell>
			<TableCell className="font-medium text-left">
				{`${firstName} ${lastName}`}
			</TableCell>
			<TableCell className="text-left">{address.city}</TableCell>
			<TableCell className="text-left">{`${formatDateString(
				birthDate
			)}`}</TableCell>
		</TableRow>
	);
};
