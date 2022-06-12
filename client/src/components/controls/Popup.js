import { Dialog, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import React from 'react'

function Popup(props) {
   const {title, children, openPopup, setOpenPopup} = props;

   let description = null;
   if (children.interactionResults !== undefined) {
      const interactionPairs =  children.interactionResults.map((data) => {
         let str = data.interactionPair.map( x => {return (x)})
         return (str)
      });

      if (interactionPairs !== undefined) {
         description = interactionPairs.map((s) => {
         let str2 = s.map( (y, k) => { return (<ul key={k}><li >{y.description}</li></ul>) })
         return (str2)})
      }
   }

   return (
      <Dialog open={openPopup}>
         <DialogTitle>
            Drug Interaction Details    
         </DialogTitle>    
         <DialogContent dividers>
            {description}  
         </DialogContent>
         <DialogContent dividers>
            Disclaimer: {children.disclaimer}
         </DialogContent>
      </Dialog>
   )
}

export default Popup