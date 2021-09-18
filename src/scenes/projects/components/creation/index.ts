import { data, html } from '@prostory/edelweiss';

import { AppState, appStore, createProject } from '../../../../store';

const name = data('');

export const creation = html`
	<h1>New project</h1>
	<div>
		<p>Create a name for the project</p>
		<input
			type="text"
			.value=${name}
			@input=${(event: InputEvent) =>
				name((event.target as HTMLInputElement).value)}
		/>
		<button
			@click=${() => {
				name('');
				appStore.state = AppState.USING;
			}}
		>
			Cancel
		</button>
		<button
			@click=${() => {
				createProject(name());
				appStore.state = AppState.USING;
			}}
		>
			Ok
		</button>
	</div>
`;
