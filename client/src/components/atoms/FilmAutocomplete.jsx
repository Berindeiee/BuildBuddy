
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import React from 'react';


const predefine = [
    { label: 'Placa video' },
    { label: 'Procesor' },
    { label: 'Memorie RAM' },
    { label: 'Placa de bază' },
    { label: 'Sursa de alimentare' },
    { label: 'Carcasa' },
    { label: 'Hard disk' },
    { label: 'SSD' },
];

const FilmAutocomplete = ({ id, onChange }) => {

    return (
        <Autocomplete
            onChange={onChange}
            multiple
            fullWidth
            id={id}
            options={predefine.map((option) => option.label)}
            //defaultValue={[top100Films[1].title]}
            freeSolo
            renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                    <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                ))
            }
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="filled"
                    label="Caută și filtrează"
                    placeholder="Caută și filtrează"
                    InputLabelProps={{ contentEditable: false }}
                />
            )}
        />
    );
};

export default FilmAutocomplete;