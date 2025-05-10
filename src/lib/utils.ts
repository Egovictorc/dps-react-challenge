import { format, parseISO, parse } from 'date-fns';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatDateString(
	_dateString: string = '2025-05-08T14:30:00Z',
	formatString: string = 'MM.dd.yyyy'
) {

  // _dateString comes in non parseable format, format date to be parseable
	const dateArray = _dateString.split('-');
	const birthMonth =
		dateArray[1].length == 1 ? '0' + dateArray[1] : dateArray[1];
	dateArray[1] = birthMonth;
	const birthDay =
		dateArray[2].length == 1 ? '0' + dateArray[2] : dateArray[2];
	dateArray[2] = birthDay;
	const dateString = dateArray.join('-');

	const formattedDate = format(parseISO(dateString), formatString);

	return formattedDate;
}
