"use client";
import Tasks from '@/app/components/Tasks/Tasks';
import { useGlobalState } from '@/app/context/globalProvider'
import React from 'react'

const page = () => {
  const { importantTasks } = useGlobalState();
  return <Tasks title="Important Tasks" tasks={importantTasks}/>;
}

export default page;