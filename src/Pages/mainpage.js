import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Paper, Box, TextField, TableContainer, Table, TableRow, TableHead, TableCell, Button, Grid, Typography } from "@mui/material";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import RecipeReviewCard from './cards';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));




export default function MainPage() {

    const [recipes, setRecipes] = useState([]);

    const navigate = useNavigate();

    const [isLoading, setLoading] = useState(true);
    const [email, setEmail] = useState('');

    const handleTextFieldChange = e => {
        // console.log(e.target.value)
            setEmail(e.target.value);
    };
    const handleButton = () => {
        navigate("/form")
    }

    const handleSubscribe = () => {
        console.log({email: email});
        axios.post('https://o0yfh0sg1f.execute-api.us-east-1.amazonaws.com/production/subscribe', {email: email})

        .then((response) => {
          console.log(response);
          navigate('/')
        })
        .catch((error) => {
          console.log(error);
        });
    }

    useEffect(() => {
        axios.post('https://o0yfh0sg1f.execute-api.us-east-1.amazonaws.com/production/getRecipes')
            .then((response) => {
                if (Object.keys(response.data.data).length !== 0) {
                    console.log(response.data.data);
                    setRecipes(response.data.data);
                    setLoading(false);
                }
            })
            .catch(
                err => console.log(err)
            )
    }, []);
    console.log(recipes);
    return (
        <div marginBottom="100px">
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={3}>
                    {recipes.map(recipe => (
                        <Grid item xs={4}>
                            <Item><RecipeReviewCard title={recipe.recipeName.S} author={recipe.firstName.S} date={recipe.timestamp.S} description={recipe.recipeDescription.S} /></Item>
                        </Grid>
                    ))}
                </Grid>
            </Box>


            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} arial-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <TextField  
                                            onChange={handleTextFieldChange}
                                            fullWidth label="Enter Email To get Notified whenever a New recipie is added" 
                                            id="fullWidth"
                                />
                            </TableCell>
                            <TableCell>
                                <Button onClick={handleSubscribe} variant="contained">Subscribe</Button>
                            </TableCell>

                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography textAlign="center">
                                    To Submit New Recipe click on the form 
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Button variant="contained" onClick={handleButton}>Form</Button>
                            </TableCell>

                        </TableRow>
                    </TableHead>
                </Table>
            </TableContainer>
        </div>
    );
}