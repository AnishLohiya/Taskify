"use client";

import React, { createContext, useContext, useReducer } from "react";
import { useState } from "react";
import themes from './themes';
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";

const GlobalContext = createContext();
const GlobalUpdateContext = createContext();

export const GlobalProvider = ({ children }) => {
    const { user } = useUser();
    const [selectedTheme, setSelectedTheme] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [tasks, setTasks] = useState([]);
    const theme = themes[selectedTheme];

    const allTasks = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get('/api/tasks');
            setTasks(res.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteTask = async (id) => {
        try {
            const res = await axios.delete(`api/tasks/${id}`);
            toast.success("Task deleted");

            allTasks();
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }

    const completedTasks = tasks.filter((task) => task.isCompleted === true);
    const importantTasks = tasks.filter((task) => task.isImportant === true);
    const incompletedTasks = tasks.filter((task) => task.isCompleted === false);

    React.useEffect(() => {
        if(user) allTasks();
    }, [user]);
    
    return (
        <GlobalContext.Provider 
            value={{
                theme,
                tasks,
                deleteTask,
                isLoading,
                completedTasks,
                importantTasks,
                incompletedTasks,
            }}
        >
            <GlobalUpdateContext.Provider value={setSelectedTheme}>
                {children}
            </GlobalUpdateContext.Provider>
        </GlobalContext.Provider>
    )
}

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);