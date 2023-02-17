import React, { useState } from 'react';
import {
    Box,
    Button,
    ButtonGroup,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from '@mui/material';

import DialogTitle from '../../UI/DialogueTitle';
import { useSelector } from 'react-redux';

export type Category = {
    category_name: string;
    createdAt: string;
    id: number;
    shop_id: number;
    updatedAt: string;
}

export type AppliedFilter = {
    keywords: string,
    is_favourited: boolean;
    is_updated: boolean;
    first_operator: string;
    second_operator: string;
    third_operator: string;
    category: string;
}

interface AdvancedFiltersProps {
    title: string;
    open: boolean;
    onClose: () => void;
    onSave: (appliedFilter: AppliedFilter) => void,
    location: string;
}

const AdvancedFiltersModal: React.FC<AdvancedFiltersProps> = ({ open, onClose, title, onSave, location = '/online-shops' }) => {
    const shopCategories = useSelector((state: { shops: { categories: Category[] } }) => state.shops.categories);
    const [appliedFilter, setAppliedFilter] = useState({
        keywords: '',
        is_favourited: false,
        is_updated: false,
        first_operator: 'AND',
        second_operator: 'AND',
        third_operator: 'AND',
        category: ''
    });

    return (
        <Dialog
            fullWidth
            maxWidth='sm'
            onClose={onClose}
            open={open}
            sx={{
                '& .MuiDialogContent-root': {
                    padding: '2rem'
                },
                '& .MuiDialogActions-root': {
                    padding: '1rem'
                }
            }}
        >
            <DialogTitle onClose={onClose}>
                {title}
            </DialogTitle>
            <DialogContent dividers>
                <DialogContentText>
                    you can use all of the fields below to filter what you would like to be displayed on the page.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="By Keywords"
                    type="text"
                    fullWidth
                    onChange={(event) => {
                        setAppliedFilter({
                            ...appliedFilter,
                            ... { keywords: event.target.value }
                        });
                    }}
                    variant="standard"
                    sx={{ marginBottom: 2 }}
                />
                <ButtonGroup sx={{ height: '30px' }} variant="outlined" aria-label="outlined button group">
                    <Button
                        onClick={() => {
                            setAppliedFilter({
                                ...appliedFilter,
                                ...{ first_operator: 'AND' }
                            })
                        }}
                        variant={appliedFilter.first_operator === 'AND' ? 'contained' : 'outlined'}
                        sx={{ padding: 0 }}
                    >
                        AND
                    </Button>
                    <Button
                        onClick={() => {
                            setAppliedFilter({
                                ...appliedFilter,
                                ...{ first_operator: 'OR' }
                            })
                        }}
                        sx={{ padding: 0 }}
                        variant={appliedFilter.first_operator === 'OR' ? 'contained' : 'outlined'}
                    >
                        OR
                    </Button>
                </ButtonGroup>
                <FormControl size='small' sx={{ flex: 1, marginY: 2 }} fullWidth>
                    <InputLabel id="select-is-update" data-testid="select-is-update">
                        Is Updated
                    </InputLabel>
                    <Select
                        labelId="select-is-update-label"
                        id="select-is-update"
                        value={appliedFilter.is_updated}
                        renderValue={value => value ? 'True' : 'False'}
                        label="Is update"
                        onChange={(event) => {
                            setAppliedFilter({
                                ...appliedFilter,
                                ...{ is_updated: !!event.target.value }
                            });
                        }}
                    >
                        <MenuItem value={0}>False</MenuItem>
                        <MenuItem value={1}>True</MenuItem>
                    </Select>
                </FormControl>
                <ButtonGroup sx={{ height: '30px' }} variant="outlined" aria-label="outlined button group">
                    <Button
                        onClick={() => {
                            setAppliedFilter({
                                ...appliedFilter,
                                ...{ second_operator: 'AND' }
                            })
                        }}
                        sx={{ padding: 0 }}
                        variant={appliedFilter.second_operator === 'AND' ? 'contained' : 'outlined'}
                    >
                        AND
                    </Button>
                    <Button
                        onClick={() => {
                            setAppliedFilter({
                                ...appliedFilter,
                                ...{ second_operator: 'OR' }
                            })
                        }}
                        sx={{ padding: 0 }}
                        variant={appliedFilter.second_operator === 'OR' ? 'contained' : 'outlined'}
                    >
                        OR
                    </Button>
                </ButtonGroup>
                <FormControl size='small' sx={{ flex: 1, marginY: 2 }} fullWidth>
                    <InputLabel id="select-is-favourited" data-testid="select-is-favourited">
                        Is Favourited
                    </InputLabel>
                    <Select
                        labelId="select-is-favourited-label"
                        id="select-is-favourited"
                        value={appliedFilter.is_favourited}
                        renderValue={value => value ? 'True' : 'False'}
                        label="Is Favourited"
                        onChange={(event) => {
                            setAppliedFilter({
                                ...appliedFilter,
                                ...{ is_favourited: !!event.target.value }
                            });
                        }}
                    >
                        <MenuItem value={0}>False</MenuItem>
                        <MenuItem value={1}>True</MenuItem>
                    </Select>
                </FormControl>
                {(location === '/online-shops' && shopCategories?.length) && (
                    <Box>
                        <ButtonGroup sx={{ height: '30px' }} variant="outlined" aria-label="outlined button group">
                            <Button
                                onClick={() => {
                                    setAppliedFilter({
                                        ...appliedFilter,
                                        ...{ third_operator: 'AND' }
                                    })
                                }}
                                variant={appliedFilter.third_operator === 'AND' ? 'contained' : 'outlined'}
                                sx={{ padding: 0 }}
                            >
                                AND
                            </Button>
                            <Button
                                onClick={() => {
                                    setAppliedFilter({
                                        ...appliedFilter,
                                        ...{ third_operator: 'OR' }
                                    })
                                }}
                                sx={{ padding: 0 }}
                                variant={appliedFilter.third_operator === 'OR' ? 'contained' : 'outlined'}
                            >
                                OR
                            </Button>
                        </ButtonGroup>
                        <FormControl size='small' sx={{ flex: 1, marginY: 2 }} fullWidth>
                            <InputLabel id="select-category" data-testid="select-category">
                                Category
                            </InputLabel>
                            <Select
                                labelId="select-category-label"
                                id="select-category"
                                value={appliedFilter.category}
                                label='Category'
                                onChange={(event) => {
                                    setAppliedFilter({
                                        ...appliedFilter,
                                        ...{ category: event.target.value }
                                    });
                                }}
                            >
                                {shopCategories.map(category => {
                                    return <MenuItem key={category.id} value={category.category_name}>{category.category_name}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                )}
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'flex-end' }}>
                <Box display='flex' alignItems='center' gap={2}>
                    <Button
                        variant='text'
                        onClick={onClose}
                        sx={{ height: '40px' }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant='contained'
                        onClick={() => {
                            onSave(appliedFilter);
                            onClose();
                        }}
                        sx={{ height: '40px' }}
                    >
                        Apply
                    </Button>
                </Box>
            </DialogActions>
        </Dialog>
    );
}

export default AdvancedFiltersModal;