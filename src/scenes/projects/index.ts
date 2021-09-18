import { data, effect, html, untrack } from '@prostory/edelweiss';

import { kanban } from './components/kanban';
import { creation } from './components/creation';
import { AppState, appStore, Project } from '../../store';

export const projects = () => {
	const appState = data(appStore.state);
	const projectsData = data(appStore.projects);
	const choosenProject = data<Project | null>(null);

	const unsubscribeFromState = appStore.on('state')(appState);
	const unsubscribeFromProject = appStore.on('projects')(projectsData);

	const projectToButton = (project: Project) =>
		html`
			<button @click=${() => choosenProject(project)}>${project.name}</button>
		`;

	effect(() => {
		const projectsList = projectsData();
		const currentProject = untrack(choosenProject);

		if (currentProject !== null) {
			choosenProject(
				projectsList.find(({ id }) => id === currentProject.id) ?? null,
			);
		}
	});

	return html`
		<div
			:will-unmount=${() => {
				unsubscribeFromState();
				unsubscribeFromProject();
			}}
		>
			<header>
				<div>
					<input type="search" placeholder="search" />
					<div>
						<div>${() => projectsData().map(projectToButton)}</div>
					</div>
				</div>

				<button @click=${() => (appStore.state = AppState.CREATION)}>
					Create
				</button>
			</header>
			<main>
				${() =>
					projectsData().length > 0
						? choosenProject() !== null
							? kanban(choosenProject()!)
							: html`Choose existing project or create one.`
						: appState() === AppState.CREATION
						? creation
						: html`<h1>There aren't any projects yet.</h1>`}
			</main>
		</div>
	`;
};
