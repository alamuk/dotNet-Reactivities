import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"

type Props = {
    activity: Activity
    onCancelSelectActivity: () => void;
    onOpenForm: (id: string) => void; // Optional, if you need to open the form
    // onEditActivity: (activity: Activity) => void; // Uncomment if you need
}


export default function ActivityDetails({ activity, onCancelSelectActivity,
    onOpenForm
}: Props) {
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