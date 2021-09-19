import { data, effect, html, untrack } from '@prostory/edelweiss';

import { kanban } from './components/kanban';
import { creation } from './components/creation';
import { AppState, appStore, Project } from '../../store';

import styles from './index.module.css';

export const projects = () => {
	const appState = data(appStore.state);
	const projectsData = data(appStore.projects);
	const searchProject = data('');
	const chosenProject = data<Project | null>(null);
	const searchedProjects = data<readonly Project[]>([]);

	const unsubscribeFromState = appStore.on('state')(appState);
	const unsubscribeFromProject = appStore.on('projects')(projectsData);

	const projectToButton = (project: Project) =>
		html`
			<button
				class="${styles['search-result-item']}"
				@click=${() => {
					chosenProject(project);
					searchProject('');
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

	effect(() =>
		searchedProjects(
			projectsData().filter((project) =>
				project.name.toLowerCase().includes(searchProject().toLowerCase()),
			),
		),
	);

	return html`
		<div
			:will-unmount=${() => {
				unsubscribeFromState();
				unsubscribeFromProject();
			}}
			class="${styles['main-section']}"
		>
			<header class="${styles['projects-header']}">
				<div class="${styles['search-project-wrapper']}">
					<input
						type="search"
						.value=${searchProject}
						placeholder="Search"
						class="${styles['search-field']}"
						@input=${(event: InputEvent) =>
							searchProject((event.target as HTMLInputElement).value)}
					/>
					<div
						class="${styles['search-results-block']} ${() =>
							searchProject().length > 0 && searchedProjects().length > 0
								? styles['visible']
								: ''}"
					>
						${() => searchedProjects().map(projectToButton)}
					</div>
				</div>

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
};
