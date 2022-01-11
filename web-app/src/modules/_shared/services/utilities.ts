export function parseStringifiedNumber(number: any, defaultValue?: any) {
	const value: string = number.toString().replace(/[^0-9.-]/g, '');
	if (value === '0-') return '-';
	if (value.endsWith('.') || value.endsWith('-')) return value;
	const parsed = Number(value);
	return isNaN(parsed) ? defaultValue : parsed;
}
