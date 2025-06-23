
import { Grid } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";


type Props = {
    activities: Activity[]; 
    onSelectActivity : (id: string) => void;
    onCancelSelectActivity: () => void;
    selectedActivity: Activity | undefined;
    onOpenForm: (id: string) => void;
    onFormClose: () => void;
    editMode: boolean;
    onSubmitForm: (activity: Activity) => void;
    onDeleteActivity: (id: string) => void;
}


export default function ActivityDashboard(
    { activities, onCancelSelectActivity, onSelectActivity, 
        selectedActivity, editMode, onOpenForm, onFormClose, onSubmitForm, onDeleteActivity}: Props) {
    return (
        <Grid container spacing={3}>
            <Grid size={7}>
               <ActivityList 
               activities={activities}
               onSelectActivity={onSelectActivity} 
                  onDeleteActivity={onDeleteActivity}         
               />
            </Grid>



            <Grid size={5}>
                { selectedActivity && !editMode &&  <ActivityDetails 
                activity={selectedActivity} 
                onCancelSelectActivity={onCancelSelectActivity}
                onOpenForm={onOpenForm}
                />
                }

                { editMode &&
                <ActivityForm 
                onSubmitForm={onSubmitForm}
                closeForm={onFormClose} 
                activity={selectedActivity}/>
            
                
                }
            </Grid>
                
        </Grid>

    )
}