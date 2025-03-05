import type { MetaArgs } from 'react-router';
import TodoList from '../../components/TodoList/TodoList';

export function meta({}: MetaArgs) {
  return [{ title: 'Todo List' }, { name: 'description', content: 'Manage your tasks with this Todo List!' }];
}

export default function Todo() {
  return <TodoList />;
}
