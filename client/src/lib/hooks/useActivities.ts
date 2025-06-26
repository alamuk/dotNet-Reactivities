import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";

// useQuery is a hook from react-query that allows us to fetch data and read data from a server.
// useMutation is a hook from react-query that allows us
// to perform mutations (create, update, delete) to the server.


export const useActivities = (id?: string) => {
 const queryClient = useQueryClient();

const { data: activities, isPending } = useQuery({
    queryKey: ['activities'],
    queryFn: async () => {
      const response = await agent.get<Activity[]>('/activities');
      return response.data;
    }
  });
 
const {data: activity, isLoading: isLoadingActivity} = useQuery({
  queryKey: ['activities', id],
  queryFn: async () => {

    const response = await agent.get<Activity>(`/activities/${id}`)
    return response.data;
  },
  enabled: !!id

})




  const updateActivity = useMutation({
    mutationFn: async (activity: Activity) => {
      await agent.put('/activities', activity);
    },
    onSuccess: async () => {
       // Invalidate the 'activities' query to refetch the data
      await queryClient.invalidateQueries(
        { queryKey: ['activities'] }
      );}

  })

 const createActivity = useMutation({
    mutationFn: async (activity: Activity) => {
      const response = await agent.post('/activities', activity);
      return response.data;
    },
    onSuccess: async () => {
       // Invalidate the 'activities' query to refetch the data
      await queryClient.invalidateQueries(
        { queryKey: ['activities'] }
      );}

  })

const deleteActivity = useMutation({
    mutationFn: async (id: string) => {
      await agent.delete(`/activities/${id}`);
    },
    onSuccess: async () => {
       // Invalidate the 'activities' query to refetch the data
      await queryClient.invalidateQueries(
        { queryKey: ['activities'] }
      );}

  })


  return { 
    activities, 
    isPending, 
    updateActivity, 
    createActivity, 
    deleteActivity, 
    activity, 
    isLoadingActivity
  };

}