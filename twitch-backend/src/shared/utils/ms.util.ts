const s = 1000 // seconds in milliseconds
const m = s * 60 // minutes in milliseconds
const h = m * 60 // hours in milliseconds
const d = h * 24 // days in milliseconds
const w = d * 7 // weeks in milliseconds
const y = d * 365.25 // years in milliseconds

type Unit =
	| 'Yrs'
	| 'Year'
	| 'Years'
	| 'Yr'
	| 'Y'
	| 'Weeks'
	| 'Week'
	| 'W'
	| 'Days'
	| 'Day'
	| 'D'
	| 'Hours'
	| 'Hour'
	| 'Hrs'
	| 'Hr'
	| 'H'
	| 'Minutes'
	| 'Minute'
	| 'M'
	| 'Seconds'
	| 'Second'
	| 'Secs'
	| 'Sec'
	| 'S'
	| 'Milliseconds'
	| 'Millisecond'
	| 'Msecs'
	| 'Msec'
	| 'Ms'
	| 'µs'
	| 'Us'
	| 'Ns'

type UnitAnyCase = Unit | Uppercase<Unit> | Lowercase<Unit>

export type StringValue =
	| `${number}`
	| `${number}${UnitAnyCase}`
	| `${number} ${UnitAnyCase}`

export function ms(str: StringValue): number {
	if (typeof str !== 'string' || str.length === 0 || str.length > 100) {
		throw new Error(
			'Value provided to ms() must be a string with length between 1 and 99.'
		)
	}

	const match =
		/^((?<value>\d+)(\.\d+)?) *(?<type>milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
			str
		)

	const groups = match?.groups as { value: string; type?: string } | undefined
	if (!groups) {
		return NaN
	}

	const n = parseFloat(groups.value)
	const type = (groups.type || 'ms').toLowerCase() as Lowercase<Unit>

	switch (type) {
		case 'y':
		case 'yrs':
		case 'year':
		case 'years':
			return n * y
		case 'w':
		case 'week':
		case 'weeks':
			return n * w
		case 'd':
		case 'day':
		case 'days':
			return n * d
		case 'h':
		case 'hr':
		case 'hrs':
		case 'hour':
		case 'hours':
			return n * h
		case 'm':
		case 'minute':
		case 'minutes':
			return n * m
		case 's':
		case 'second':
		case 'seconds':
		case 'secs':
			return n * s
		case 'ms':
		case 'millisecond':
		case 'milliseconds':
		case 'msecs':
		case 'msec':
			return n
		default:
			throw new Error(
				`Error: Time unit ${type} was recognized but does not have a corresponding case. Please check your input.`
			)
	}
}
