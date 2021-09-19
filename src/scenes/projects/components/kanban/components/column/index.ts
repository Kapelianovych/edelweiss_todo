import { html } from '@prostory/edelweiss';

import { cell } from './components/cell';
import {
	ToDo,
	ToDoState,
	createToDo,
	updateToDo,
} from '../../../../../../store';

import styles from './index.module.css';

const capitalize = (word: string) =>
	word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

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
			<div
				class="${styles['column-tasks']}"
				@drop=${(event: DragEvent) => {
					event.preventDefault();
					updateToDo(projectId, event.dataTransfer!.getData('text/plain'), {
						state: type,
					});
				}}
				@dragover=${(event: DragEvent) => {
					event.preventDefault();
					event.dataTransfer!.dropEffect = 'move';
				}}
			>
				${tasks.map(cell(projectId))}
			</div>
		</div>
	`;
