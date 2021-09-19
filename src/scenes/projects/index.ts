import { data, effect, html, untrack } from '@prostory/edelweiss';

import { search } from './components/search';
import { kanban } from './components/kanban';
import { creation } from './components/creation';
import { AppState, appStore, Project } from '../../store';

import styles from './index.module.css';

const appState = data(appStore.state);
const projectsData = data(appStore.projects);
const chosenProject = data(appStore.currentProject);

appStore.on('state')(appState);
appStore.on('projects')(projectsData);
appStore.on('currentProject')(chosenProject);

const projectToButton = (project: Project) =>
	html`
		<button
			class="${styles['project-button']}"
			@click=${() => {
				chosenProject(project);
				appStore.state = AppState.USING;
			}}
		>
			${project.name}
		</button>
	`;

effect(() => {
	const projectsList = projectsData();
	const currentProject = untrack(chosenProject);

	if (currentProject !== null) {
		chosenProject(
			projectsList.find(({ id }) => id === currentProject.id) ?? null,
		);
	}
});

export const projects = html`
	<div class="${styles['main-section']}">
		<header class="${styles['projects-header']}">
			${search}
			<button
				class="${styles['create-project-button']}"
				@click=${() => (appStore.state = AppState.CREATION)}
			>
				Create
			</button>
		</header>
		<main>
			${() => {
				const state = appState();
				const projects = projectsData();
				const currentProject = chosenProject();

				return state === AppState.CREATION
					? creation
					: projects.length > 0
					? currentProject !== null
						? kanban(currentProject)
						: html`
								<p class="${styles['default-message']}">
									Choose existing project or create one.
								</p>
								<div class="${styles['projects-list']}">
									${projects.map(projectToButton)}
								</div>
						  `
					: html`
							<p class="${styles['default-message']}">
								There aren't any projects yet.
							</p>
					  `;
			}}
		</main>
	</div>
`;
