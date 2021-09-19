import { html } from '@prostory/edelweiss';

import { cell } from './components/cell';
import { ToDo, ToDoState, createToDo } from '../../../../../../store';

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
			<div>${tasks.map(cell(projectId))}</div>
		</div>
	`;
