import React  from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
//import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';

import { deleteDrug, getDrug } from '../../../../src/redux/feature/drugSlice';
import { useDispatch } from 'react-redux';
import useStyles from './styles';

const Drug = ({ drug, setCurrentId }) => {
   const dispatch = useDispatch();
   const classes = useStyles();

   const handleDelete = (id) => {
      if (window.confirm("Are you sure")) {
         dispatch(deleteDrug(id));
      }
   }
   // const handleClick = (id) => {
   //   console.log(' id: ' + id);
   //   setCurrentId(id);
    
   //   dispatch(getDrug(id))
   // }
   
   return (
      <Card className={classes.card}>
         {/* <div className={classes.overlay}>
            <Typography variant="h6">{drug.name}</Typography>
         </div> */}
         <div className={classes.overlay2}>
            <Button style={{ color: 'red' }} size="small" onClick={() => setCurrentId(drug._id)}><MoreHorizIcon fontSize="medium" /></Button>
         </div>
         <Typography className={classes.title} gutterBottom variant="h5" component="h2">{drug.name} {drug.strength}</Typography>
         
         <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">{drug.direction}</Typography>
            <Typography variant="body2" color="textSecondary" component="p">{drug.description}</Typography>
            {/* <Typography variant="body2" color="textSecondary">Created a {moment(drug.createdAt).fromNow()}
            </Typography> */}
         </CardContent>
         <CardActions className={classes.cardActions}>
            <Button size="small" color="primary" onClick={() => handleDelete(drug._id)}><DeleteIcon fontSize="small" />Delete</Button>
         </CardActions>
      </Card>
   );
}

export default Drug;