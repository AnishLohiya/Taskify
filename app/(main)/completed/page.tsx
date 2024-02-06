"use client";
import { useGlobalState } from '@/app/context/globalProvider'
import Tasks from '@/app/components/Tasks/Tasks';

const page = () => {
  const { completedTasks } = useGlobalState();
  return <Tasks title="Completed Tasks" tasks={completedTasks}/>;
}

export default page