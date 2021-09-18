import { html } from '@prostory/edelweiss';

import styles from './index.module.css';

export const main = html`
	<div class="${styles['welcome-page']}">
		<h1>Welcome to ToDo application</h1>
		<p>Create or choose one of existing project to get started.</p>
	</div>
`;
