import { store } from '@prostory/edelweiss';

import { uid } from '../plugins/uid';

export enum ToDoState {
	PLANNED = 'planned',
	IN_PROGRESS = 'in progress',
	COMPLETED = 'completed',
}

export interface ToDo {
	readonly id: string;
	readonly text: string;
	readonly title: string;
	readonly state: ToDoState;
}

export interface Project {
	readonly id: string;
	readonly name: string;
	readonly tasks: readonly ToDo[];
}

export enum AppState {
	USING = 'using',
	CREATION = 'creation',
}

export interface AppStore {
	state: AppState;
	projects: readonly Project[];
	currentProject: Project | null;
}

export const appStore = store<AppStore>({
	state: AppState.USING,
	projects: [
		{
			id: 'test',
			name: 'Web Studio',
			tasks: [
				{
					id: 'task1',
					text: 'Plan dinner',
					title: 'Jame',
					state: ToDoState.PLANNED,
				},
				{
					id: 'task2',
					text: 'Run for 1 hour',
					title: 'Mike',
					state: ToDoState.IN_PROGRESS,
				},
				{
					id: 'task3',
					text: 'Do house chores',
					title: 'Kate',
					state: ToDoState.COMPLETED,
				},
			],
		},
	],
	currentProject: null,
});

export const createToDo = (projectId: string, state: ToDoState) =>
	(appStore.projects = appStore.projects.map((project) =>
		projectId === project.id
			? {
					...project,
					tasks: project.tasks.concat({
						id: uid(),
						title: '',
						text: '',
						state,
					}),
			  }
			: project,
	));

export const updateToDo = (
	projectId: string,
	todoId: string,
	values: Partial<Omit<ToDo, 'id'>>,
) =>
	(appStore.projects = appStore.projects.map((project) =>
		projectId === project.id
			? {
					...project,
					tasks: project.tasks.map((todo) =>
						todo.id === todoId ? { ...todo, ...values } : todo,
					),
			  }
			: project,
	));

export const createProject = (name: string) =>
	(appStore.projects = appStore.projects.concat({
		id: uid(),
		name,
		tasks: [],
	}));
