import React, { useState, useEffect, useCallback } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../services/taskService';

function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskText, setEditingTaskText] = useState('');

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        search: searchTerm,
        status: filterStatus,
      };
      const response = await getTasks(params);
      setTasks(response.data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      if (error.response?.status === 401) handleLogout();
    } finally {
      setLoading(false);
    }
  }, [searchTerm, filterStatus]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    try {
      await createTask(newTaskTitle);
      setNewTaskTitle('');
      fetchTasks();
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      await updateTask(task._id, { ...task, completed: !task.completed });
      fetchTasks();
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };
  
  const handleStartEdit = (task) => {
    setEditingTaskId(task._id);
    setEditingTaskText(task.title);
  };
  
  const handleSaveEdit = async (taskId) => {
    try {
      await updateTask(taskId, { title: editingTaskText });
      setEditingTaskId(null);
      setEditingTaskText('');
      fetchTasks();
    } catch (error) {
      console.error('Failed to save task:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto p-4 md:p-8 max-w-2xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Tasks</h1>
          <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Logout</button>
        </div>

        <form onSubmit={handleCreateTask} className="mb-4 flex gap-2">
          <input type="text" value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} placeholder="Add a new task..." className="flex-grow p-3 bg-gray-800 rounded border border-gray-700 focus:outline-none focus:border-blue-500"/>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded">Add</button>
        </form>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input type="text" placeholder="Search tasks..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="flex-grow p-3 bg-gray-800 rounded border border-gray-700 focus:outline-none focus:border-blue-500"/>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="p-3 bg-gray-800 rounded border border-gray-700 focus:outline-none focus:border-blue-500">
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {loading ? <p>Loading tasks...</p> : (
          <div className="space-y-4">
            {tasks.length > 0 ? tasks.map((task) => (
              <div key={task._id} className="bg-gray-800 p-4 rounded-lg flex items-center justify-between transition-all duration-300">
                {editingTaskId === task._id ? (
                  <>
                    <input type="text" value={editingTaskText} onChange={(e) => setEditingTaskText(e.target.value)} className="flex-grow p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none"/>
                    <button onClick={() => handleSaveEdit(task._id)} className="ml-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Save</button>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-4">
                      {/* --- New clickable circle for completing tasks --- */}
                      <div
                        onClick={() => handleToggleComplete(task)}
                        className={`w-6 h-6 flex-shrink-0 border-2 rounded-full cursor-pointer flex items-center justify-center ${task.completed ? 'bg-green-500 border-green-500' : 'border-gray-400'}`}
                      >
                        {task.completed && (
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                        )}
                      </div>
                      <span className={`${task.completed ? 'line-through text-gray-500' : ''}`}>{task.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleStartEdit(task)} className="text-gray-400 hover:text-yellow-500">Edit</button>
                      <button onClick={() => handleDeleteTask(task._id)} className="text-gray-400 hover:text-red-500 font-bold">✕</button>
                    </div>
                  </>
                )}
              </div>
            )) : <p className="text-center text-gray-500">No tasks match your criteria.</p>}
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;