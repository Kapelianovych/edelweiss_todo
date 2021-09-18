import { html } from '@prostory/edelweiss';

import { AppState, appStore } from '../../../store';

import styles from './index.module.css';

export const sidebar = html`
	<div class="${styles['sidebar-block']}">
		<div>
			<route-link href="/" class="${styles.logo}">.todo</route-link>
			<nav class="${styles['links-block']}">
				<route-link href="/projects">Projects</route-link>
				<route-link href="/stats">Stats</route-link>
				<route-link href="/calendar">Calendar</route-link>
			</nav>
		</div>
		<button
			@click=${() => {
				appStore.projects = [];
				appStore.state = AppState.USING;
			}}
			class="${styles['reset-button']}"
		>
			Clear all data
		</button>
	</div>
`;
