const styles = theme => ({
    root: {
      backgroundColor: theme.palette.background.paper,
      height: 'calc(100% - 35px)',
      position: 'absolute',
      left: '0',
      width: '300px',
      boxShadow: '0px 0px 2px black'
    },
    titleInput: {
      height: '50px',
      boxSizing: 'border-box',
      border: 'none',
      padding: '5px',
      fontSize: '24px',
      width: '100%',
      backgroundColor: '#29487d',
      color: 'white',
      paddingLeft: '50px'
    },
    editorHeader: {
      display: 'flex'
    },
    editIcon: {
      position: 'absolute',
      padding: '1rem',
      color: 'white'
    },
    editorContainer: {
      height: '100vh',
      boxSizing: 'border-box'
    }
  });
  
  export default styles;