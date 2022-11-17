import { Autocomplete, Box, TextField } from '@mui/material';
function AutoCompleteSelect({textLabel,options,selectedOption,onChange,labelOption,labelImage}) {
    return (
        <Autocomplete
        disablePortal
                value={selectedOption||null}
                options={options}
                onChange={(e,newVal)=>onChange(newVal)}
                autoHighlight
                sx={{ width: 360 }}
                getOptionLabel={(option) => option[labelOption]}
                renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    {labelImage&&<img width="20" src={option[labelImage]} alt=''/>}
                    {option[labelOption]}
                </Box>
                )}
                renderInput={(params) => (
                <TextField
                placeholder='Categories'
                color={"primary"}
                className="Autocomplete"
                type={"text"}
                  focused
                    {...params}
                    label={textLabel}
                    inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password', 
                    }}
                />
                )}
                
            />
    );
}

export default AutoCompleteSelect;