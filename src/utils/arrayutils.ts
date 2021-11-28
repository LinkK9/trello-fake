
type Item = {
	id: string
}

export const removeItemAtIndex = (array: any[], index: number ) => {
	return [...array.slice(0, index), ...array.slice(index + 1)]
}

export const insertItemAtIndex = (array: any[], item: any, index: number) => {
	return [...array.slice(0, index), item ,...array.slice(index)]
}

export const moveItem = (array: any[], from: number, to: number) => {
	const item = array[from];
	return insertItemAtIndex(removeItemAtIndex(array, from), item, to)
}

export const findItemIndexById = (array: any[], id: string) => {
	return array.findIndex((item: Item) => item.id === id)
}