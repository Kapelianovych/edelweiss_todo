import { html, lazy, render, router, Fragment } from '@prostory/edelweiss';

import { main } from './scenes/main';
import { stats } from './scenes/stats';
import { sidebar } from './scenes/components/sidebar';
import { loading } from './scenes/components/loading';
import { calendar } from './scenes/calendar';

const projects = lazy<Fragment>(
	() =>
		import('./scenes/projects').then(
			({ projects }) =>
				// Explicitly mimic long loading for an example.
				new Promise((resolve) => setTimeout(() => resolve(projects), 500)),
		),
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
				template: () => (projects.loading() ? loading : projects()),
			},
			{
				pattern: '/',
				template: main,
			},
		)}
	</div>
`;

render(document.body, app);
