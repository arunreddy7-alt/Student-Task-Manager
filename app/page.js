"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, addDoc, query, onSnapshot, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebaseConfig';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Fetch tasks when user is authenticated
        const q = query(collection(db, `users/${currentUser.uid}/tasks`));
        const unsubscribeTasks = onSnapshot(q, (querySnapshot) => {
          const taskList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setTasks(taskList);
        });
        return () => unsubscribeTasks();
      } else {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const addTask = async (newTask) => {
    try {
      await addDoc(collection(db, `users/${user.uid}/tasks`), {
        text: newTask,
        completed: false
      });
    } catch (error) {
      console.error("Error adding task: ", error);
    }
  };

  const toggleTask = async (id) => {
    const taskRef = doc(db, `users/${user.uid}/tasks`, id);
    const task = tasks.find(t => t.id === id);
    try {
      await updateDoc(taskRef, {
        completed: !task.completed
      });
    } catch (error) {
      console.error("Error updating task: ", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const taskRef = doc(db, `users/${user.uid}/tasks`, id);
      await deleteDoc(taskRef);
    } catch (error) {
      console.error("Error deleting task: ", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  if (!user) return null; // or a loading spinner

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-2xl font-semibold mb-5 text-black">Student Task Manager</h1>
          <button
            onClick={handleLogout}
            className="mb-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
          <TaskForm onAddTask={addTask} />
          <TaskList tasks={tasks} onToggleTask={toggleTask} onDeleteTask={deleteTask} />
        </div>
      </div>
    </div>
  );
}
