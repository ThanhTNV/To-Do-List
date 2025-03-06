import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { motion } from 'framer-motion';
import { cn } from 'lib/utils';
import { Check, Edit2, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type TodoItemProps = {
  todo: {
    id: string;
    text: string;
    completed: boolean;
    createdAt: Date;
  };
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
};

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(todo.text);
  };

  const handleSave = () => {
    if (editText.trim() !== '') {
      onEdit(todo.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditText(todo.text);
    }
  };

  return (
    <motion.div key={todo.id} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }} className="group flex items-center gap-3 p-4">
      <Button size="icon" variant="outline" className={cn('h-6 w-6 rounded-full border-2 p-0', todo.completed ? 'border-transparent bg-gradient-to-r from-violet-500 to-purple-600' : 'border-gray-300 dark:border-gray-600')} onClick={() => onToggle(todo.id)} disabled={isEditing}>
        {todo.completed && <Check className="h-3 w-3 text-white" />}
      </Button>

      {isEditing ? (
        <Input ref={inputRef} type="text" value={editText} onChange={(e) => setEditText(e.target.value)} onKeyDown={handleKeyDown} onBlur={handleSave} className="h-8 flex-1 text-sm" />
      ) : (
        <span className={cn('flex-1 text-sm', todo.completed && 'text-gray-400 line-through dark:text-gray-500')} onDoubleClick={!todo.completed ? handleEdit : undefined}>
          {todo.text}
        </span>
      )}

      <div className="flex gap-1">
        {!isEditing && !todo.completed && (
          <Button size="icon" variant="ghost" className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100" onClick={handleEdit}>
            <Edit2 className="h-4 w-4 text-gray-400 hover:text-blue-500" />
          </Button>
        )}
        <Button size="icon" variant="ghost" className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100" onClick={() => onDelete(todo.id)}>
          <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-500" />
        </Button>
      </div>
    </motion.div>
  );
}
