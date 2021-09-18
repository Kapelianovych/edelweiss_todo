import { Fragment, html, lazy, render, router } from '@prostory/edelweiss';

import { main } from './scenes/main';
import { stats } from './scenes/stats';
import { sidebar } from './scenes/components/sidebar';
import { calendar } from './scenes/calendar';

const projects = lazy<Fragment>(
	() => import('./scenes/projects').then(({ projects }) => projects()),
	'',
);

const app = html`
	<div class="app">
		${sidebar}
		${router(
			{
				pattern: '/calendar',
				template: calendar,
			},
			{
				pattern: '/stats',
				template: stats,
			},
			{
				pattern: '/projects',
				template: () => projects(),
			},
			{
				pattern: '/',
				template: main,
			},
		)}
	</div>
`;

render(document.body, app);
