export type ColumnDragItem = {
	id: string
	title: string
	type: "COLUMN"
}

export type CardDragItem = {
	id: string
	colId: string
	text: string
	type: "CARD"
}

export type DragItem = CardDragItem | ColumnDragItem