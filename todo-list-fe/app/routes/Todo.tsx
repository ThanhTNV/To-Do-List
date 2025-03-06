import type { MetaArgs } from 'react-router';
import TodoList from '../../components/TodoList/TodoList';

export function meta({}: MetaArgs) {
  return [{ title: 'Todo List' }, { name: 'description', content: 'Manage your tasks with this Todo List!' }];
}

export default function Todo() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-b from-pink-100 to-indigo-200">
      <TodoList />
    </div>
  );
}
