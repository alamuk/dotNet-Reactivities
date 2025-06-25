import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
import { useActivities } from "../../../lib/hooks/useActivities";

type Props = {
   selectedActivity: Activity
    onCancelSelectActivity: () => void;
    onOpenForm: (id: string) => void; // Optional, if you need to open the form
    // onEditActivity: (activity: Activity) => void; // Uncomment if you need
}


export default function ActivityDetails({ selectedActivity, onCancelSelectActivity,
    onOpenForm
}: Props) {

    const {activities} = useActivities();
    const activity = activities?.find(x => x.id === selectedActivity.id);

if (!activity) return <Typography>Loading ..... </Typography>

    return (
        <Card sx={{ borderRadius: 3 }}>
            <CardMedia
                component="img"
                src={`/images/categoryImages/${activity.category}.jpg`}
            />
            <CardContent>
                <Typography variant="h5">{activity.title}</Typography>
                <Typography variant="subtitle1" fontWeight='light'>{activity.date}</Typography>
                <Typography variant="body1">{activity.description}</Typography>
            </CardContent>

            <CardActions>
                <Button onClick={() => onOpenForm(activity.id)} color="primary">Edit</Button>
                <Button onClick={onCancelSelectActivity} color="primary">Cancel</Button>
            </CardActions>


        </Card>

    );
}