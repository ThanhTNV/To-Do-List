'use client';

import { Badge } from 'components/ui/badge';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { AnimatePresence } from 'framer-motion';
import { cn, generateId } from 'lib/utils';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { TodoItem } from '../TodoItem/TodoItem';

type Todo = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
};

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('todos');
        return saved ? JSON.parse(saved) : [];
      } catch (error) {
        console.error('Failed to parse todos from localStorage', error);
        return [];
      }
    }
    return [];
  });
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() === '') return;

    setTodos([
      ...todos,
      {
        id: generateId(),
        text: newTodo.trim(),
        completed: false,
        createdAt: new Date(),
      },
    ]);
    setNewTodo('');
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const editTodo = (id: string, text: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text } : todo)));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeTodosCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="rounded-t-xl bg-gradient-to-r from-violet-500 to-purple-600 p-6 shadow-lg">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-white">Tasks</h1>
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Add a new task..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') addTodo();
            }}
            className="border-0 bg-white/20 text-white placeholder:text-white/70 focus-visible:ring-white/30"
          />
          <Button onClick={addTodo} size="icon" className="bg-white text-purple-600 hover:bg-white/90 hover:text-purple-700">
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-b-xl border border-t-0 border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-950">
        <div className="divide-y divide-gray-200 dark:divide-gray-800">
          <AnimatePresence initial={false}>
            {filteredTodos.length > 0 ? (
              filteredTodos.map((todo) => <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} onDelete={deleteTodo} onEdit={editTodo} />)
            ) : (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">{filter === 'all' ? 'Add your first task!' : filter === 'active' ? 'No active tasks' : 'No completed tasks'}</div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between bg-gray-50 p-4 text-sm text-gray-500 dark:bg-gray-900 dark:text-gray-400">
          <div>
            <Badge variant="outline" className="font-normal">
              {activeTodosCount} {activeTodosCount === 1 ? 'item' : 'items'} left
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className={cn('h-7 px-2 text-xs', filter === 'all' && 'bg-gray-200 dark:bg-gray-800')} onClick={() => setFilter('all')}>
              All
            </Button>
            <Button variant="ghost" size="sm" className={cn('h-7 px-2 text-xs', filter === 'active' && 'bg-gray-200 dark:bg-gray-800')} onClick={() => setFilter('active')}>
              Active
            </Button>
            <Button variant="ghost" size="sm" className={cn('h-7 px-2 text-xs', filter === 'completed' && 'bg-gray-200 dark:bg-gray-800')} onClick={() => setFilter('completed')}>
              Completed
            </Button>
          </div>
          <Button variant="ghost" size="sm" className="h-7 px-2 text-xs hover:text-red-500" onClick={clearCompleted}>
            Clear completed
          </Button>
        </div>
      </div>
    </div>
  );
}
