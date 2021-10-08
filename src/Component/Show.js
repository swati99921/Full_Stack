import * as React from 'react';

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Container, Button, TableBody, TableCell, TableHead, TableRow, Table } from '@material-ui/core'
import { useState, useEffect } from 'react';
// import { TableBody, TableCell, TableHead, TableRow,Table, Button } from "@material-ui/core";

// import {Link} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  root: {
    '& >*': {
      margin: theme.spacing(1),

    },
  },

}))

export default function Show() {


  const paperStyle = { padding: '50px 20px', width: 600, margin: "20px auto" }
  const [stateName, funcToUpdateState] = useState('')
  const [isbn, setIsbn] = useState('')
  const [name, setName] = useState('')
  const [author, setAuthor] = useState('')
  const [publication, setPublication] = useState('')
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')

  // const [user,setUsers] =useState([]);

  // useEffect(()=>{
  //     getAllUsers();

  // },[] )

  const [product, setProduct] = useState([])

  const classes = useStyles();

  const handleClick = (e) => {
    e.preventDefault()
    const product = {isbn, name, author, publication, title, price, category}
    console.log(product);


    fetch("http://localhost:8082/products/add", {
      method:"post",
      headers:{ "Content-Type": "application/json" },
      body:JSON.stringify(product)
    }).then(() => {
      console.log("Data is recorded")
    })

  }
  //   const getAllUsers = async() =>{
  //     const response= await getUsers()




  //     console.log(response.data);
  //     setUsers(response.data)

  // }

  // const deleteUserData =async(id)=>{
  //     await deleteUser(id);
  //     getAllUsers();

  // 

  useEffect(() => {
    fetch("http://localhost:8082/products")
      .then(res => res.json())
      .then((result) => {
        setProduct(result)
      })

  }, [])
  return (

    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1 style={{ color: "blue" }}> <u> Add Books </u></h1>
        <form className={classes.root} novalidate autoComplete="off">
          <TextField id="outlined-basic" label="Isbn" variant="outlined" fullWidth
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)} />
          <TextField id="outlined-basic" label="Book Name" variant="outlined" fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)} />
          <TextField id="outlined-basic" label="Author Name" variant="outlined" fullWidth
            value={author}
            onChange={(e) => setAuthor(e.target.value)} />
          <TextField id="outlined-basic" label="Publication" variant="outlined" fullWidth
            value={publication}
            onChange={(e) => setPublication(e.target.value)} />
          <TextField id="outlined-basic" label="Title" variant="outlined" fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)} />
          <TextField id="outlined-basic" label="Price" variant="outlined" fullWidth
            value={price}
            onChange={(e) => setPrice(e.target.value)} />
          <TextField id="outlined-basic" label="category" variant="outlined" fullWidth
            value={category}
            onChange={(e) => setCategory(e.target.value)} d />

          <Button variant='contained' color="secondary" onClick={handleClick}>
            Submit
          </Button>

        </form>
      </Paper>


      <h1>Result</h1>
      <Paper elevation={3} style={paperStyle}>
        
        {product.map(product => (
          <Paper elevation={16} style={{ margin: '10px', padding: '15px', textAlign: 'left' }} key={product.id}>
            {/* {isbn, name, author, publication, title, price, category} */}
            id:{product.id}
            isbn:{isbn}
            name:{product.name}
            autor:{product.author}
            publication:{product.publication}
            title:{product.title}
            price:{product.price}
            category:{product.category}
          </Paper>
        ))
       }
      </Paper>
    </Container>
  );
}
