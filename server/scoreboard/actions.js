export const UPDATE_LATEST = 'UPDATE_LATEST'

export function updateLatest(latestMatch) {
	return {
		type: 'UPDATE_LATEST',
		latestMatch: latestMatch
	}
}