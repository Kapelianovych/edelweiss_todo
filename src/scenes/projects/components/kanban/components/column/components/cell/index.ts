import { data, html } from '@prostory/edelweiss';

import { ToDo, updateToDo } from '../../../../../../../../store';

import styles from './index.module.css';

export const cell =
	(projectId: string) =>
	({ id, title, text }: ToDo) => {
		const textEditable = data(text === '');
		const titleEditable = data(title === '');

		return html`
			<div
				draggable="true"
				@dragstart=${(event: DragEvent) => {
					event.dataTransfer!.effectAllowed = 'move';
					event.dataTransfer!.setData('text/plain', id);
				}}
				class="${styles['cell-block']}"
			>
				<input
					class="${styles['task-field']} ${styles['task-title']}"
					@dblclick=${() => titleEditable(true)}
					@change=${(event: InputEvent) => {
						titleEditable(false);
						updateToDo(projectId, id, {
							title: (event.target as HTMLInputElement).value,
						});
					}}
					type="text"
					.value=${title}
					placeholder="Title"
					?readonly=${() => !titleEditable()}
				/>
				<textarea
					class="${styles['task-field']} ${styles['task-text']}"
					@dblclick=${() => textEditable(true)}
					@change=${(event: InputEvent) => {
						textEditable(false);
						updateToDo(projectId, id, {
							text: (event.target as HTMLTextAreaElement).value,
						});
					}}
					.value=${text}
					placeholder="Text"
					?readonly=${() => !textEditable()}
				></textarea>
			</div>
		`;
	};
