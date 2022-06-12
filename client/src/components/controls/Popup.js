import React from 'react'
import { Dialog, DialogContent, DialogTitle, makeStyles, Typography } from '@material-ui/core';
import ActionButton from "../controls/ActionButton";
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
   dialogWrapper: {
       padding: theme.spacing(2),
       position: 'absolute',
       top: theme.spacing(5)
   },
   dialogTitle: {
       paddingRight: '0px'
   }
}))

function Popup(props) {
  
   const {title, children, openPopup, setOpenPopup} = props;
   const classes = useStyles();

   let description = null;
   let severity = null;

   if (children.interactionResults) {
      const interactionPairs =  children.interactionResults.map((data) => {
         let str = data.interactionPair.map( x => {return (x)})
         return (str)
      });
console.log('in payt  ', interactionPairs)
      if (interactionPairs !== undefined) {
         description = interactionPairs.map((s) => {
            console.log('s', s)
        
         let str3 = s.map( (y, k) => { return (<div key={k}>Severity : {y.severity}</div>) })
         let str2 = s.map( (y, k) => { return (<div key={k+100}><p>Description:</p><ul key={k+1}><li >{y.description}</li></ul></div>) })
         return ([str3, str2])

      })

      }

   } else {
      description = 'No Interaction found'
   }
  
  console.log('Desc', description, severity) 
   return (
      <Dialog open={openPopup} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
         <DialogTitle className={classes.dialogTitle}>
            <div style={{ display: 'flex' }}>
               <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                  Drug Interaction Details 
               </Typography>
              
               <ActionButton
                  color="primary"
                  onClick={()=>{setOpenPopup(false)}}>
                  <CloseIcon />
               </ActionButton>  
            </div> 
         </DialogTitle>    
         <DialogContent dividers>
         {description}
         </DialogContent>
       
        
         <DialogContent dividers>
            'Disclaimer : {children.disclaimer}
         </DialogContent> 
      </Dialog>
   )
}

export default Popup