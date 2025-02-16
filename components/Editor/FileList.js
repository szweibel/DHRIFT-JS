// shows a list of files in local storage using MUI components
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText'
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from 'react';
import Tooltip from '@mui/material/Tooltip';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


export default function FileList(filteredSnippets) {
    const [files, setFiles] = useState([]);
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState(null);
    const [userFiles, setUserFiles] = useState([]);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // const getFiles = () => {
    //     const fileList = [];
    //     // if the filenames in this list match the filenames in local storage
    //     // get the filenames from local storage
    //     // get the files from local storage
    //     // add the files to the fileList
    //     const fileNames = JSON.parse(localStorage.getItem('filenames'));
    //     console.log(fileNames);
    //     if (fileNames) {
    //         fileNames.forEach(filename => {
    //             console.log(filename);
    //             const singleFile = JSON.parse(localStorage.getItem(filename));
    //             fileList.push(singleFile);
    //         });
    //     }
    //     setUserFiles(fileList);
    // }

    // const allSnippets = props[0].allSnippets;
    // // chosenSnippets is a string of files separated by commas, make it an array
    // const chosenSnippets = typeof props[0].snippets === 'string' ?  props[0].snippets.split(',') : [];
    
    // var filteredSnippets = [];

    // // for item in chosenSnippets
    // // if item in slug of item in allSnippets
    // // add item to filteredSnippets
    // if (chosenSnippets != undefined) {
    //     chosenSnippets.forEach(snippet => {
    //         const currentFile = allSnippets.find(file => file.slug === snippet.trim());
    //         if (currentFile != undefined) {
    //             filteredSnippets.push(currentFile);
    //         }})
    // }


    useEffect(() => {
        if (!localStorage.getItem('filenames')) {
            localStorage.setItem('filenames', JSON.stringify([]));
        } else {
            const fileNames = localStorage.getItem('filenames');
            // console.log(fileNames);
            // setUserFiles(fileNames);
        }
    }, []);



    // const handleDelete = (file) => {
    //     const fileList = files.filter(f => f.filename !== file.filename);
    //     setFiles(fileList);
    //     setUserFiles(userFiles.filter(f => f.filename !== file.filename));
    //     localStorage.setItem('files', userFiles.filter(f => f.filename !== file.filename).join(','));
    //     localStorage.setItem('filenames', userFiles.filter(f => f.filename !== file.filename).map(f => f.filename).join(','));
    // }

    const handleDownload = (file) => {
        const fileList = files.filter(f => f.filename !== file.filename);
        setFiles(fileList);
        setUserFiles(userFiles.filter(f => f.filename !== file.filename));
        localStorage.setItem('files', userFiles.filter(f => f.filename !== file.filename).join(','));
        localStorage.setItem('filenames', userFiles.filter(f => f.filename !== file.filename).map(f => f.filename).join(','));
    }

    const handleChange = (event) => {
        setFile(event.target.files[0]);
    };
    const handleSubmit = (event) => {
        setOpen(false);
        event.preventDefault();
        toLocalStorage(file);
    };

    const toLocalStorage = (fileUpload) => {
        // add filename to localStorage 'filenames'
        const reader = new FileReader();
        const fileContent = reader.readAsText(fileUpload);
        reader.onload = () => {
            const file = {
                filename: fileUpload.name,
                content: reader.result
            };
            console.log(file);
            const fileList = [...files, file];
            setUserFiles([...userFiles, file]);
            // localStorage filenames = ['filename', 'content'];
            localStorage.setItem('filenames', [...userFiles.map(f => f.filename), file.filename].join(','));
            // localStorage.setItem(file.filename, file.content);
        };
    }

    // const handleEdit = (file) => {
    //     const fileContent = localStorage.getItem(file);
    //     const edit = document.createElement('a');
    //     edit.href = fileContent;
    //     edit.click();
    // }


    // const handleDownloadAll = () => {
    //     const download = document.createElement('a');
    //     download.href = '#';
    //     download.click();
    // }

    const uploadComponent = (
        <div>
            <Button
                className="upload-button"
                onClick={handleOpen}
                variant="contained"
                color="primary"
            >
                Upload to Storage
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Upload to Storage</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Upload a file to the storage bucket.
                    </DialogContentText>
                    <input
                        className="upload-input"
                        id="contained-button-file"
                        multiple
                        type="file"
                        onChange={handleChange}
                    />
                    <label htmlFor="contained-button-file">

                    </label>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit} color="primary">
                        Upload
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );

    // return (
    //     <div className="file-list">
    //         {filteredSnippets.snippets.map((snippet, index) => (
    //             <div key={index}>
    //                 <Tooltip title={'variable file' + (index + 1)}>
    //                 <div className="file-item"
    //                 style={{
    //                     color: 'white',
    //                 }}
    //                 >
    //                     {snippet.slug}
    //                 </div>
    //                 </Tooltip>
    //             </div>
    //         ))}
    //     </div>
    // );

        useEffect(() => {
            if(filteredSnippets){
                setFiles(filteredSnippets.snippets);
            }
        }, [filteredSnippets]);


// create a dropdown list of files
return (
    <div className="file-list"
    >
        <FormControl sx={{ m: 1, minWidth: 120, background:"white" }}>
            <InputLabel id="select-label">Files</InputLabel>
            <Select
                labelId="select-label"
                id="simple-select"
                value={file}
                label="File"
                onChange={handleChange}
            >
                {files.map((file, index) => (
                    <MenuItem value={file} key={index}>{file.slug}</MenuItem>
                ))}
            </Select>
        </FormControl>
    </div>
);
}



