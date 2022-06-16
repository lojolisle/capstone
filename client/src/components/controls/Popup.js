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
  
   let comment = null;

   if (children.interactionResults) {
         const interactionPairs =  children.interactionResults.map((data) => {
            let str = data.interactionPair.map( x => {return (x)})
            return (str)
         });

         if (interactionPairs !== undefined) {
            description = interactionPairs.map((s) => {
               // let str3 = s.map( (y, k) => { return (<div key={k}>Severity : {y.severity}</div>) })
               let str2 = s.map( (y, k) => { return (<div key={k+100}><p>Description : {y.description}</p></div>) })
               let str1 = s.map( (y, k) => { return (<div key={k+200}><p><strong>Interaction Pair </strong> : {y.interactionConcept[0].sourceConceptItem.name} and {y.interactionConcept[1].sourceConceptItem.name}</p></div>) })
               return ([str1, str2])
            });
         }
   } else {
      description = 'No Interaction found'
   }

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
            Disclaimer : {children.disclaimer}
         </DialogContent> 
      </Dialog>
   )
}

export default Popup