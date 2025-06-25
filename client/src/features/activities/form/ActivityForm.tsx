import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import type { FormEvent } from "react";
import { useActivities } from "../../../lib/hooks/useActivities";

type Props = {
  activity?: Activity; // Optional, if you need to pass an activity
  closeForm: () => void;
}


export default function ActivityForm({ closeForm, activity }: Props) {

  const { updateActivity, createActivity } = useActivities();


  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const data: { [key: string]: FormDataEntryValue } = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    if (activity) {
      data.id = activity.id; // Ensure the ID is included if updating an existing activity
      await updateActivity.mutateAsync(data as unknown as Activity);
      closeForm();
    } else { 
      await createActivity.mutateAsync(data as unknown as Activity);
      closeForm();
    }
  };


  return (
    <Paper sx={{ padding: 3, borderRadius: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        Create Activity
      </Typography>

      <Box component="form" onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 3 }}>
        <TextField name="title" label='Title' defaultValue={activity?.title} />
        <TextField name="description" label='Description' defaultValue={activity?.description} multiline rows={3} />
        <TextField name="category" label='Catergory' defaultValue={activity?.category} />
        <TextField name="date" type="date"
          defaultValue={activity?.date ? new Date(activity.date).toISOString().split('T')[0]
            : new Date().toISOString().split('T')[0]} />

        <TextField name="city" label='City' defaultValue={activity?.city} />
        <TextField name="venue" label='Venue' defaultValue={activity?.venue} />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 3 }}>
          <Button onClick={closeForm} color="inherit">Cancel</Button>
          <Button
            type="submit"
            color="success"
            variant="contained"
            disabled={updateActivity.isPending || createActivity.isPending } // Disable button while mutation is pending
          >
            Submit
          </Button>
        </Box>

      </Box>
    </Paper>
  )
}