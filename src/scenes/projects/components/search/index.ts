import { data, effect, html } from '@prostory/edelweiss';

import { appStore, Project } from '../../../../store';

import styles from './index.module.css';

globalThis.addEventListener('click', (event) => {
	if (
		!(event.target as HTMLElement).classList.contains(styles['search-field'])
	) {
		searchValue('');
	}
});

const searchedProjects = data<readonly Project[]>([]);
const searchValue = data('');

effect(() => {
	const search = searchValue();

	searchedProjects(
		appStore.projects.filter(
			(project) =>
				search !== '' &&
				project.name.toLowerCase().includes(search.toLowerCase()),
		),
	);
});

const projectToButton = (project: Project) =>
	html`
		<button
			class="${styles['search-result-item']}"
			@click=${() => {
				appStore.currentProject = project;
				searchValue('');
			}}
		>
			${project.name}
		</button>
	`;

export const search = html`
	<div class="${styles['search-project-wrapper']}">
		<input
			type="search"
			.value=${searchValue}
			placeholder="Search"
			class="${styles['search-field']}"
			@input=${(event: InputEvent) =>
				searchValue((event.target as HTMLInputElement).value)}
		/>
		<div class="${styles['search-results-block']}">
			${() => searchedProjects().map(projectToButton)}
		</div>
	</div>
`;
