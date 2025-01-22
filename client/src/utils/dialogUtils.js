import React, { useRef } from 'react';

const Dialog = ({open, onClose, children, dialogStyles = {}, overlayStyles = {} }) => {

  const dialogRef = useRef();

  const onInteractOutsideHandler = (e) => {
    if(dialogRef.current === e.target) {
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div ref={dialogRef} onClick={(e)=>{ onInteractOutsideHandler(e) }} style={{position: 'fixed', inset: '0', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1,  ...overlayStyles }}>
      <div style={{position: 'relative',width: '40vw',height: '65vh',backgroundColor: 'white',borderRadius:'1rem', ...dialogStyles}}>
        <div style={{position:'absolute', top:'1vh', right:'1vw', display:'flex', justifyContent:'flex-end', height:'5%', width:'4%'}}>
            <div onClick={onClose} style={{backgroundColor:'red', height:'1.5rem', width:'1.5rem', display:'flex', justifyContent:'center', alignItems:'center', color:'white', borderRadius:'0.3rem'}}>
              <span style={{cursor:'pointer'}}><b>X</b></span>
            </div>
        </div>
        {
            children
        }
      </div>
    </div>
  );
};

export default Dialog;
