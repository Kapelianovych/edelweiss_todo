import { html } from '@prostory/edelweiss';

import { column } from './components/column';
import { Project, ToDoState } from '../../../../store';

import styles from './index.module.css';

export const kanban = ({ id, name, tasks }: Project) =>
	html`
		<div class="${styles['kanban-block']}">
			<h1>${name}</h1>
			<div class="${styles['kanban-content']}">
				${column(
					id,
					ToDoState.PLANNED,
					tasks.filter(({ state }) => state === ToDoState.PLANNED),
				)}
				${column(
					id,
					ToDoState.IN_PROGRESS,
					tasks.filter(({ state }) => state === ToDoState.IN_PROGRESS),
				)}
				${column(
					id,
					ToDoState.COMPLETED,
					tasks.filter(({ state }) => state === ToDoState.COMPLETED),
				)}
			</div>
		</div>
	`;
