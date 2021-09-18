import { html } from '@prostory/edelweiss';

import {
	ToDo,
	ToDoState,
	createToDo,
	updateToDo,
} from '../../../../../../store';

import styles from './index.module.css';

const capitalize = (word: string) =>
	word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

const cell =
	(projectId: string) =>
	({ id, title, text }: ToDo) =>
		html`
			<div class="${styles['cell-block']}">
				<input
					class="${styles['task-field']} ${styles['task-title']}"
					@change=${(event: InputEvent) =>
						updateToDo(projectId, id, {
							title: (event.target as HTMLInputElement).value,
						})}
					type="text"
					.value=${title}
					placeholder="Title"
				/>
				<textarea
					class="${styles['task-field']} ${styles['task-text']}"
					@change=${(event: InputEvent) =>
						updateToDo(projectId, id, {
							text: (event.target as HTMLTextAreaElement).value,
						})}
					.value=${text}
					placeholder="Text"
				></textarea>
			</div>
		`;

export const column = (
	projectId: string,
	type: ToDoState,
	tasks: readonly ToDo[],
) =>
	html`
		<div class="${styles['column-block']}">
			<header class="${styles['column-header']}">
				<div class="${styles['column-top-line']}">
					<h2 class="${styles['column-title']}">${capitalize(String(type))}</h2>
					<span class="${styles['column-tasks-count']}">${tasks.length}</span>
				</div>
				<button
					class="${styles['add-button']}"
					@click=${() => createToDo(projectId, type)}
				>
					+
				</button>
			</header>
			<div>${tasks.map(cell(projectId))}</div>
		</div>
	`;
