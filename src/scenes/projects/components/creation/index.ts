import { data, html } from '@prostory/edelweiss';

import { AppState, appStore, createProject } from '../../../../store';

import styles from './index.module.css';

const name = data('');

export const creation = html`
	<div class="${styles['creation-project-block']}">
		<h1>New project</h1>
		<p>Create a name for the project</p>
		<input
			class="${styles['creation-field']}"
			type="text"
			.value=${name}
			placeholder="Name"
			@input=${(event: InputEvent) =>
				name((event.target as HTMLInputElement).value)}
		/>
		<div>
			<button
				class="${styles['creation-button']}"
				@click=${() => {
					name('');
					appStore.state = AppState.USING;
				}}
			>
				Cancel
			</button>
			<button
				class="${styles['creation-button']}"
				@click=${() => {
					createProject(name());
					appStore.state = AppState.USING;
				}}
			>
				Ok
			</button>
		</div>
	</div>
`;
