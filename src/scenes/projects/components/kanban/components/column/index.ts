import { html } from '@prostory/edelweiss';

import {
	ToDo,
	ToDoState,
	createToDo,
	updateToDo,
} from '../../../../../../store';

const cell =
	(projectId: string) =>
	({ id, title, text }: ToDo) =>
		html`
			<div>
				<input
					@change=${(event: InputEvent) =>
						updateToDo(projectId, id, {
							title: (event.target as HTMLInputElement).value,
						})}
					type="text"
					.value=${title}
				/>
				<textarea
					@change=${(event: InputEvent) =>
						updateToDo(projectId, id, {
							text: (event.target as HTMLTextAreaElement).value,
						})}
					.value=${text}
				></textarea>
			</div>
		`;

export const column = (
	projectId: string,
	type: ToDoState,
	tasks: readonly ToDo[],
) =>
	html`
		<div>
			<header>
				<h2>${String(type)}</h2>
				<span>${tasks.length}</span>
			</header>
			<button @click=${() => createToDo(projectId, type)}>+</button>
			<div>${tasks.map(cell(projectId))}</div>
		</div>
	`;
