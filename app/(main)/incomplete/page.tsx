"use client";
import Tasks from '@/app/components/Tasks/Tasks';
import { useGlobalState } from '@/app/context/globalProvider'
import React from 'react'

const page = () => {
  const { incompletedTasks } = useGlobalState();
  return (
    <Tasks title='Incomplete Tasks' tasks={incompletedTasks}/>
  )
}

export default page