import { html } from '@prostory/edelweiss';

import styles from './index.module.css';

export const loading = html`
	<div class="${styles['loading-block']}">
		<p class="${styles['loading-message']}">Loading...</p>
	</div>
`;
