import {
	html,
	lazy,
	render,
	router,
	Computed,
	Fragment,
} from '@prostory/edelweiss';

import { main } from './scenes/main';
import { stats } from './scenes/stats';
import { sidebar } from './scenes/components/sidebar';
import { calendar } from './scenes/calendar';

const projects = lazy<Computed<Fragment>>(
	() =>
		import('./scenes/projects').then(
			({ projects }) =>
				// Explicitly mimic long loading for an example.
				new Promise((resolve) => setTimeout(() => resolve(projects), 500)),
		),
	() => '',
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
				// Eta abstraction is needed if we don't want to cache a whole page.
				template: () =>
					projects.loading() ? html`<p>Loading...</p>` : projects()(),
			},
			{
				pattern: '/',
				template: main,
			},
		)}
	</div>
`;

render(document.body, app);
